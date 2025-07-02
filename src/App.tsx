import React, { useState, useEffect } from 'react';
import { NavigationHeader } from './components/Navigation/NavigationHeader';
import { Breadcrumbs, BreadcrumbItem } from './components/common/Breadcrumbs';
import { QuickActions } from './components/Dashboard/QuickActions';
import { CommunityReporting } from './components/Community/CommunityReporting';
import { NavigationInterface } from './components/Navigation/NavigationInterface';
import { NearbyPlaces } from './components/Nearby/NearbyPlaces';
import { EmergencyServices } from './components/Emergency/EmergencyServices';
import { EmploymentHub } from './components/Employment/EmploymentHub';
import { HealthWellness } from './components/Health/HealthWellness';
import { RightsAdvocacy } from './components/Rights/RightsAdvocacy';
import { FinancialTools } from './components/Financial/FinancialTools';
import { SmartHomeHub } from './components/SmartHome/SmartHomeHub';
import { LocalResources } from './components/Resources/LocalResources';
import { AuthModal } from './components/Auth/AuthModal';
import { WelcomePage } from './components/Welcome/WelcomePage';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { ProfileManagement } from './components/Profile/ProfileManagement';
import { SettingsPage } from './components/Settings/SettingsPage';
import { CommunityHub } from './components/Community/CommunityHub.tsx';
import { OfflineMaps } from './components/Offline/OfflineMaps';
import { PWDActEducation } from './components/Education/PWDActEducation';
import { AccessibilityProvider, useAccessibility } from './contexts/AccessibilityContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AccessibilityProfile, CommunityReport } from './types';

type AppView = 'welcome' | 'dashboard' | 'navigation' | 'nearby' | 'community' | 'report' | 'emergency' | 'offline' | 'profile' | 'settings' | 'employment' | 'health' | 'rights' | 'financial' | 'smarthome' | 'resources' | 'pwdact';

