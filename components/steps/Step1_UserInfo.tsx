
import React from 'react';
import { UserData } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { ArrowRightIcon } from '../icons/NavIcons';

interface Step1Props {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
}

export const Step1UserInfo: React.FC<Step1Props> = ({ userData, setUserData, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setUserData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Tell Us About Yourself</h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">This information will be used to generate your application documents.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input id="name" label="Full Name" value={userData.name} onChange={handleChange} />
        <Input id="major" label="Major(s)" value={userData.major} onChange={handleChange} />
      </div>
      <Textarea id="education" label="Education (University, Degree, GPA)" value={userData.education} onChange={handleChange} rows={3} />
      <Textarea id="experience" label="Work/Research Experience" value={userData.experience} onChange={handleChange} rows={5} />
      <Textarea id="skills" label="Technical Skills (e.g., Python, PyTorch)" value={userData.skills} onChange={handleChange} />
      <Textarea id="awards" label="Awards and Honors" value={userData.awards} onChange={handleChange} />
      <Textarea id="researchKeywords" label="Research Keywords (e.g., NLP, Generative AI)" value={userData.researchKeywords} onChange={handleChange} />
      <div className="flex justify-end mt-4">
        <Button onClick={onNext}>
          Save & Continue
          <ArrowRightIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
