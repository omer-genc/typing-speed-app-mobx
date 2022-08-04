import React from 'react';

interface Props {
  scores: Array<number>;
}

function Scores({ scores }: Props) {
  
  if (scores.length === 0) {
    return null;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-center text-4xl">Scores</h1>
      <div className="flex gap-4">
        {scores.map((score, index) => (
          <div
            className="bg-teal-500 w-10 h-10 flex justify-center items-center rounded-lg shadow-lg"
            key={index}
          >
            {score}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scores;
