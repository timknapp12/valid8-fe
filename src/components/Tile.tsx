import React from 'react';
import { TileProps } from '../types';

export const Tile: React.FC<TileProps> = ({ name, owner, link }) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 m-4 transition-shadow hover:shadow-lg max-w-xs w-full'>
      <h3 className='text-lg font-semibold mb-2 text-gray-800 break-words'>
        {name}
      </h3>
      <p className='text-sm text-gray-600 break-words'>{owner}</p>
      <a
        href={link}
        target='_blank'
        rel='noreferrer'
        className='text-blue hover:underline truncate block'
      >
        {link}
      </a>
    </div>
  );
};
