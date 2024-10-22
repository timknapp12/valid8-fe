import React from 'react';
import { Row } from './Row';
import { Tile } from './Tile';
import { TrackProps } from '../types';

export const Track: React.FC<TrackProps> = ({ items }) => {
  return (
    <div className='w-full overflow-x-auto bg-white bg-opacity-20 h-[260px] flex flex-col justify-center items-start relative'>
      <div className='w-full flex items-center'>
        {items.length === 0 ? (
          <Row
            className='w-full'
            style={{
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <p className='text-white'>No results found</p>
          </Row>
        ) : (
          <Row
            className='flex-nowrap relative'
            style={{
              justifyContent: 'flex-start',
              gap: '2rem',
              padding: '0 2rem',
            }}
          >
            {items.map(({ id, name, owner, link }) => (
              <Tile key={id} id={id} name={name} owner={owner} link={link} />
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};
