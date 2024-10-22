import React, { useRef, useEffect, useState } from 'react';
import { TileProps } from '../types';
import { AiOutlineClose, AiOutlineCopy } from 'react-icons/ai';
import mockValid8 from '../mocks/mockValid8.json';

interface TileModalProps extends TileProps {
  onClose: () => void;
}

export const TileModal: React.FC<TileModalProps> = ({
  name,
  owner,
  link,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(mockValid8, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div
        ref={modalRef}
        className='bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col'
      >
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold text-gray-800'>{name}</h2>
          <button onClick={onClose} title='Close'>
            <AiOutlineClose
              className='text-gray-600 hover:text-gray-800 cursor-pointer'
              size={24}
            />
          </button>
        </div>
        <div className='mb-4'>
          <h3 className='text-lg font-semibold text-gray-700 mb-2'>Owner</h3>
          <p className='text-gray-600'>{owner}</p>
        </div>
        <div>
          <h3 className='text-lg font-semibold text-gray-700 mb-2'>Link</h3>
          <a
            href={link}
            target='_blank'
            rel='noreferrer'
            className='text-blue hover:underline break-all'
          >
            {link}
          </a>
        </div>
        <div className='mt-4 flex-grow flex flex-col overflow-hidden'>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='text-lg font-semibold text-gray-700'>Valid8.json</h3>
            <button
              onClick={handleCopy}
              className='flex items-center justify-center text-sm text-hotPink hover:text-darkHotPink'
            >
              <AiOutlineCopy className='mr-1' />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className='bg-gray-100 p-4 rounded-md overflow-auto flex-grow'>
            <code className='text-sm text-gray-800 whitespace-pre-wrap'>
              {JSON.stringify(mockValid8, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
