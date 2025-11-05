
import React, { useState } from 'react';
import { Professor, DocumentData } from '../../types';
import { Button } from '../common/Button';
import { Loader } from '../common/Loader';
import { DocumentViewer } from '../common/DocumentViewer';
import * as geminiService from '../../services/geminiService';
import { ArrowLeftIcon } from '../icons/NavIcons';

interface Step5Props {
  documents: DocumentData;
  professor: Professor | null;
  email: string;
  setEmail: (email: string) => void;
  onBack: () => void;
}

export const Step5EmailGenerator: React.FC<Step5Props> = ({ documents, professor, email, setEmail, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!professor) return;
    setIsLoading(true);
    setError('');
    try {
      const generatedEmail = await geminiService.generateEmail(documents, professor);
      setEmail(generatedEmail);
    } catch (err) {
      setError('Failed to generate email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!professor) {
    return (
      <div className="text-center">
        <p>No professor selected. Please go back and select a professor.</p>
        <Button onClick={onBack} variant="secondary" className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">AI Contact Email Generator</h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Create a professional email to <span className="font-semibold text-primary-600 dark:text-primary-400">{professor.name}</span>.
        </p>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleGenerate} disabled={isLoading} variant="primary">
          {isLoading ? 'Generating...' : '✨ Generate Email with AI'}
        </Button>
      </div>
      
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {isLoading ? <Loader text="Writing a professional email..." /> : <DocumentViewer content={email} />}

      <div className="flex justify-between mt-4">
        <Button onClick={onBack} variant="secondary">
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </Button>
        <Button onClick={() => alert('Process Complete!')}>
          Finish
        </Button>
      </div>
    </div>
  );
};
