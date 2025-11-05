
import React, { useState } from 'react';
import { UserData } from '../../types';
import { Button } from '../common/Button';
import { Loader } from '../common/Loader';
import { DocumentViewer } from '../common/DocumentViewer';
import * as geminiService from '../../services/geminiService';
import { ArrowLeftIcon, ArrowRightIcon } from '../icons/NavIcons';

interface Step3Props {
  userData: UserData;
  proposal: string;
  setProposal: (proposal: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3ProposalGenerator: React.FC<Step3Props> = ({ userData, proposal, setProposal, onNext, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    try {
      const generatedProposal = await geminiService.generateProposal(userData);
      setProposal(generatedProposal);
    } catch (err) {
      setError('Failed to generate proposal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">AI Research Proposal Generator</h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">Create a compelling research proposal that highlights your interests and potential.</p>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleGenerate} disabled={isLoading} variant="primary">
          {isLoading ? 'Generating...' : '✨ Generate with AI'}
        </Button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {isLoading ? <Loader text="Structuring your research ideas..." /> : <DocumentViewer content={proposal} />}

      <div className="flex justify-between mt-4">
        <Button onClick={onBack} variant="secondary">
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </Button>
        <Button onClick={onNext} disabled={!proposal}>
          Next Step
          <ArrowRightIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
