
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className="group">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {label}
      </label>
      <input
        id={id}
        className="block w-full px-5 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-sm 
                   focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400
                   hover:border-gray-300 dark:hover:border-gray-600
                   transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
        {...props}
      />
    </div>
  );
};
