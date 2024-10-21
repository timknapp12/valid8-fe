import React from 'react';
import { Row } from './Row';
import { Tile } from './Tile';
import { TrackProps } from '../types';

export const Track: React.FC<TrackProps> = ({ items }) => {
  return (
    <div className='w-full  overflow-x-auto bg-white bg-opacity-20'>
      <div className='inline-block min-w-full'>
        <Row className='flex-nowrap'>
          {items.map(({ id, name, owner, link }) => (
            <Tile key={id} id={id} name={name} owner={owner} link={link} />
          ))}
        </Row>
      </div>
    </div>
  );
};
