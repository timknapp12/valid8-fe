import React from 'react';
import { Row } from './Row';
import { Tile } from './Tile';
import { TrackProps } from '../types';

export const Track: React.FC<TrackProps> = ({ items }) => {
  return (
    <div className='w-full bg-darkGray overflow-x-auto'>
      <div className='inline-block min-w-full'>
        <Row className='p-4 gap-4 flex-nowrap'>
          {items.map(({ id, name, owner, link }) => (
            <Tile key={id} id={id} name={name} owner={owner} link={link} />
          ))}
        </Row>
      </div>
    </div>
  );
};
