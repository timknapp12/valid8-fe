import { User } from '@supabase/supabase-js';

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  handleSignIn: () => Promise<void>;
  handleSignOut: () => Promise<void>;
};

export type AppContextType = {
  searchTerm: string;
  handleSearch: (query: string) => void;
  filteredRepos: TileProps[];
  isLoadingRepos: boolean;
};

export type ButtonProps = {
  onClick: () => void;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  secondary?: boolean;
};

export type ColumnProps = {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export type RowProps = {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export type SearchInputProps = {
  onSearch: (value: string) => void;
  placeholder?: string;
};

export type TileProps = {
  id?: number;
  full_name?: string;
  repo_name: string;
  username: string;
  repo_url: string;
  valid8_content: any;
  num_of_clicks?: number;
};

export type GridProps = {
  gapSize?: string;
  min?: string;
  children: React.ReactNode;
  className?: string;
};

export type Repository = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  default_branch: string;
  private: boolean;
};

export type FileSearchResult = {
  repository: Repository;
  path: string;
  html_url: string;
  content?: string;
};

export type VerificationError = {
  repo: Repository;
  error: string;
};

export type RepoModalProps = {
  onClose: () => void;
  onSubmit: (repos: Repository[]) => void;
  verifying: boolean;
  verificationErrors?: VerificationError[];
};

export type VerifiedRepo = {
  repo_name: string;
  username: string;
  repo_url: string;
  valid8_content: any;
  repofull_name: string;
};
