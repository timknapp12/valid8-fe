import React from 'react';
import { Row } from './Row';
import { Tile } from './Tile';
import { TileSkeleton } from './TileSkeleton';
import { useAppContext } from '../contexts/AppContext';

const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Track = () => {
  const { filteredRepos, isLoadingRepos } = useAppContext();

  if (isLoadingRepos) {
    return (
      <div className='w-full overflow-x-auto bg-white bg-opacity-20 h-[260px] flex flex-col justify-center items-start relative'>
        <Row
          className='flex-nowrap relative'
          style={{
            justifyContent: 'flex-start',
            gap: '2rem',
            padding: '0 2rem',
          }}
        >
          {skeletons.map((skeleton) => (
            <TileSkeleton key={skeleton} />
          ))}
        </Row>
      </div>
    );
  }

  return (
    <div className='w-full overflow-x-auto bg-white bg-opacity-20 h-[260px] flex flex-col justify-center items-start relative'>
      <div className='w-full flex items-center'>
        {filteredRepos.length === 0 ? (
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
            {filteredRepos.map(
              ({
                full_name,
                repo_name,
                username,
                repo_url,
                valid8_content,
              }) => (
                <Tile
                  key={full_name}
                  repo_name={repo_name}
                  username={username}
                  repo_url={repo_url}
                  valid8_content={valid8_content}
                />
              )
            )}
          </Row>
        )}
      </div>
    </div>
  );
};
