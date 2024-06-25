import React from 'react';
import { ProgressBar } from 'react-aria-components';

const LoaderProgressBar = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-lg flex justify-center">
      <ProgressBar value={30} className="flex flex-col gap-3 w-56 text-white">
        {({ percentage, valueText }) => (
          <>
            <div className="flex items-center">
              <span className="flex-1">Loading...</span>
              <span>{valueText}</span>
            </div>
            <div className="h-2 relative w-full rounded-full bg-white bg-opacity-40">
              <div
                className="absolute h-2 rounded-full bg-white"
                style={{ width: percentage + '%' }}
              />
            </div>
          </>
        )}
      </ProgressBar>
    </div>
  );
};

export default LoaderProgressBar;