function AppContent() {
  const [currentView, setCurrentView] = useState<AppView>('welcome');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { profile, speak } = useAccessibility();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    // Simulate app initialization
    const initializeApp = async () => {
      // If user is authenticated, go to dashboard
      if (isAuthenticated) {
        setCurrentView('dashboard');
      } else {
        // Show welcome page for unauthenticated users
        setCurrentView('welcome');
      }
      setIsLoading(false);
    };

    initializeApp();
  }, [isAuthenticated]);

  useEffect(() => {
    // Set focus to main content when view changes (but not on initial load)
    if (!isLoading && currentView !== 'welcome') {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus();
        // Announce the page change to screen readers
        const pageTitle = getPageTitle(currentView);
        speak(`Navigated to ${pageTitle}`);
      }
    }
  }, [currentView, isLoading, speak]);

  const getPageTitle = (view: AppView): string => {
    const titles: Record<AppView, string> = {
      welcome: 'Welcome',
      dashboard: 'Dashboard',
      navigation: 'Navigation',
      nearby: 'Nearby Places',
      community: 'Community',
      report: 'Report Issue',
      emergency: 'Emergency Services',
      offline: 'Offline Maps',
      profile: 'Profile',
      settings: 'Settings',
      employment: 'Employment and Skills Hub',
      health: 'Health and Wellness',
      rights: 'Rights and Advocacy',
      financial: 'Financial Tools',
      smarthome: 'Smart Home',
      resources: 'Local Resources',
      pwdact: 'PWD Act Education'
    };
    return titles[view];
  };

  const handleNavigate = (view: string) => {
    const targetView = view as AppView;
    
    // Check if authentication is required for this view
    const authRequiredViews: AppView[] = ['navigation', 'nearby', 'community', 'report', 'offline', 'profile', 'settings', 'employment', 'health', 'rights', 'financial', 'smarthome', 'resources', 'pwdact'];
    
    if (authRequiredViews.includes(targetView) && !isAuthenticated) {
      setShowAuthModal(true);
      speak('Please sign in to access this feature');
      return;
    }
    
    setCurrentView(targetView);
  };

  const handleNavigateClick = () => {
    if (isAuthenticated) {
      setCurrentView('navigation');
    } else {
      setShowAuthModal(true);
      speak('Please sign in to access navigation features');
    }
  };

  const handleFindNearbyClick = () => {
    if (isAuthenticated) {
      setCurrentView('nearby');
    } else {
      setShowAuthModal(true);
      speak('Please sign in to find nearby accessible places');
    }
  };

  const handleCommunityClick = () => {
    if (isAuthenticated) {
      setCurrentView('community');
    } else {
      setShowAuthModal(true);
      speak('Please sign in to access community features');
    }
  };

  const handleReportClick = () => {
    if (isAuthenticated) {
      setCurrentView('report');
    } else {
      setShowAuthModal(true);
      speak('Please sign in to report accessibility issues');
    }
  };

  const handleEmergencyClick = () => {
    setCurrentView('emergency'); // Emergency services available to all users
  };

  const handleOfflineClick = () => {
    if (isAuthenticated) {
      setCurrentView('offline');
    } else {
      setShowAuthModal(true);
      speak('Please sign in to access offline maps');
    }
  };

  const handlePWDActClick = () => {
    if (isAuthenticated) {
      setCurrentView('pwdact');
    } else {
      setShowAuthModal(true);
      speak('Please sign in to access PWD Act education');
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setCurrentView('profile');
    } else {
      setShowAuthModal(true);
    }
  };

  const handleSettingsClick = () => {
    if (isAuthenticated) {
      setCurrentView('settings');
    } else {
      setShowAuthModal(true);
    }
  };

  const handleEmploymentClick = () => {
    if (isAuthenticated) {
      setCurrentView('employment');
    } else {
      setShowAuthModal(true);
      speak('Please sign in to access employment and skills resources');
    }
  };

  const handleHealthClick = () => {
    if (isAuthenticated) {
      setCurrentView('health');
    } else {
      setShowAuthModal(true);
      speak('Please sign in to access health and wellness features');
    }
  };

  const handleRightsClick = () => {
    if (isAuthenticated) {
      setCurrentView('rights');
    } else {
      setShowAuthModal(true);
      speak('Please sign in to access rights and advocacy resources');
    }
  };

  const handleFinancialClick = () => {
    if (isAuthenticated) {
      setCurrentView('financial');
    } else {
      setShowAuthModal(true);
      speak('Please sign in to access financial tools and literacy');
    }
  };

  const handleSmartHomeClick = () => {
    if (isAuthenticated) {
      setCurrentView('smarthome');
    } else {
      setShowAuthModal(true);
      speak('Please sign in to access smart home integration');
    }
  };

  const handleResourcesClick = () => {
    if (isAuthenticated) {
      setCurrentView('resources');
    } else {
      setShowAuthModal(true);
      speak('Please sign in to access local resources');
    }
  };

  const handleSubmitReport = async (report: Omit<CommunityReport, 'id' | 'reportedAt' | 'upvotes' | 'downvotes'>) => {
    // In a real app, this would submit to a backend service
    console.log('Submitting report:', report);
    setCurrentView('dashboard');
  };

  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  const handleLearnMore = () => {
    // Scroll to features section or show more info
    speak('Learn more about AccessNav Kenya features');
  };

  // Generate breadcrumbs based on current view
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: 'Home',
        onClick: () => setCurrentView(isAuthenticated ? 'dashboard' : 'welcome')
      }
    ];

    const viewLabels: Record<AppView, string> = {
      welcome: 'Welcome',
      dashboard: 'Dashboard',
      navigation: 'Navigation',
      nearby: 'Nearby Places',
      community: 'Community',
      report: 'Report Issue',
      emergency: 'Emergency Services',
      offline: 'Offline Maps',
      profile: 'Profile',
      settings: 'Settings',
      employment: 'Employment & Skills',
      health: 'Health & Wellness',
      rights: 'Rights & Advocacy',
      financial: 'Financial Tools',
      smarthome: 'Smart Home',
      resources: 'Local Resources',
      pwdact: 'PWD Act Education'
    };

    if (currentView !== 'dashboard' && currentView !== 'welcome') {
      breadcrumbs.push({
        label: viewLabels[currentView],
        current: true
      });
    }

    return breadcrumbs;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading AccessNav Kenya</h2>
          <p className="text-gray-600">Preparing your accessible navigation experience...</p>
        </div>
      </div>
    );
  }

  const renderMainContent = () => {
    switch (currentView) {
      case 'welcome':
        return (
          <WelcomePage
            onGetStarted={handleGetStarted}
            onLearnMore={handleLearnMore}
            onEmergencyAccess={handleEmergencyClick}
          />
        );

      case 'dashboard':
        return (
          <div className="space-y-8">
            <QuickActions
              onNavigateClick={handleNavigateClick}
              onFindNearbyClick={handleFindNearbyClick}
              onCommunityClick={handleCommunityClick}
              onReportClick={handleReportClick}
              onEmergencyClick={handleEmergencyClick}
              onOfflineClick={handleOfflineClick}
            />
            
            {/* Welcome message with user info */}
            <div className="p-6 bg-gradient-to-r from-green-600 via-black to-red-600 text-white rounded-xl">
              <h2 className="text-2xl font-bold mb-2">
                Karibu AccessNav Kenya! 🇰🇪 
                {isAuthenticated && user && (
                  <span className="block text-lg font-normal mt-1">
                    Welcome back, {user.name}!
                  </span>
                )}
              </h2>
              <p className="text-green-100">
                {isAuthenticated 
                  ? `Empowering persons with disabilities across all 47 counties of Kenya. Navigate with confidence from ${user?.county || 'your location'} to anywhere in Kenya.`
                  : 'Empowering persons with disabilities across all 47 counties of Kenya. Navigate with confidence from Nairobi to Mombasa, Kisumu to Eldoret.'
                }
              </p>
            </div>
            
            {/* Life Empowerment Tools */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Life Empowerment Tools for Kenya</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  onClick={handleEmploymentClick}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-200 smooth-transition"
                  role="button"
                  tabIndex={0}
                  aria-label="Open Kenya employment and skills hub"
                  onKeyDown={(e) => e.key === 'Enter' && handleEmploymentClick()}
                >
                  <h3 className="text-xl font-bold mb-2">Employment & Skills</h3>
                  <p className="text-blue-100 mb-4">Find inclusive jobs in Kenya, learn new skills, connect with mentors</p>
                  <div className="text-sm text-blue-200">
                    NCPWD partners • Digital skills • Entrepreneurship
                  </div>
                </div>

                <div 
                  onClick={handleHealthClick}
                  className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-200 smooth-transition"
                  role="button"
                  tabIndex={0}
                  aria-label="Open Kenya health and wellness center"
                  onKeyDown={(e) => e.key === 'Enter' && handleHealthClick()}
                >
                  <h3 className="text-xl font-bold mb-2">Health & Wellness</h3>
                  <p className="text-green-100 mb-4">NHIF providers, medication tracking, telehealth access</p>
                  <div className="text-sm text-green-200">
                    Government hospitals • NHIF • Community health
                  </div>
                </div>

                <div 
                  onClick={handleRightsClick}
                  className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-200 smooth-transition"
                  role="button"
                  tabIndex={0}
                  aria-label="Open Kenya rights and advocacy center"
                  onKeyDown={(e) => e.key === 'Enter' && handleRightsClick()}
                >
                  <h3 className="text-xl font-bold mb-2">Rights & Advocacy</h3>
                  <p className="text-purple-100 mb-4">Know your rights under Kenya's Constitution and laws</p>
                  <div className="text-sm text-purple-200">
                    Legal aid • DPOs • County participation
                  </div>
                </div>

                <div 
                  onClick={handleFinancialClick}
                  className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-200 smooth-transition"
                  role="button"
                  tabIndex={0}
                  aria-label="Open Kenya financial tools and literacy"
                  onKeyDown={(e) => e.key === 'Enter' && handleFinancialClick()}
                >
                  <h3 className="text-xl font-bold mb-2">Financial Tools</h3>
                  <p className="text-orange-100 mb-4">M-Pesa integration, SACCO savings, government benefits</p>
                  <div className="text-sm text-orange-200">
                    Mobile money • SACCOs • Government programs
                  </div>
                </div>

                <div 
                  onClick={handleSmartHomeClick}
                  className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-200 smooth-transition"
                  role="button"
                  tabIndex={0}
                  aria-label="Open smart home integration"
                  onKeyDown={(e) => e.key === 'Enter' && handleSmartHomeClick()}
                >
                  <h3 className="text-xl font-bold mb-2">Smart Home</h3>
                  <p className="text-teal-100 mb-4">Solar-powered solutions, accessible technology for Kenya</p>
                  <div className="text-sm text-teal-200">
                    Solar systems • Local devices • Affordable tech
                  </div>
                </div>

                <div 
                  onClick={handlePWDActClick}
                  className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-200 smooth-transition"
                  role="button"
                  tabIndex={0}
                  aria-label="Learn about the PWD Act 2025"
                  onKeyDown={(e) => e.key === 'Enter' && handlePWDActClick()}
                >
                  <h3 className="text-xl font-bold mb-2">PWD Act 2025</h3>
                  <p className="text-red-100 mb-4">Learn about your rights under the new PWD Act 2025</p>
                  <div className="text-sm text-red-200">
                    Legal rights • Benefits • Accessibility standards
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'navigation':
        return (
          <ProtectedRoute>
            <NavigationInterface onClose={() => setCurrentView('dashboard')} />
          </ProtectedRoute>
        );

      case 'nearby':
        return (
          <ProtectedRoute>
            <NearbyPlaces onClose={() => setCurrentView('dashboard')} />
          </ProtectedRoute>
        );

      case 'emergency':
        return <EmergencyServices onClose={() => setCurrentView(isAuthenticated ? 'dashboard' : 'welcome')} />;

      case 'employment':
        return (
          <ProtectedRoute>
            <EmploymentHub onClose={() => setCurrentView('dashboard')} />
          </ProtectedRoute>
        );

      case 'health':
        return (
          <ProtectedRoute>
            <HealthWellness onClose={() => setCurrentView('dashboard')} />
          </ProtectedRoute>
        );

      case 'rights':
        return (
          <ProtectedRoute>
            <RightsAdvocacy onClose={() => setCurrentView('dashboard')} />
          </ProtectedRoute>
        );

      case 'financial':
        return (
          <ProtectedRoute>
            <FinancialTools onClose={() => setCurrentView('dashboard')} />
          </ProtectedRoute>
        );

      case 'smarthome':
        return (
          <ProtectedRoute>
            <SmartHomeHub onClose={() => setCurrentView('dashboard')} />
          </ProtectedRoute>
        );

      case 'resources':
        return (
          <ProtectedRoute>
            <LocalResources onClose={() => setCurrentView('dashboard')} />
          </ProtectedRoute>
        );

      case 'pwdact':
        return (
          <ProtectedRoute>
            <PWDActEducation onClose={() => setCurrentView('dashboard')} />
          </ProtectedRoute>
        );

      case 'report':
        return (
          <ProtectedRoute>
            <CommunityReporting
              onSubmitReport={handleSubmitReport}
              onClose={() => setCurrentView('dashboard')}
            />
          </ProtectedRoute>
        );

      case 'community':
        return (
          <ProtectedRoute>
            <CommunityHub onClose={() => setCurrentView('dashboard')} />
          </ProtectedRoute>
        );

      case 'offline':
        return (
          <ProtectedRoute>
            <OfflineMaps onClose={() => setCurrentView('dashboard')} />
          </ProtectedRoute>
        );

      case 'profile':
        return (
          <ProtectedRoute>
            <ProfileManagement onClose={() => setCurrentView('dashboard')} />
          </ProtectedRoute>
        );

      case 'settings':
        return (
          <ProtectedRoute>
            <SettingsPage onClose={() => setCurrentView('dashboard')} />
          </ProtectedRoute>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView !== 'welcome' && (
        <NavigationHeader
          onMenuToggle={() => {}} // Not used anymore, handled internally
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          currentView={currentView}
          onNavigate={handleNavigate}
        />
      )}
      
      {/* Breadcrumbs */}
      {currentView !== 'dashboard' && currentView !== 'welcome' && (
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs items={getBreadcrumbs()} />
          </div>
        </div>
      )}
      
      <main id="main-content" className="pb-6" tabIndex={-1}>
        {renderMainContent()}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          setCurrentView('dashboard');
        }}
      />
    </div>
  );
}

function App() {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </AccessibilityProvider>
  );
}

export default App;