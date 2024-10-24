import React, { useState } from 'react';
import { supabase } from '../utils/supabaseConfig';
import { TileProps } from '../types';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { TileModal } from './TileModal';

export const Tile: React.FC<TileProps> = ({
  full_name,
  repo_name,
  username,
  repo_url,
  valid8_content,
  num_of_clicks = 0,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);

    void supabase
      .from('repositories')
      .update({ num_of_clicks: (num_of_clicks || 0) + 1 })
      .eq('full_name', full_name)
      .then(({ error }) => {
        if (error) {
          console.error('Error incrementing clicks:', error);
        } else {
          console.log('Click updated successfully:', full_name);
        }
      });
  };

  return (
    <>
      <div className='bg-white rounded-lg p-4 min-w-64 max-w-64 h-48 flex flex-col justify-between shadow-custom-dark hover:shadow-custom-dark-hover transition-shadow duration-300 relative'>
        <button className='absolute top-2 right-2' onClick={handleClick}>
          <AiOutlineFullscreen
            className='text-gray-400 hover:text-gray-600 cursor-pointer'
            size={20}
            title='Expand'
          />
        </button>
        <div className='flex-grow overflow-hidden'>
          <h3
            className='text-lg font-semibold mb-2 text-gray-800 break-words line-clamp-3'
            title={repo_name}
          >
            {repo_name}
          </h3>
          <p
            className='text-sm text-gray-600 break-words line-clamp-2'
            title={username}
          >
            {username}
          </p>
        </div>
        <div className='mt-2 w-full overflow-hidden'>
          <a
            href={repo_url}
            target='_blank'
            rel='noreferrer'
            className='text-blue hover:underline block truncate'
            title={repo_url}
          >
            {repo_url}
          </a>
        </div>
      </div>
      {isModalOpen && (
        <TileModal
          full_name={full_name}
          repo_name={repo_name}
          username={username}
          repo_url={repo_url}
          valid8_content={valid8_content}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
