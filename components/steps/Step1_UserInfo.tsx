
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
    <div className="flex flex-col gap-8 animate-fadeIn">
      <div className="text-center pb-4 border-b-2 border-gradient-to-r from-primary-500 to-purple-600">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 text-white mb-4 shadow-xl shadow-primary-500/30">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
          Tell Us About Yourself
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-lg">
          This information will be used to generate your application documents.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-primary-100 dark:border-gray-600">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input id="name" label="Full Name" value={userData.name} onChange={handleChange} placeholder="Enter your full name" />
            <Input id="major" label="Major(s)" value={userData.major} onChange={handleChange} placeholder="e.g., Computer Science" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-blue-100 dark:border-gray-600">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Academic Background
          </h3>
          <Textarea id="education" label="Education (University, Degree, GPA)" value={userData.education} onChange={handleChange} rows={3} placeholder="e.g., MIT, Bachelor of Science, GPA: 3.9/4.0" />
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-green-100 dark:border-gray-600">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Experience & Skills
          </h3>
          <div className="space-y-6">
            <Textarea id="experience" label="Work/Research Experience" value={userData.experience} onChange={handleChange} rows={5} placeholder="Describe your relevant work or research experience..." />
            <Textarea id="skills" label="Technical Skills" value={userData.skills} onChange={handleChange} placeholder="e.g., Python, PyTorch, TensorFlow, Machine Learning" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-amber-100 dark:border-gray-600">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
            Achievements & Research Interests
          </h3>
          <div className="space-y-6">
            <Textarea id="awards" label="Awards and Honors" value={userData.awards} onChange={handleChange} placeholder="List your academic awards and honors..." />
            <Textarea id="researchKeywords" label="Research Keywords" value={userData.researchKeywords} onChange={handleChange} placeholder="e.g., NLP, Generative AI, Computer Vision" />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
        <Button onClick={onNext}>
          Save & Continue
          <ArrowRightIcon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};
