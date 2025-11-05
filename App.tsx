
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { StepIndicator } from './components/StepIndicator';
import { Step1UserInfo } from './components/steps/Step1_UserInfo';
import { Step2CVGenerator } from './components/steps/Step2_CVGenerator';
import { Step3ProposalGenerator } from './components/steps/Step3_ProposalGenerator';
import { Step4ProfessorRecommender } from './components/steps/Step4_ProfessorRecommender';
import { Step5EmailGenerator } from './components/steps/Step5_EmailGenerator';
import { UserData, Professor, DocumentData } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

const TOTAL_STEPS = 5;

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useLocalStorage<UserData>('userData', {
    name: 'Jihun Kim',
    major: 'Industrial Engineering, Computer Science (Double Major)',
    education: 'XYZ University, Bachelor of Science, 2020-2024, GPA: 4.3/4.5',
    experience: 'Summer Intern at ABC AI Lab (2023) - Worked on a chatbot project using LSTM models.',
    skills: 'Python, PyTorch, TensorFlow, Scikit-learn, Natural Language Processing',
    awards: 'Dean\'s List for 4 consecutive semesters',
    researchKeywords: 'Natural Language Processing, Generative AI, Chatbots',
  });
  const [documents, setDocuments] = useLocalStorage<DocumentData>('documents', {
    cv: '',
    proposal: '',
    email: ''
  });
  const [professors, setProfessors] = useLocalStorage<Professor[]>('professors', []);
  const [selectedProfessor, setSelectedProfessor] = useLocalStorage<Professor | null>('selectedProfessor', null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  const handleNext = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  }, []);

  const handleBack = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);
  
  const updateDocuments = useCallback((docType: keyof DocumentData, content: string) => {
    setDocuments(prev => ({...prev, [docType]: content}));
  }, [setDocuments]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1UserInfo userData={userData} setUserData={setUserData} onNext={handleNext} />;
      case 2:
        return <Step2CVGenerator userData={userData} cv={documents.cv} setCv={(content) => updateDocuments('cv', content)} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3ProposalGenerator userData={userData} proposal={documents.proposal} setProposal={(content) => updateDocuments('proposal', content)} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4ProfessorRecommender proposal={documents.proposal} professors={professors} setProfessors={setProfessors} onNext={handleNext} onBack={handleBack} setSelectedProfessor={setSelectedProfessor}/>;
      case 5:
        return <Step5EmailGenerator documents={documents} professor={selectedProfessor} email={documents.email} setEmail={(content) => updateDocuments('email', content)} onBack={handleBack}/>
      default:
        return <Step1UserInfo userData={userData} setUserData={setUserData} onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-all duration-500">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4UzAgOC4wNiAwIDE4YzAgNC40MTggMS41ODkgOC40NjggNC4yMjMgMTEuNjAzQzEuNTkgMzIuNTMyIDAgMzYuMTY4IDAgNDBjMCA5Ljk0IDguMDYgMTggMTggMThzMTgtOC4wNiAxOC0xOGMwLTMuODMyLTEuNTktNy40NjgtNC4yMjMtMTAuNjAzQzM0LjQxMSAyNi40NjggMzYgMjIuNDE4IDM2IDE4eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40 dark:opacity-20"></div>
      <div className="relative z-10">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="container mx-auto px-4 py-10">
          <div className="max-w-5xl mx-auto">
            <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
            <div className="mt-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 sm:p-12 transition-all duration-500 hover:shadow-3xl">
              {renderStep()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
