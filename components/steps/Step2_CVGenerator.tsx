
import React, { useState } from 'react';
import { UserData } from '../../types';
import { Button } from '../common/Button';
import { Loader } from '../common/Loader';
import { DocumentViewer } from '../common/DocumentViewer';
import * as geminiService from '../../services/geminiService';
import { ArrowLeftIcon, ArrowRightIcon } from '../icons/NavIcons';

interface Step2Props {
  userData: UserData;
  cv: string;
  setCv: (cv: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2CVGenerator: React.FC<Step2Props> = ({ userData, cv, setCv, onNext, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    try {
      const generatedCv = await geminiService.generateCV(userData);
      setCv(generatedCv);
    } catch (err) {
      setError('Failed to generate CV. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">AI CV Generator</h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">Generate a professional academic CV based on your information.</p>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleGenerate} disabled={isLoading} variant="primary">
          {isLoading ? 'Generating...' : '✨ Generate with AI'}
        </Button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {isLoading ? <Loader text="Crafting your CV..." /> : <DocumentViewer content={cv} />}

      <div className="flex justify-between mt-4">
        <Button onClick={onBack} variant="secondary">
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </Button>
        <Button onClick={onNext} disabled={!cv}>
          Next Step
          <ArrowRightIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
