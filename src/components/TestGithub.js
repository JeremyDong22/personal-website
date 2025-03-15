import React from 'react';
import { FiGithub } from 'react-icons/fi';

const TestGithub = () => {
  return (
    <div className="p-4 bg-dark text-white">
      <h2>GitHub Icon Test</h2>
      <div className="mt-4">
        <a
          href="https://github.com/JeremyDong22"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block p-3 bg-primary text-white rounded-md"
        >
          <FiGithub size={24} className="inline-block mr-2" />
          Visit GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default TestGithub; 