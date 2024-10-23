import { supabase } from './supabaseConfig';

import { FileSearchResult, Repository } from '../types';

export const searchUserReposForFile = async (
  filename: string = 'valid8.json'
): Promise<FileSearchResult[]> => {
  try {
    // Get the GitHub access token from Supabase session
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const accessToken = session?.provider_token;

    if (!accessToken) {
      throw new Error('No GitHub access token found');
    }

    // First, get all repositories for the authenticated user
    const reposResponse = await fetch(
      'https://api.github.com/user/repos?per_page=100',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!reposResponse.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const repositories: Repository[] = await reposResponse.json();
    const results: FileSearchResult[] = [];

    // Search for the file in each repository
    for (const repo of repositories) {
      try {
        // Search for the file in the repository
        const searchResponse = await fetch(
          `https://api.github.com/repos/${repo.full_name}/contents/${filename}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (searchResponse.ok) {
          const fileData = await searchResponse.json();

          // If you want to fetch the content, it's base64 encoded
          const content = fileData.content ? atob(fileData.content) : undefined;

          results.push({
            repository: repo,
            path: fileData.path,
            html_url: fileData.html_url,
            content,
          });
        }
      } catch (error) {
        // File not found in this repository, continue to next one
        continue;
      }
    }

    return results;
  } catch (error) {
    console.error('Error searching repositories:', error);
    throw error;
  }
};

// Optional: Function to fetch file content if needed
export const fetchFileContent = async (
  repofull_name: string,
  filePath: string
): Promise<string> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const accessToken = session?.provider_token;

  if (!accessToken) {
    throw new Error('No GitHub access token found');
  }

  const response = await fetch(
    `https://api.github.com/repos/${repofull_name}/contents/${filePath}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch file content');
  }

  const data = await response.json();
  return atob(data.content); // Decode base64 content
};
