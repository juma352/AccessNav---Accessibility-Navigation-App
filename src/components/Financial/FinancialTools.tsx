import React, { useState, useEffect } from 'react';
import { DollarSign, Target, FileText, Scan, CreditCard, PiggyBank, Calculator, TrendingUp, Plus, Award, Smartphone, Users } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { FinancialGoal, BenefitProgram, Document } from '../../types';
import { FinancialGoal as FinancialGoalComponent } from './FinancialGoal';
import { BenefitProgram as BenefitProgramComponent } from './BenefitProgram';
import { Document as DocumentComponent } from './Document';

interface FinancialToolsProps {
  onClose: () => void;
}

export const FinancialTools: React.FC<FinancialToolsProps> = ({ onClose }) => {
  const { speak } = useAccessibility();
  const [activeTab, setActiveTab] = useState<'goals' | 'benefits' | 'documents' | 'literacy'>('goals');
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [appliedBenefits, setAppliedBenefits] = useState<string[]>([]);
  const [benefitPrograms, setBenefitPrograms] = useState<BenefitProgram[]>([]);
  const [sampleGoals, setSampleGoals] = useState<FinancialGoal[]>([]);
  const [sampleDocuments, setSampleDocuments] = useState<Document[]>([]);

  // Load initial data
  useEffect(() => {
    // Sample goals
    setSampleGoals([
      {
        id: '1',
        title: 'Emergency Fund',
        targetAmount: 50000,
        currentAmount: 12000,
        deadline: new Date('2025-12-31'),
        category: 'emergency-fund',
        priority: 'high',
        savingsMethod: 'sacco'
      }
    ]);

    // Sample documents
    setSampleDocuments([
      {
        id: '1',
        name: 'National ID',
        type: 'id',
        dateAdded: new Date('2025-01-01'),
        tags: ['identification', 'government'],
        securityLevel: 'high',
        issuingAuthority: 'Government of Kenya'
      },
      {
        id: '2',
        name: 'NCPWD Disability Card',
        type: 'disability-card',
        dateAdded: new Date('2025-01-01'),
        tags: ['disability', 'benefits'],
        securityLevel: 'high',
        issuingAuthority: 'NCPWD'
      }
    ]);

    // Kenya-specific benefit programs
    setBenefitPrograms([
      {
        id: '1',
        name: 'Inua Jamii Programme (Older Persons Cash Transfer)',
        type: 'national',
        eligibility: ['Age 70 and above', 'Kenyan citizen', 'Not receiving other government cash transfers'],
        benefits: ['KES 2,000 monthly cash transfer', 'Healthcare support', 'Social protection'],
        applicationProcess: 'Apply at your local chief\'s office or social development office',
        contactInfo: 'Ministry of Labour and Social Protection: 020 2729800',
        estimatedValue: 'KES 24,000 annually',
        renewalRequired: true,
        ncpwdRegistrationRequired: false,
        documentsRequired: ['National ID', 'Birth certificate', 'Location letter from chief']
      },
      {
        id: '2',
        name: 'Persons with Severe Disabilities Cash Transfer',
        type: 'national',
        eligibility: ['Severe disability', 'NCPWD registration', 'Kenyan citizen', 'Age 18-64'],
        benefits: ['KES 2,000 monthly cash transfer', 'Healthcare support', 'Assistive devices support'],
        applicationProcess: 'Apply through NCPWD offices or social development offices',
        contactInfo: 'NCPWD: 020 2727904',
        estimatedValue: 'KES 24,000 annually',
        renewalRequired: true,
        ncpwdRegistrationRequired: true,
        documentsRequired: ['National ID', 'NCPWD disability card', 'Medical assessment report']
      },
      {
        id: '3',
        name: 'Youth Enterprise Development Fund',
        type: 'national',
        eligibility: ['Age 18-35', 'Kenyan citizen', 'Business plan', 'Group or individual application'],
        benefits: ['Low-interest loans', 'Business training', 'Mentorship', 'Market linkages'],
        applicationProcess: 'Apply online at www.youthfund.go.ke or visit constituency offices',
        contactInfo: 'Youth Fund: 020 2211681',
        estimatedValue: 'Loans from KES 50,000 to KES 2,000,000',
        renewalRequired: false,
        ncpwdRegistrationRequired: false,
        documentsRequired: ['National ID', 'Business plan', 'Group registration (if applicable)']
      },
      {
        id: '4',
        name: 'Women Enterprise Fund',
        type: 'national',
        eligibility: ['Women aged 18+', 'Kenyan citizen', 'Business idea or existing business'],
        benefits: ['Low-interest loans', 'Business training', 'Capacity building', 'Market access'],
        applicationProcess: 'Apply through women groups or individual application at constituency offices',
        contactInfo: 'Women Enterprise Fund: 020 2211681',
        estimatedValue: 'Loans from KES 50,000 to KES 500,000',
        renewalRequired: false,
        ncpwdRegistrationRequired: false,
        documentsRequired: ['National ID', 'Business plan', 'Group registration certificate']
      }
    ]);
  }, []);

  const handleTabChange = (tab: 'goals' | 'benefits' | 'documents' | 'literacy') => {
    setActiveTab(tab);
    speak(`Switched to ${tab} section`);
  };

  const handleCreateGoal = () => {
    const newGoal: FinancialGoal = {
      id: Date.now().toString(),
      title: 'New Financial Goal',
      targetAmount: 10000,
      currentAmount: 0,
      deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      category: 'other',
      priority: 'medium',
      savingsMethod: 'mobile-money'
    };
    setGoals([...goals, newGoal]);
    speak('New financial goal created. Please update the details.');
  };

  const handleAddMoney = (goalId: string) => {
    const goal = [...sampleGoals, ...goals].find(g => g.id === goalId);
    if (goal) {
      if (sampleGoals.some(g => g.id === goalId)) {
        // Update sample goal
        setSampleGoals(sampleGoals.map(g => 
          g.id === goalId 
            ? { ...g, currentAmount: g.currentAmount + 1000 }
            : g
        ));
      } else {
        // Update user goal
        setGoals(goals.map(g => 
          g.id === goalId 
            ? { ...g, currentAmount: g.currentAmount + 1000 }
            : g
        ));
      }
      speak(`Added KES 1,000 to ${goal.title}. Great progress!`);
    }
  };

  const handleEditGoal = (goalId: string) => {
    speak(`Editing goal details`);
    // In a real app, this would open a goal editing modal
  };

  const handleApplyBenefit = (benefitId: string) => {
    const benefit = benefitPrograms.find(b => b.id === benefitId);
    if (benefit && !appliedBenefits.includes(benefitId)) {
      setAppliedBenefits([...appliedBenefits, benefitId]);
      speak(`Application started for ${benefit.name}. You will be guided through the process.`);
    } else if (benefit) {
      speak(`You have already applied for ${benefit.name}`);
    }
  };

  const handleScanDocument = () => {
    const newDoc: Document = {
      id: Date.now().toString(),
      name: 'Scanned Document',
      type: 'other',
      dateAdded: new Date(),
      tags: ['scanned'],
      securityLevel: 'medium'
    };
    setDocuments([...documents, newDoc]);
    speak('Document scanned and saved securely. Please add tags and description.');
  };

  const handleViewDocument = (documentId: string) => {
    speak(`Viewing document`);
    // In a real app, this would open a document viewer
  };

  const handleShareDocument = (documentId: string) => {
    speak(`Sharing document securely`);
    // In a real app, this would open a document sharing dialog
  };

  const renderGoals = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Financial Goals</h3>
        <AccessibleButton
          onClick={handleCreateGoal}
          variant="primary"
          size="md"
          ariaLabel="Create new financial goal"
          icon={<Plus className="w-4 h-4" />}
        >
          New Goal
        </AccessibleButton>
      </div>

      <div className="grid gap-6">
        {[...sampleGoals, ...goals].map((goal) => (
          <FinancialGoalComponent 
            key={goal.id} 
            goal={goal} 
            onAddMoney={handleAddMoney}
            onEdit={handleEditGoal}
          />
        ))}
      </div>

      {goals.length > 0 && (
        <AccessibleCard title="Savings Tips for Kenya" className="bg-green-50 border-green-200">
          <div className="space-y-3">
            <p className="text-green-800">
              You have {goals.length + sampleGoals.length} active goal{goals.length + sampleGoals.length > 1 ? 's' : ''}. 
              Here are some Kenya-specific saving strategies:
            </p>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Use M-Pesa savings (M-Shwari, KCB M-Pesa) for easy access</li>
              <li>• Join a local SACCO for better interest rates</li>
              <li>• Consider Chama (group savings) for accountability</li>
              <li>• Use government savings bonds for long-term goals</li>
            </ul>
          </div>
        </AccessibleCard>
      )}
    </div>
  );

  const renderBenefits = () => (
    <div className="space-y-6">
      <div className="grid gap-6">
        {benefitPrograms.map((program) => (
          <BenefitProgramComponent 
            key={program.id} 
            program={program} 
            onApply={handleApplyBenefit}
            isApplied={appliedBenefits.includes(program.id)}
          />
        ))}
      </div>

      {appliedBenefits.length > 0 && (
        <AccessibleCard title="Your Applications" className="bg-green-50 border-green-200">
          <p className="text-green-800 mb-3">
            You have applied for {appliedBenefits.length} benefit program{appliedBenefits.length > 1 ? 's' : ''}. 
            Processing typically takes 2-4 weeks. You will be contacted for any additional requirements.
          </p>
          <AccessibleButton
            onClick={() => speak('Opening application tracking dashboard')}
            variant="primary"
            size="md"
            ariaLabel="Track your benefit applications"
          >
            Track Applications
          </AccessibleButton>
        </AccessibleCard>
      )}
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Document Manager</h3>
        <div className="flex gap-3">
          <AccessibleButton
            onClick={handleScanDocument}
            variant="primary"
            size="md"
            ariaLabel="Scan new document"
            icon={<Scan className="w-4 h-4" />}
          >
            Scan Document
          </AccessibleButton>
          <AccessibleButton
            onClick={() => speak('Uploading document from files')}
            variant="secondary"
            size="md"
            ariaLabel="Upload document"
            icon={<FileText className="w-4 h-4" />}
          >
            Upload
          </AccessibleButton>
        </div>
      </div>

      <div className="grid gap-4">
        {[...sampleDocuments, ...documents].map((doc) => (
          <DocumentComponent 
            key={doc.id} 
            document={doc} 
            onView={handleViewDocument}
            onShare={handleShareDocument}
          />
        ))}
      </div>

      <AccessibleCard title="Document Scanner with OCR">
        <div className="space-y-4">
          <p className="text-gray-600">
            Use your device camera to scan and digitize important documents with text recognition.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <AccessibleButton
              onClick={handleScanDocument}
              variant="primary"
              size="lg"
              fullWidth
              ariaLabel="Scan document with camera"
              icon={<Scan className="w-5 h-5" />}
            >
              Scan with Camera
            </AccessibleButton>
            <AccessibleButton
              onClick={() => speak('Uploading document from files')}
              variant="secondary"
              size="lg"
              fullWidth
              ariaLabel="Upload document from files"
              icon={<FileText className="w-5 h-5" />}
            >
              Upload from Files
            </AccessibleButton>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Features:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Automatic text recognition (OCR) in English and Swahili</li>
              <li>• Secure encrypted storage</li>
              <li>• Automatic categorization</li>
              <li>• Expiration date reminders</li>
              <li>• Easy sharing with government offices and banks</li>
              <li>• Offline access to scanned documents</li>
            </ul>
          </div>
        </div>
      </AccessibleCard>

      {documents.length > 0 && (
        <AccessibleCard title="Document Security" className="bg-yellow-50 border-yellow-200">
          <p className="text-yellow-800 mb-3">
            You have {documents.length + sampleDocuments.length} document{documents.length + sampleDocuments.length > 1 ? 's' : ''} stored securely. 
            All documents are encrypted and only accessible by you.
          </p>
          <AccessibleButton
            onClick={() => speak('Opening document security settings')}
            variant="primary"
            size="md"
            ariaLabel="Manage document security"
          >
            Security Settings
          </AccessibleButton>
        </AccessibleCard>
      )}
    </div>
  );

  const renderLiteracy = () => (
    <div className="space-y-6">
      <AccessibleCard title="Financial Literacy for Kenya">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Mobile Money Management</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• M-Pesa savings and loans (M-Shwari, KCB M-Pesa)</li>
                <li>• Airtel Money and T-Kash features</li>
                <li>• Mobile banking safety tips</li>
                <li>• Understanding transaction costs</li>
              </ul>
              <AccessibleButton
                onClick={() => speak('Starting mobile money tutorial')}
                variant="primary"
                size="sm"
                className="mt-3"
                ariaLabel="Start mobile money tutorial"
                icon={<Smartphone className="w-4 h-4" />}
              >
                Start Tutorial
              </AccessibleButton>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">SACCO and Chama Benefits</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• How to join and benefit from SACCOs</li>
                <li>• Starting or joining a Chama</li>
                <li>• Group savings and loan strategies</li>
                <li>• Understanding interest rates and terms</li>
              </ul>
              <AccessibleButton
                onClick={() => speak('Learning about SACCOs and Chamas')}
                variant="primary"
                size="sm"
                className="mt-3"
                ariaLabel="Learn about SACCOs and Chamas"
                icon={<Users className="w-4 h-4" />}
              >
                Learn More
              </AccessibleButton>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <AccessibleButton
              onClick={() => speak('Opening budget calculator for Kenya')}
              variant="secondary"
              size="md"
              fullWidth
              ariaLabel="Open budget calculator"
              icon={<Calculator className="w-4 h-4" />}
            >
              Budget Calculator
            </AccessibleButton>
            <AccessibleButton
              onClick={() => speak('Opening savings planner')}
              variant="secondary"
              size="md"
              fullWidth
              ariaLabel="Open savings planner"
              icon={<PiggyBank className="w-4 h-4" />}
            >
              Savings Planner
            </AccessibleButton>
            <AccessibleButton
              onClick={() => speak('Learning about investment options in Kenya')}
              variant="secondary"
              size="md"
              fullWidth
              ariaLabel="Learn investment basics"
              icon={<TrendingUp className="w-4 h-4" />}
            >
              Investment Basics
            </AccessibleButton>
          </div>
        </div>
      </AccessibleCard>

      <AccessibleCard title="Government Financial Programs for PWDs">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Disability Cash Transfers</h4>
              <p className="text-sm text-gray-700 mb-3">
                Monthly cash support for persons with severe disabilities
              </p>
              <AccessibleButton
                onClick={() => speak('Learning about disability cash transfers')}
                variant="secondary"
                size="sm"
                ariaLabel="Learn about disability cash transfers"
              >
                Learn More
              </AccessibleButton>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Tax Exemptions</h4>
              <p className="text-sm text-gray-700 mb-3">
                Tax relief and exemptions available for persons with disabilities
              </p>
              <AccessibleButton
                onClick={() => speak('Learning about tax exemptions for PWDs')}
                variant="secondary"
                size="sm"
                ariaLabel="Learn about tax exemptions"
              >
                Learn More
              </AccessibleButton>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Free Financial Counseling</h4>
            <p className="text-green-800 text-sm mb-3">
              Get personalized financial advice from certified counselors who understand disability-related financial challenges in Kenya.
            </p>
            <AccessibleButton
              onClick={() => speak('Connecting with financial counselor')}
              variant="primary"
              size="sm"
              ariaLabel="Connect with financial counselor"
            >
              Find Counselor
            </AccessibleButton>
          </div>
        </div>
      </AccessibleCard>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Financial Tools & Literacy</h2>
        <AccessibleButton
          onClick={onClose}
          variant="secondary"
          size="md"
          ariaLabel="Close financial tools"
        >
          Close
        </AccessibleButton>
      </div>

      <div className="mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { key: 'goals', label: 'Goals', icon: <Target className="w-5 h-5" />, count: goals.length + sampleGoals.length },
            { key: 'benefits', label: 'Benefits', icon: <CreditCard className="w-5 h-5" />, count: benefitPrograms.length },
            { key: 'documents', label: 'Documents', icon: <FileText className="w-5 h-5" />, count: documents.length + sampleDocuments.length },
            { key: 'literacy', label: 'Education', icon: <Calculator className="w-5 h-5" />, count: 0 },
          ].map((tab) => (
            <AccessibleButton
              key={tab.key}
              onClick={() => handleTabChange(tab.key as any)}
              variant={activeTab === tab.key ? 'primary' : 'secondary'}
              size="md"
              ariaLabel={`Switch to ${tab.label} tab`}
              className={`rounded-none border-b-2 ${
                activeTab === tab.key ? 'border-blue-500' : 'border-transparent'
              }`}
              icon={tab.icon}
            >
              {tab.label} {tab.count > 0 && `(${tab.count})`}
            </AccessibleButton>
          ))}
        </div>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'goals' && renderGoals()}
        {activeTab === 'benefits' && renderBenefits()}
        {activeTab === 'documents' && renderDocuments()}
        {activeTab === 'literacy' && renderLiteracy()}
      </div>
    </div>
  );
};