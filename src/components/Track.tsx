import React from 'react';
import { Row } from './Row';
import { Tile } from './Tile';
import { TrackProps } from '../types';

export const Track: React.FC<TrackProps> = ({ items }) => {
  return (
    <div className='w-full overflow-x-auto bg-white bg-opacity-20 h-[260px] flex flex-col justify-center items-start relative'>
      <div className='flex-grow flex items-center'>
        {items.length === 0 ? (
          <Row style={{ justifyContent: 'center', width: '100%' }}>
            <p className='text-white'>No results found</p>
          </Row>
        ) : (
          <Row
            className='flex-nowrap relative'
            style={{ justifyContent: 'flex-start' }}
          >
            {items.map(({ id, name, owner, link }) => (
              <Tile key={id} id={id} name={name} owner={owner} link={link} />
            ))}
            <div className='absolute right-0 top-0 bottom-0 w-8 pointer-events-none'></div>
          </Row>
        )}
      </div>
    </div>
  );
};
