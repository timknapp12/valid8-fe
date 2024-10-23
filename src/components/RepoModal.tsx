import { useRef, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseConfig';
import { AiOutlineClose } from 'react-icons/ai';
import { Repository, RepoModalProps } from '../types';
import { FaSpinner } from 'react-icons/fa';
import { Button } from './Button';
import { useAuthContext } from '../contexts/AuthContext';

export const RepoModal = ({
  onClose,
  onSubmit,
  verifying = false,
  verificationErrors = [],
}: RepoModalProps) => {
  const { user } = useAuthContext();
  const modalRef = useRef<HTMLDivElement>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRepositories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const fetchRepositories = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const accessToken = session?.provider_token;

      if (!user) {
        throw new Error('No GitHub access token found. Please sign in.');
      }

      if (!accessToken) {
        throw new Error(
          'No GitHub access token found. Please sign out and sign in again.'
        );
      }

      const response = await fetch(
        'https://api.github.com/user/repos?per_page=100',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }

      const repos: Repository[] = await response.json();
      setRepositories(repos);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to fetch repositories'
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleRepository = (repo: Repository) => {
    setSelectedRepos((prev) =>
      prev.some((r) => r.id === repo.id)
        ? prev.filter((r) => r.id !== repo.id)
        : [...prev, repo]
    );
  };

  const filteredRepos = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <dialog open className='m-0 p-0 fixed inset-0 bg-transparent z-50'>
      <div
        className='fixed inset-0 bg-black bg-opacity-50'
        aria-hidden='true'
      />
      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center'>
          <div
            ref={modalRef}
            className='bg-white rounded-lg p-6 max-w-2xl w-full mx-4 h-[600px] flex flex-col relative'
          >
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold text-gray-800'>
                Select Repositories
              </h2>
              <button
                onClick={onClose}
                className='text-gray-500 hover:text-gray-700'
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            {verificationErrors.length > 0 && (
              <div className='mb-4 p-4 bg-red-50 border-l-4 border-red text-red rounded-md'>
                <p className='font-medium'>Failed to verify repositories:</p>
                <ul className='mt-2 list-disc list-inside'>
                  {verificationErrors.map((error, index) => (
                    <li key={index}>
                      {error.repo.name}: No valid8.json file found
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className='mb-4'>
              <input
                type='text'
                placeholder='Search repositories...'
                className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-hotPink focus:border-hotPink text-darkGray'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className='flex-grow overflow-auto mb-4'>
              {loading ? (
                <div className='flex justify-center items-center h-full'>
                  <FaSpinner
                    className='inline-block animate-spin'
                    color='hotPink'
                    size={36}
                  />
                </div>
              ) : error ? (
                <div className='flex justify-center items-center h-full text-red text-center'>
                  {error}
                </div>
              ) : (
                <div className='space-y-2'>
                  {filteredRepos.map((repo) => (
                    <label
                      key={repo.id}
                      className={`flex items-center p-3 hover:bg-gray-50 rounded-md cursor-pointer
                        ${
                          verificationErrors.some((e) => e.repo.id === repo.id)
                            ? 'border-l-4 border-red'
                            : ''
                        }`}
                    >
                      <div className='relative flex items-center'>
                        <input
                          type='checkbox'
                          className='sr-only'
                          checked={selectedRepos.some((r) => r.id === repo.id)}
                          onChange={() => toggleRepository(repo)}
                        />
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center ${
                            selectedRepos.some((r) => r.id === repo.id)
                              ? 'bg-hotPink'
                              : 'border-2 border-gray-300'
                          }`}
                        >
                          {selectedRepos.some((r) => r.id === repo.id) && (
                            <svg
                              className='w-3 h-3 text-white fill-current'
                              viewBox='0 0 20 20'
                            >
                              <path d='M0 11l2-2 5 5L18 3l2 2L7 18z' />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className='ml-3'>
                        <div className='font-medium text-gray-700'>
                          {repo.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {repo.full_name}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className='flex justify-end gap-3 pt-4 border-t'>
              <Button secondary onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => onSubmit(selectedRepos)}
                disabled={selectedRepos.length === 0}
                loading={verifying}
              >
                {verifying
                  ? 'Verifying...'
                  : `Add Selected (${selectedRepos.length})`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};
