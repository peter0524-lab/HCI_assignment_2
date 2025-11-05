
import React, { useState } from 'react';
import { Professor } from '../../types';
import { Button } from '../common/Button';
import { Loader } from '../common/Loader';
import * as geminiService from '../../services/geminiService';
import { ArrowLeftIcon, ArrowRightIcon } from '../icons/NavIcons';

interface ProfessorCardProps {
  professor: Professor;
  onSelect: () => void;
}

const ProfessorCard: React.FC<ProfessorCardProps> = ({ professor, onSelect }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300">
        <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">{professor.name}</h3>
        <p className="text-md font-semibold text-gray-700 dark:text-gray-300">{professor.university}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{professor.department}</p>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold">Research Area:</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{professor.researchArea}</p>
            <p className="text-sm font-semibold">Recent Publication:</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{professor.recentPublication}"</p>
        </div>
        <div className="mt-4 flex justify-end">
             <Button onClick={onSelect} variant="ghost">Select & Continue</Button>
        </div>
    </div>
);


interface Step4Props {
  proposal: string;
  professors: Professor[];
  setProfessors: (professors: Professor[]) => void;
  setSelectedProfessor: (professor: Professor) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step4ProfessorRecommender: React.FC<Step4Props> = ({ proposal, professors, setProfessors, setSelectedProfessor, onNext, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRecommend = async () => {
    setIsLoading(true);
    setError('');
    try {
      const recommendedProfessors = await geminiService.recommendProfessors(proposal);
      setProfessors(recommendedProfessors);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelect = (professor: Professor) => {
    setSelectedProfessor(professor);
    onNext();
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">AI Professor Recommender</h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">Find professors whose research aligns with your proposal.</p>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleRecommend} disabled={isLoading} variant="primary">
          {isLoading ? 'Searching...' : '✨ Find Matching Professors'}
        </Button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {isLoading && <Loader text="Analyzing your proposal and finding matches..." />}
      
      {!isLoading && professors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {professors.map((prof, index) => (
            <ProfessorCard key={index} professor={prof} onSelect={() => handleSelect(prof)} />
          ))}
        </div>
      )}

      <div className="flex justify-between mt-4">
        <Button onClick={onBack} variant="secondary">
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </Button>
        {/* Next button is removed as selection on card proceeds */}
      </div>
    </div>
  );
};
