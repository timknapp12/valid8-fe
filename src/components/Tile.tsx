import React, { useState } from 'react';
import { TileProps } from '../types';
import { AiOutlineFullscreen } from 'react-icons/ai';
import { TileModal } from './TileModal';

export const Tile: React.FC<TileProps> = ({ id, name, owner, link }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className='bg-white rounded-lg p-4 min-w-64 max-w-64 h-48 flex flex-col justify-between shadow-custom-dark hover:shadow-custom-dark-hover transition-shadow duration-300 relative'>
        <button
          className='absolute top-2 right-2'
          onClick={() => setIsModalOpen(true)}
        >
          <AiOutlineFullscreen
            className='text-gray-400 hover:text-gray-600 cursor-pointer'
            size={20}
            title='Expand'
          />
        </button>
        <div className='flex-grow overflow-hidden'>
          <h3
            className='text-lg font-semibold mb-2 text-gray-800 break-words line-clamp-3'
            title={name}
          >
            {name}
          </h3>
          <p
            className='text-sm text-gray-600 break-words line-clamp-2'
            title={owner}
          >
            {owner}
          </p>
        </div>
        <div className='mt-2 w-full overflow-hidden'>
          <a
            href={link}
            target='_blank'
            rel='noreferrer'
            className='text-blue hover:underline block truncate'
            title={link}
          >
            {link}
          </a>
        </div>
      </div>
      {isModalOpen && (
        <TileModal
          id={id}
          name={name}
          owner={owner}
          link={link}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
