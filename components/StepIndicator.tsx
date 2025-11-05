
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  "User Info",
  "CV",
  "Proposal",
  "Professors",
  "Contact Email"
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = currentStep === stepNum;
        const isCompleted = currentStep > stepNum;
        return (
          <React.Fragment key={stepNum}>
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
                  ${isCompleted ? 'bg-primary-600 text-white' : ''}
                  ${isActive ? 'bg-primary-500 text-white ring-4 ring-primary-200 dark:ring-primary-700' : ''}
                  ${!isCompleted && !isActive ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400' : ''}
                `}
              >
                {isCompleted ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                ) : (
                  stepNum
                )}
              </div>
              <p className={`mt-2 text-xs sm:text-sm font-medium transition-colors duration-300 ${isActive || isCompleted ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}>{label}</p>
            </div>
            {stepNum < steps.length && (
              <div className={`flex-1 h-1 mx-2 rounded
                ${isCompleted ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'}
              `}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
