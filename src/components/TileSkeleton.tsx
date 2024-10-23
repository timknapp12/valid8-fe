import React from 'react';

export const TileSkeleton: React.FC = () => {
  return (
    <div className='bg-white rounded-lg p-4 min-w-64 max-w-64 h-48 flex flex-col justify-between shadow-custom-dark animate-pulse'>
      <div className='flex justify-between items-start'>
        <div className='h-6 bg-gray-200 rounded w-3/4'></div>
        <div className='w-5 h-5 bg-gray-200 rounded'></div>
      </div>
      <div className='space-y-2'>
        <div className='h-4 bg-gray-200 rounded'></div>
        <div className='h-4 bg-gray-200 rounded w-5/6'></div>
      </div>
      <div className='h-4 bg-gray-200 rounded w-full'></div>
    </div>
  );
};
