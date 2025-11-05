
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
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center justify-between">
        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isActive = currentStep === stepNum;
          const isCompleted = currentStep > stepNum;
          return (
            <React.Fragment key={stepNum}>
              <div className="flex flex-col items-center text-center relative">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-500 transform
                    ${isCompleted ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg shadow-green-500/50 scale-100' : ''}
                    ${isActive ? 'bg-gradient-to-br from-primary-500 to-purple-600 text-white shadow-xl shadow-primary-500/50 scale-110 ring-4 ring-primary-200 dark:ring-primary-800' : ''}
                    ${!isCompleted && !isActive ? 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-500 dark:text-gray-400 scale-90' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  ) : (
                    <span className={isActive ? 'animate-pulse' : ''}>{stepNum}</span>
                  )}
                </div>
                <p className={`mt-3 text-xs sm:text-sm font-semibold transition-all duration-300 ${isActive || isCompleted ? 'text-primary-700 dark:text-primary-300 scale-105' : 'text-gray-500 dark:text-gray-400'}`}>
                  {label}
                </p>
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full animate-ping"></div>
                )}
              </div>
              {stepNum < steps.length && (
                <div className="flex-1 h-2 mx-2 sm:mx-3 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 relative">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ease-out
                      ${isCompleted ? 'bg-gradient-to-r from-green-400 to-green-600 w-full' : 'w-0'}
                    `}
                  >
                    {isCompleted && (
                      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
