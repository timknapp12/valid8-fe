import { useState } from 'react';
import { Repository, VerificationError, VerifiedRepo } from '../types';
import { Button } from './Button';
import { RepoModal } from './RepoModal';
import { supabase } from '../utils/supabaseConfig';
import { FaPlus } from 'react-icons/fa';

export const AddRepo = () => {
  const [showModal, setShowModal] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationErrors, setVerificationErrors] = useState<
    VerificationError[]
  >([]);

  const verifyRepositories = async (selectedRepos: Repository[]) => {
    setVerifying(true);
    setVerificationErrors([]);
    const verified: VerifiedRepo[] = [];
    const errors: VerificationError[] = [];

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const accessToken = session?.provider_token;

      if (!accessToken) {
        throw new Error('No GitHub access token found');
      }

      for (const repo of selectedRepos) {
        try {
          const response = await fetch(
            `https://api.github.com/repos/${repo.full_name}/contents/valid8.json`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/vnd.github.v3+json',
              },
            }
          );

          if (response.ok) {
            const fileData = await response.json();

            // Decode base64 content
            const content = atob(fileData.content);
            let valid8_content;
            try {
              valid8_content = JSON.parse(content);
            } catch (e) {
              throw new Error('Invalid JSON in valid8.json');
            }

            // Extract username from full_name (format: "username/repo")
            const username = repo.full_name.split('/')[0];

            verified.push({
              repo_name: repo.name,
              username,
              repo_url: repo.html_url,
              valid8_content,
              repofull_name: repo.full_name,
            });
          } else {
            errors.push({
              repo,
              error: 'No valid8.json file found',
            });
          }
        } catch (error) {
          errors.push({
            repo,
            error:
              error instanceof Error ? error.message : 'Verification failed',
          });
        }
      }

      if (errors.length === 0) {
        setShowModal(false);
      } else {
        setVerificationErrors(errors);
      }
    } catch (error) {
      setVerificationErrors(
        selectedRepos.map((repo) => ({
          repo,
          error: error instanceof Error ? error.message : 'Verification failed',
        }))
      );
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>
        <FaPlus className='mr-2' />
        Add Repositories
      </Button>

      {showModal && (
        <RepoModal
          onClose={() => {
            setShowModal(false);
            setVerificationErrors([]);
          }}
          onSubmit={verifyRepositories}
          verifying={verifying}
          verificationErrors={verificationErrors}
        />
      )}
    </div>
  );
};
