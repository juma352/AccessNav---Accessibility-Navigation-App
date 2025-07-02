import React, { useState } from 'react';
import { Briefcase, GraduationCap, Users, Search, Filter, Star, MapPin, Clock, DollarSign, Plus, BookOpen, Award, Phone, ExternalLink, Calendar, Target, TrendingUp } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { JobListing, LearningModule, MentorProfile } from '../../types';

interface EmploymentHubProps {
  onClose: () => void;
}

export const EmploymentHub: React.FC<EmploymentHubProps> = ({ onClose }) => {
  const { speak } = useAccessibility();
  const [activeTab, setActiveTab] = useState<'jobs' | 'learning' | 'mentorship' | 'resources'>('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [connectedMentors, setConnectedMentors] = useState<string[]>([]);
  const [selectedJobType, setSelectedJobType] = useState<string>('all');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string>('all');

  // Kenya-specific job listings
  const jobListings: JobListing[] = [
    {
      id: '1',
      title: 'Digital Marketing Specialist',
      company: 'Safaricom PLC',
      location: 'Nairobi',
      county: 'Nairobi',
      remote: true,
      accessibilityFeatures: ['Screen reader compatible workspace', 'Flexible hours', 'Ergonomic equipment', 'Accessible parking'],
      accommodationsOffered: ['Assistive technology', 'Modified schedule', 'Remote work options', 'Job coaching'],
      salaryRange: 'KES 80,000 - 120,000',
      description: 'Join Kenya\'s leading telecommunications company to create inclusive digital marketing campaigns that reach all Kenyans. Work with cutting-edge technology while promoting digital inclusion.',
      requirements: ['Diploma/Degree in Marketing/Communications', 'Digital marketing experience', 'English and Swahili fluency', 'Social media expertise'],
      disabilityFriendly: true,
      postedDate: new Date('2025-01-15'),
      contactInfo: 'careers@safaricom.co.ke',
      ncpwdPartner: true,
      languageRequirements: ['English', 'Swahili']
    },
    {
      id: '2',
      title: 'Customer Service Representative',
      company: 'Equity Bank Kenya',
      location: 'Mombasa',
      county: 'Mombasa',
      remote: false,
      accessibilityFeatures: ['Wheelchair accessible', 'Sign language support', 'Audio equipment', 'Accessible restrooms'],
      accommodationsOffered: ['Flexible breaks', 'Modified equipment', 'Job coaching', 'Transport allowance'],
      salaryRange: 'KES 45,000 - 65,000',
      description: 'Provide excellent customer service to our diverse clientele across Kenya. Help customers with banking services while ensuring inclusive service delivery.',
      requirements: ['Certificate in Customer Service', 'Good communication skills', 'Computer literacy', 'Banking knowledge preferred'],
      disabilityFriendly: true,
      postedDate: new Date('2025-01-12'),
      contactInfo: 'hr@equitybank.co.ke',
      ncpwdPartner: true,
      languageRequirements: ['English', 'Swahili', 'Arabic']
    },
    {
      id: '3',
      title: 'Data Entry Specialist',
      company: 'Kenya Bureau of Statistics',
      location: 'Kisumu',
      county: 'Kisumu',
      remote: false,
      accessibilityFeatures: ['Accessible workstation', 'Large print materials', 'Voice recognition software', 'Adjustable desk'],
      accommodationsOffered: ['Flexible schedule', 'Assistive technology', 'Transport allowance', 'Modified duties'],
      salaryRange: 'KES 35,000 - 50,000',
      description: 'Support national data collection efforts for Kenya\'s development planning. Work with census data and statistical analysis to inform government policy.',
      requirements: ['Certificate in Computer Studies', 'Attention to detail', 'Data entry experience', 'Statistical knowledge'],
      disabilityFriendly: true,
      postedDate: new Date('2025-01-10'),
      contactInfo: 'recruitment@knbs.or.ke',
      ncpwdPartner: false,
      languageRequirements: ['English', 'Swahili', 'Luo']
    },
    {
      id: '4',
      title: 'Agricultural Extension Officer',
      company: 'Ministry of Agriculture',
      location: 'Nakuru',
      county: 'Nakuru',
      remote: false,
      accessibilityFeatures: ['Field vehicle modifications', 'Accessible training facilities', 'Communication aids'],
      accommodationsOffered: ['Modified field work', 'Technology support', 'Flexible travel', 'Team support'],
      salaryRange: 'KES 55,000 - 75,000',
      description: 'Support smallholder farmers in Nakuru County with modern agricultural techniques. Promote inclusive farming practices and food security.',
      requirements: ['Diploma in Agriculture', 'Field experience', 'Community engagement skills', 'Local language fluency'],
      disabilityFriendly: true,
      postedDate: new Date('2025-01-08'),
      contactInfo: 'jobs@agriculture.go.ke',
      ncpwdPartner: true,
      languageRequirements: ['English', 'Swahili', 'Kikuyu']
    },
    {
      id: '5',
      title: 'ICT Support Technician',
      company: 'Kenya Power',
      location: 'Eldoret',
      county: 'Uasin Gishu',
      remote: false,
      accessibilityFeatures: ['Accessible workshop', 'Assistive technology', 'Modified tools', 'Accessible transport'],
      accommodationsOffered: ['Equipment modifications', 'Flexible hours', 'Job coaching', 'Safety accommodations'],
      salaryRange: 'KES 60,000 - 85,000',
      description: 'Maintain and support ICT infrastructure for Kenya\'s power distribution network. Ensure reliable technology systems across the region.',
      requirements: ['Certificate in ICT', 'Technical troubleshooting', 'Electrical knowledge', 'Safety certification'],
      disabilityFriendly: true,
      postedDate: new Date('2025-01-05'),
      contactInfo: 'careers@kplc.co.ke',
      ncpwdPartner: true,
      languageRequirements: ['English', 'Swahili', 'Kalenjin']
    }
  ];

  const learningModules: LearningModule[] = [
    {
      id: '1',
      title: 'Digital Literacy for Kenya',
      category: 'digital-literacy',
      difficulty: 'beginner',
      duration: 90,
      description: 'Master essential digital skills including M-Pesa, email, internet safety, and online job applications. Learn to navigate Kenya\'s digital economy.',
      accessibleFormats: ['audio', 'video', 'text', 'interactive'],
      completionRate: 0,
      certification: true,
      language: ['English', 'Swahili'],
      localContext: true
    },
    {
      id: '2',
      title: 'Starting a Business in Kenya',
      category: 'entrepreneurship',
      difficulty: 'intermediate',
      duration: 120,
      description: 'Navigate business registration, licensing, and funding opportunities in Kenya. Learn about SACCOs, microfinance, and government support programs.',
      accessibleFormats: ['audio', 'text', 'interactive'],
      completionRate: 0,
      certification: true,
      language: ['English', 'Swahili'],
      localContext: true
    },
    {
      id: '3',
      title: 'Agricultural Innovation for PWDs',
      category: 'agriculture',
      difficulty: 'intermediate',
      duration: 105,
      description: 'Accessible farming techniques, agribusiness opportunities, and modern agricultural technology adapted for persons with disabilities in Kenya.',
      accessibleFormats: ['video', 'text', 'interactive'],
      completionRate: 0,
      certification: false,
      language: ['English', 'Swahili', 'Kikuyu'],
      localContext: true
    },
    {
      id: '4',
      title: 'Professional Communication Skills',
      category: 'soft-skills',
      difficulty: 'beginner',
      duration: 60,
      description: 'Effective workplace communication in Kenyan professional environments. Learn email etiquette, meeting skills, and presentation techniques.',
      accessibleFormats: ['audio', 'video', 'text'],
      completionRate: 0,
      certification: false,
      language: ['English', 'Swahili'],
      localContext: true
    },
    {
      id: '5',
      title: 'Financial Management & M-Pesa',
      category: 'technical',
      difficulty: 'beginner',
      duration: 75,
      description: 'Master mobile money, banking, and financial planning in Kenya. Learn about SACCOs, investment opportunities, and financial security.',
      accessibleFormats: ['audio', 'video', 'interactive'],
      completionRate: 0,
      certification: true,
      language: ['English', 'Swahili'],
      localContext: true
    },
    {
      id: '6',
      title: 'Leadership & Management',
      category: 'career-development',
      difficulty: 'advanced',
      duration: 150,
      description: 'Develop leadership skills for the Kenyan workplace. Learn team management, project leadership, and inclusive management practices.',
      accessibleFormats: ['video', 'text', 'interactive'],
      completionRate: 0,
      certification: true,
      language: ['English', 'Swahili'],
      localContext: true
    }
  ];

  const mentors: MentorProfile[] = [
    {
      id: '1',
      name: 'Grace Wanjiku',
      profession: 'Software Developer & Tech Entrepreneur',
      expertise: ['Web Development', 'Mobile Apps', 'Accessibility', 'Career Transition', 'Tech Entrepreneurship'],
      disabilities: ['Visual impairment'],
      experience: 8,
      availability: 'Weekends & Evenings',
      mentorshipStyle: 'Hands-on, practical guidance with real-world projects',
      languages: ['English', 'Swahili', 'Kikuyu'],
      rating: 4.9,
      bio: 'Senior software developer at iHub Nairobi and founder of AccessTech Kenya. Passionate about creating accessible technology and helping others enter the tech industry. Specializes in screen reader development and inclusive design.',
      county: 'Nairobi',
      ncpwdMember: true
    },
    {
      id: '2',
      name: 'James Ochieng',
      profession: 'Agribusiness Owner & Cooperative Leader',
      expertise: ['Entrepreneurship', 'Small Business', 'Agriculture', 'Financial Planning', 'Cooperative Management'],
      disabilities: ['Mobility impairment'],
      experience: 12,
      availability: 'Flexible, prefer mornings',
      mentorshipStyle: 'Strategic planning and goal-setting with community focus',
      languages: ['English', 'Swahili', 'Luo'],
      rating: 4.8,
      bio: 'Successful agribusiness owner in Kisumu and chairman of Nyanza Farmers SACCO. Mentor for aspiring entrepreneurs with disabilities. Expert in sustainable farming and cooperative development.',
      county: 'Kisumu',
      ncpwdMember: true
    },
    {
      id: '3',
      name: 'Fatuma Hassan',
      profession: 'Marketing Manager & Disability Advocate',
      expertise: ['Digital Marketing', 'Social Media', 'Brand Management', 'Leadership', 'Advocacy'],
      disabilities: ['Hearing impairment'],
      experience: 10,
      availability: 'Weekday evenings',
      mentorshipStyle: 'Creative problem-solving with advocacy integration',
      languages: ['English', 'Swahili', 'Arabic'],
      rating: 4.7,
      bio: 'Marketing professional in Mombasa and advocate for inclusive workplace practices. Leads diversity initiatives and mentors young professionals with disabilities in marketing and communications.',
      county: 'Mombasa',
      ncpwdMember: true
    },
    {
      id: '4',
      name: 'Peter Kamau',
      profession: 'Financial Advisor & SACCO Manager',
      expertise: ['Financial Planning', 'Investment', 'SACCO Management', 'Microfinance', 'Business Development'],
      disabilities: ['Physical disability'],
      experience: 15,
      availability: 'Weekends',
      mentorshipStyle: 'Data-driven approach with practical financial strategies',
      languages: ['English', 'Swahili', 'Kikuyu'],
      rating: 4.9,
      bio: 'Senior financial advisor and manager of Thika Disability SACCO. Expert in financial inclusion and microfinance for persons with disabilities. Helps individuals and groups achieve financial independence.',
      county: 'Kiambu',
      ncpwdMember: true
    }
  ];

  const jobTypes = [
    { value: 'all', label: 'All Jobs' },
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'government', label: 'Government' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'customer-service', label: 'Customer Service' }
  ];

  const skillLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const handleTabChange = (tab: 'jobs' | 'learning' | 'mentorship' | 'resources') => {
    setActiveTab(tab);
    speak(`Switched to ${tab} section`);
  };

  const handleApplyJob = (jobId: string, jobTitle: string) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      speak(`Application submitted for ${jobTitle}. You will receive a confirmation email shortly.`);
    } else {
      speak(`You have already applied for ${jobTitle}`);
    }
  };

  const handleStartModule = (moduleId: string, moduleTitle: string) => {
    if (!completedModules.includes(moduleId)) {
      speak(`Starting ${moduleTitle}. This module will open in a new window.`);
      // Simulate module completion after 3 seconds
      setTimeout(() => {
        setCompletedModules([...completedModules, moduleId]);
        speak(`Congratulations! You have completed ${moduleTitle}.`);
      }, 3000);
    } else {
      speak(`You have already completed ${moduleTitle}`);
    }
  };

  const handleConnectMentor = (mentorId: string, mentorName: string) => {
    if (!connectedMentors.includes(mentorId)) {
      setConnectedMentors([...connectedMentors, mentorId]);
      speak(`Connection request sent to ${mentorName}. They will contact you within 48 hours.`);
    } else {
      speak(`You are already connected with ${mentorName}`);
    }
  };

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedJobType === 'all' || 
      job.title.toLowerCase().includes(selectedJobType.toLowerCase()) ||
      job.company.toLowerCase().includes(selectedJobType.toLowerCase());
    
    return matchesSearch && matchesType;
  });

  const filteredModules = learningModules.filter(module => {
    const matchesSearch = searchTerm === '' || 
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = selectedSkillLevel === 'all' || module.difficulty === selectedSkillLevel;
    
    return matchesSearch && matchesLevel;
  });

  const renderJobListings = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search jobs by title, company, or location..."
              className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              aria-label="Search job listings"
            />
          </div>
        </div>
        <select
          value={selectedJobType}
          onChange={(e) => setSelectedJobType(e.target.value)}
          className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          aria-label="Filter by job type"
        >
          {jobTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        <AccessibleButton
          onClick={() => speak('Job filters would open here')}
          variant="secondary"
          size="lg"
          ariaLabel="Open advanced job filters"
          icon={<Filter className="w-5 h-5" />}
        >
          Filters
        </AccessibleButton>
      </div>

      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <AccessibleCard key={job.id} className="hover:shadow-xl transition-shadow">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                  <div className="flex items-center gap-4 text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}, {job.county}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salaryRange}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {job.disabilityFriendly && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Disability Friendly
                    </div>
                  )}
                  {job.ncpwdPartner && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      NCPWD Partner
                    </div>
                  )}
                  {job.remote && (
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      Remote Work
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-700">{job.description}</p>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index}>• {req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Accessibility Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.accessibilityFeatures.map((feature, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Accommodations Offered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.accommodationsOffered.map((accommodation, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {accommodation}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Languages Required:</h4>
                  <p className="text-gray-700 text-sm">{job.languageRequirements.join(', ')}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="text-sm text-gray-500">
                  Posted {job.postedDate.toLocaleDateString()}
                </span>
                <div className="flex gap-3">
                  <AccessibleButton
                    onClick={() => speak(`Viewing details for ${job.title} at ${job.company}`)}
                    variant="secondary"
                    size="md"
                    ariaLabel={`View details for ${job.title} position`}
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    View Details
                  </AccessibleButton>
                  <AccessibleButton
                    onClick={() => window.open(`mailto:${job.contactInfo}?subject=Application for ${job.title}`)}
                    variant="secondary"
                    size="md"
                    ariaLabel={`Contact ${job.company} about ${job.title}`}
                    icon={<Phone className="w-4 h-4" />}
                  >
                    Contact
                  </AccessibleButton>
                  <AccessibleButton
                    onClick={() => handleApplyJob(job.id, job.title)}
                    variant={appliedJobs.includes(job.id) ? "success" : "primary"}
                    size="md"
                    disabled={appliedJobs.includes(job.id)}
                    ariaLabel={appliedJobs.includes(job.id) ? `Already applied for ${job.title}` : `Apply for ${job.title} position`}
                  >
                    {appliedJobs.includes(job.id) ? 'Applied ✓' : 'Apply Now'}
                  </AccessibleButton>
                </div>
              </div>
            </div>
          </AccessibleCard>
        ))}
      </div>

      {appliedJobs.length > 0 && (
        <AccessibleCard title="Your Applications" className="bg-green-50 border-green-200">
          <p className="text-green-800 mb-3">
            You have applied to {appliedJobs.length} job{appliedJobs.length > 1 ? 's' : ''}. 
            Employers typically respond within 5-7 business days.
          </p>
          <div className="flex gap-3">
            <AccessibleButton
              onClick={() => speak('Opening application tracking dashboard')}
              variant="primary"
              size="md"
              ariaLabel="Track your job applications"
              icon={<Target className="w-4 h-4" />}
            >
              Track Applications
            </AccessibleButton>
            <AccessibleButton
              onClick={() => speak('Opening interview preparation resources')}
              variant="secondary"
              size="md"
              ariaLabel="Access interview preparation resources"
              icon={<BookOpen className="w-4 h-4" />}
            >
              Interview Prep
            </AccessibleButton>
          </div>
        </AccessibleCard>
      )}
    </div>
  );

  const renderLearningModules = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search learning modules..."
              className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              aria-label="Search learning modules"
            />
          </div>
        </div>
        <select
          value={selectedSkillLevel}
          onChange={(e) => setSelectedSkillLevel(e.target.value)}
          className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          aria-label="Filter by skill level"
        >
          {skillLevels.map(level => (
            <option key={level.value} value={level.value}>{level.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredModules.map((module) => (
          <AccessibleCard key={module.id} className="hover:shadow-xl transition-shadow">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
                <div className="flex items-center gap-2">
                  {completedModules.includes(module.id) && (
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Completed
                    </div>
                  )}
                  {module.certification && (
                    <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Certificate
                    </div>
                  )}
                  {module.localContext && (
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      Kenya Context
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {module.duration} min
                </span>
                <span className="capitalize">{module.difficulty}</span>
                <span className="capitalize">{module.category.replace('-', ' ')}</span>
              </div>

              <p className="text-gray-700">{module.description}</p>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Available Formats:</h4>
                <div className="flex flex-wrap gap-2">
                  {module.accessibleFormats.map((format, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm capitalize">
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Languages:</h4>
                <p className="text-gray-700 text-sm">{module.language.join(', ')}</p>
              </div>

              <AccessibleButton
                onClick={() => handleStartModule(module.id, module.title)}
                variant={completedModules.includes(module.id) ? "success" : "primary"}
                size="md"
                fullWidth
                disabled={completedModules.includes(module.id)}
                ariaLabel={completedModules.includes(module.id) ? `${module.title} completed` : `Start ${module.title} learning module`}
                icon={completedModules.includes(module.id) ? <Award className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
              >
                {completedModules.includes(module.id) ? 'Completed ✓' : 'Start Learning'}
              </AccessibleButton>
            </div>
          </AccessibleCard>
        ))}
      </div>

      {completedModules.length > 0 && (
        <AccessibleCard title="Your Learning Progress" className="bg-blue-50 border-blue-200">
          <div className="space-y-3">
            <p className="text-blue-800">
              Great progress! You've completed {completedModules.length} out of {learningModules.length} modules.
            </p>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(completedModules.length / learningModules.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex gap-3">
              <AccessibleButton
                onClick={() => speak('Opening certificate download page')}
                variant="primary"
                size="md"
                ariaLabel="Download your certificates"
                icon={<Award className="w-4 h-4" />}
              >
                Download Certificates
              </AccessibleButton>
              <AccessibleButton
                onClick={() => speak('Sharing progress on social media')}
                variant="secondary"
                size="md"
                ariaLabel="Share your learning progress"
                icon={<TrendingUp className="w-4 h-4" />}
              >
                Share Progress
              </AccessibleButton>
            </div>
          </div>
        </AccessibleCard>
      )}
    </div>
  );

  const renderMentorship = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mentors.map((mentor) => (
          <AccessibleCard key={mentor.id} className="hover:shadow-xl transition-shadow">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                  <p className="text-gray-600">{mentor.profession}</p>
                  <p className="text-sm text-gray-500">{mentor.county} County</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">{mentor.rating}</span>
                  </div>
                  {mentor.ncpwdMember && (
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      NCPWD Member
                    </div>
                  )}
                  {connectedMentors.includes(mentor.id) && (
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      Connected ✓
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-700 text-sm">{mentor.bio}</p>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Experience:</span>
                    <p>{mentor.experience} years</p>
                  </div>
                  <div>
                    <span className="font-semibold">Availability:</span>
                    <p>{mentor.availability}</p>
                  </div>
                </div>

                <div>
                  <span className="font-semibold">Languages:</span>
                  <p className="text-sm">{mentor.languages.join(', ')}</p>
                </div>

                <div>
                  <span className="font-semibold">Mentorship Style:</span>
                  <p className="text-sm">{mentor.mentorshipStyle}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <AccessibleButton
                  onClick={() => speak(`Viewing ${mentor.name}'s full profile and testimonials`)}
                  variant="secondary"
                  size="md"
                  ariaLabel={`View ${mentor.name}'s full profile`}
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  View Profile
                </AccessibleButton>
                <AccessibleButton
                  onClick={() => handleConnectMentor(mentor.id, mentor.name)}
                  variant={connectedMentors.includes(mentor.id) ? "success" : "primary"}
                  size="md"
                  disabled={connectedMentors.includes(mentor.id)}
                  ariaLabel={connectedMentors.includes(mentor.id) ? `Already connected with ${mentor.name}` : `Connect with mentor ${mentor.name}`}
                >
                  {connectedMentors.includes(mentor.id) ? 'Connected ✓' : 'Connect'}
                </AccessibleButton>
              </div>
            </div>
          </AccessibleCard>
        ))}
      </div>

      {connectedMentors.length > 0 && (
        <AccessibleCard title="Your Mentorship Network" className="bg-purple-50 border-purple-200">
          <div className="space-y-3">
            <p className="text-purple-800">
              You're connected with {connectedMentors.length} mentor{connectedMentors.length > 1 ? 's' : ''}. 
              They will reach out to schedule your first session.
            </p>
            <div className="flex gap-3">
              <AccessibleButton
                onClick={() => speak('Opening mentorship dashboard')}
                variant="primary"
                size="md"
                ariaLabel="Manage your mentorship connections"
                icon={<Users className="w-4 h-4" />}
              >
                Manage Connections
              </AccessibleButton>
              <AccessibleButton
                onClick={() => speak('Scheduling mentorship session')}
                variant="secondary"
                size="md"
                ariaLabel="Schedule mentorship session"
                icon={<Calendar className="w-4 h-4" />}
              >
                Schedule Session
              </AccessibleButton>
            </div>
          </div>
        </AccessibleCard>
      )}

      <AccessibleCard title="Become a Mentor" className="bg-green-50 border-green-200">
        <div className="space-y-3">
          <p className="text-green-800">
            Share your experience and help other persons with disabilities in Kenya achieve their career goals.
          </p>
          <AccessibleButton
            onClick={() => speak('Opening mentor application form')}
            variant="primary"
            size="md"
            ariaLabel="Apply to become a mentor"
            icon={<Plus className="w-4 h-4" />}
          >
            Apply to be a Mentor
          </AccessibleButton>
        </div>
      </AccessibleCard>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <AccessibleCard title="Employment Resources for Kenya">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Government Programs</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• NCPWD Employment Support Program</li>
                <li>• Youth Enterprise Development Fund</li>
                <li>• Women Enterprise Fund</li>
                <li>• Uwezo Fund for Youth & Women</li>
                <li>• County Government Employment Programs</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Private Sector Partners</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Safaricom Foundation</li>
                <li>• Equity Bank Inclusive Employment</li>
                <li>• KCB Foundation Programs</li>
                <li>• Cooperative Bank CSR</li>
                <li>• Kenya Airways Diversity Program</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Skills Development</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Kenya Institute of Special Education</li>
                <li>• Technical and Vocational Education</li>
                <li>• Digital Skills Training Centers</li>
                <li>• Agricultural Training Institutes</li>
                <li>• Entrepreneurship Incubators</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Support Organizations</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Kenya Association of the Intellectually Handicapped</li>
                <li>• Kenya Union of the Blind</li>
                <li>• Kenya National Association of the Deaf</li>
                <li>• Association for the Physically Disabled</li>
                <li>• Local Disabled Persons Organizations</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Quick Links</h4>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <AccessibleButton
                onClick={() => speak('Opening NCPWD employment portal')}
                variant="secondary"
                size="md"
                fullWidth
                ariaLabel="Access NCPWD employment portal"
                icon={<ExternalLink className="w-4 h-4" />}
              >
                NCPWD Employment Portal
              </AccessibleButton>
              <AccessibleButton
                onClick={() => speak('Opening government job portal')}
                variant="secondary"
                size="md"
                fullWidth
                ariaLabel="Access government job portal"
                icon={<ExternalLink className="w-4 h-4" />}
              >
                Government Jobs Portal
              </AccessibleButton>
              <AccessibleButton
                onClick={() => speak('Opening skills assessment tool')}
                variant="secondary"
                size="md"
                fullWidth
                ariaLabel="Take skills assessment"
                icon={<Target className="w-4 h-4" />}
              >
                Skills Assessment
              </AccessibleButton>
              <AccessibleButton
                onClick={() => speak('Opening career guidance resources')}
                variant="secondary"
                size="md"
                fullWidth
                ariaLabel="Access career guidance"
                icon={<BookOpen className="w-4 h-4" />}
              >
                Career Guidance
              </AccessibleButton>
            </div>
          </div>
        </div>
      </AccessibleCard>

      <AccessibleCard title="Success Stories from Kenya">
        <div className="space-y-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900">Mary Akinyi - Software Developer</h4>
            <p className="text-gray-600 text-sm mb-2">
              "Through AccessNav's mentorship program, I connected with Grace Wanjiku who helped me transition from customer service to software development. Now I work remotely for a tech company in Nairobi."
            </p>
            <span className="text-xs text-green-600">Visual impairment • Kisumu</span>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900">David Mwangi - Agricultural Entrepreneur</h4>
            <p className="text-gray-600 text-sm mb-2">
              "The agricultural training module and mentorship from James Ochieng helped me start my own accessible farming business. I now employ 5 other persons with disabilities."
            </p>
            <span className="text-xs text-blue-600">Physical disability • Nakuru</span>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-900">Sarah Wanjala - Bank Manager</h4>
            <p className="text-gray-600 text-sm mb-2">
              "The financial management course and professional communication training gave me the confidence to apply for management positions. I'm now a branch manager at Equity Bank."
            </p>
            <span className="text-xs text-purple-600">Hearing impairment • Eldoret</span>
          </div>
        </div>
      </AccessibleCard>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Employment & Skills Hub</h2>
          <p className="text-gray-600">Empowering careers and building skills across Kenya</p>
        </div>
        <AccessibleButton
          onClick={onClose}
          variant="secondary"
          size="md"
          ariaLabel="Close employment hub"
        >
          Close
        </AccessibleButton>
      </div>

      <div className="mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { key: 'jobs', label: 'Job Listings', icon: <Briefcase className="w-5 h-5" />, count: filteredJobs.length },
            { key: 'learning', label: 'Learning', icon: <GraduationCap className="w-5 h-5" />, count: filteredModules.length },
            { key: 'mentorship', label: 'Mentorship', icon: <Users className="w-5 h-5" />, count: mentors.length },
            { key: 'resources', label: 'Resources', icon: <BookOpen className="w-5 h-5" />, count: 0 },
          ].map((tab) => (
            <AccessibleButton
              key={tab.key}
              onClick={() => handleTabChange(tab.key as any)}
              variant={activeTab === tab.key ? 'primary' : 'secondary'}
              size="md"
              ariaLabel={`Switch to ${tab.label} tab${tab.count > 0 ? ` with ${tab.count} items` : ''}`}
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
        {activeTab === 'jobs' && renderJobListings()}
        {activeTab === 'learning' && renderLearningModules()}
        {activeTab === 'mentorship' && renderMentorship()}
        {activeTab === 'resources' && renderResources()}
      </div>
    </div>
  );
};