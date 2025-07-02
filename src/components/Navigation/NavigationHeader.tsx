import React, { useState, useEffect, useRef } from 'react';
import { Menu, Volume2, VolumeX, Settings, User, LogOut, X, Home, Navigation, MapPin, Users, AlertTriangle, Phone, Map, Briefcase, Heart, Scale, DollarSign, Smartphone, Building, BookOpen } from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useAuth } from '../../contexts/AuthContext';
import { AccessibleButton } from '../common/AccessibleButton';

interface NavigationHeaderProps {
  onMenuToggle: () => void;
  onProfileClick: () => void;
  onSettingsClick: () => void;
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  onMenuToggle,
  onProfileClick,
  onSettingsClick,
  currentView,
  onNavigate,
}) => {
  const { isVoiceEnabled, toggleVoice, speak } = useAccessibility();
  const { user, isAuthenticated, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  const handleVoiceToggle = () => {
    toggleVoice();
    speak(isVoiceEnabled ? 'Voice guidance disabled' : 'Voice guidance enabled');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    speak('You have been logged out of AccessNav Kenya');
  };

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
    speak(showMobileMenu ? 'Navigation menu closed' : 'Navigation menu opened');
  };

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
    speak(showUserMenu ? 'User menu closed' : 'User menu opened');
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current && 
        !userMenuRef.current.contains(event.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showUserMenu]);

  // Close menus on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowUserMenu(false);
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const navigationItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" />, requireAuth: true },
    { key: 'navigation', label: 'Navigation', icon: <Navigation className="w-5 h-5" />, requireAuth: true },
    { key: 'nearby', label: 'Find Nearby', icon: <MapPin className="w-5 h-5" />, requireAuth: true },
    { key: 'community', label: 'Community', icon: <Users className="w-5 h-5" />, requireAuth: true },
    { key: 'report', label: 'Report Issue', icon: <AlertTriangle className="w-5 h-5" />, requireAuth: true },
    { key: 'employment', label: 'Employment Hub', icon: <Briefcase className="w-5 h-5" />, requireAuth: true },
    { key: 'health', label: 'Health & Wellness', icon: <Heart className="w-5 h-5" />, requireAuth: true },
    { key: 'rights', label: 'Rights & Advocacy', icon: <Scale className="w-5 h-5" />, requireAuth: true },
    { key: 'financial', label: 'Financial Tools', icon: <DollarSign className="w-5 h-5" />, requireAuth: true },
    { key: 'smarthome', label: 'Smart Home', icon: <Smartphone className="w-5 h-5" />, requireAuth: true },
    { key: 'resources', label: 'Local Resources', icon: <Building className="w-5 h-5" />, requireAuth: true },
    { key: 'pwdact', label: 'PWD Act 2025', icon: <BookOpen className="w-5 h-5" />, requireAuth: true },
    { key: 'emergency', label: 'Emergency', icon: <Phone className="w-5 h-5" />, requireAuth: false },
    { key: 'offline', label: 'Offline Maps', icon: <Map className="w-5 h-5" />, requireAuth: true },
  ];

  return (
    <>
      <header className="bg-white shadow-lg border-b-2 border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and hamburger */}
            <div className="flex items-center gap-4">
              <AccessibleButton
                onClick={handleMobileMenuToggle}
                ariaLabel="Open navigation menu"
                variant="secondary"
                size="md"
                icon={<Menu className="w-6 h-6" />}
                className="lg:hidden"
              >
                <span className="sr-only">Menu</span>
              </AccessibleButton>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 via-black to-red-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">AccessNav Kenya</h1>
                  <p className="text-xs text-gray-600">Navigate with confidence</p>
                </div>
              </div>
            </div>

            {/* Center - Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.slice(0, 6).map((item) => (
                <AccessibleButton
                  key={item.key}
                  onClick={() => onNavigate?.(item.key)}
                  variant={currentView === item.key ? 'primary' : 'secondary'}
                  size="sm"
                  ariaLabel={`Navigate to ${item.label}${item.requireAuth && !isAuthenticated ? ' (requires sign in)' : ''}`}
                  className={`${item.requireAuth && !isAuthenticated ? 'opacity-50' : ''}`}
                  disabled={item.requireAuth && !isAuthenticated}
                >
                  {item.label}
                </AccessibleButton>
              ))}
            </nav>

            {/* Right side - Controls and user menu */}
            <div className="flex items-center gap-2">
              <AccessibleButton
                onClick={handleVoiceToggle}
                ariaLabel={isVoiceEnabled ? "Disable voice guidance" : "Enable voice guidance"}
                variant={isVoiceEnabled ? "primary" : "secondary"}
                size="md"
                icon={isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                className="hidden sm:flex"
              >
                <span className="sr-only">
                  {isVoiceEnabled ? "Voice On" : "Voice Off"}
                </span>
              </AccessibleButton>

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    ref={userButtonRef}
                    onClick={handleUserMenuToggle}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    aria-label="Open user menu"
                    aria-expanded={showUserMenu}
                    aria-haspopup="true"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </div>
                    <span className="hidden md:block text-sm font-medium">
                      {user?.name?.split(' ')[0] || 'User'}
                    </span>
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div 
                      ref={userMenuRef}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-600">{user?.email}</p>
                        <p className="text-xs text-gray-500">{user?.county} County</p>
                      </div>
                      
                      <div className="py-1">
                        <button
                          onClick={() => {
                            onProfileClick();
                            setShowUserMenu(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100"
                          role="menuitem"
                        >
                          <User className="w-4 h-4" />
                          Profile Management
                        </button>
                        
                        <button
                          onClick={() => {
                            onSettingsClick();
                            setShowUserMenu(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100"
                          role="menuitem"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                        
                        <button
                          onClick={handleVoiceToggle}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors sm:hidden focus:outline-none focus:bg-gray-100"
                          role="menuitem"
                        >
                          {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                          {isVoiceEnabled ? 'Disable Voice' : 'Enable Voice'}
                        </button>
                      </div>
                      
                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:bg-red-50"
                          role="menuitem"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <AccessibleButton
                  onClick={() => speak('Please sign in to access all features')}
                  variant="primary"
                  size="md"
                  ariaLabel="Sign in to AccessNav Kenya"
                  className="hidden sm:flex"
                >
                  Sign In
                </AccessibleButton>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          onClick={() => setShowMobileMenu(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="bg-white w-80 h-full overflow-y-auto shadow-xl">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-green-600 via-black to-red-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">AccessNav Kenya</h3>
                  {isAuthenticated && user && (
                    <p className="text-sm text-green-200">Welcome, {user.name.split(' ')[0]}</p>
                  )}
                </div>
              </div>
              <AccessibleButton
                onClick={() => setShowMobileMenu(false)}
                variant="secondary"
                size="sm"
                ariaLabel="Close navigation menu"
                icon={<X className="w-5 h-5" />}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-white border-opacity-30"
              >
                <span className="sr-only">Close</span>
              </AccessibleButton>
            </div>

            {/* User Info Section */}
            {isAuthenticated && user && (
              <div className="p-4 bg-blue-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.county} County</p>
                    {user.ncpwdRegistered && (
                      <p className="text-xs text-green-600 font-medium">NCPWD Registered</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Items */}
            <nav className="p-4" role="navigation">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      if (item.requireAuth && !isAuthenticated) {
                        speak('Please sign in to access this feature');
                      } else {
                        onNavigate?.(item.key);
                        setShowMobileMenu(false);
                      }
                    }}
                    className={`flex items-center gap-3 w-full p-3 text-left rounded-lg transition-colors ${
                      currentView === item.key 
                        ? 'bg-blue-100 text-blue-900 font-medium' 
                        : item.requireAuth && !isAuthenticated
                        ? 'text-gray-400 hover:bg-gray-50'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    disabled={item.requireAuth && !isAuthenticated}
                    aria-label={`Navigate to ${item.label}${item.requireAuth && !isAuthenticated ? ' (requires sign in)' : ''}`}
                  >
                    <div className={`${item.requireAuth && !isAuthenticated ? 'text-gray-400' : currentView === item.key ? 'text-blue-600' : 'text-gray-500'}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <span>{item.label}</span>
                      {item.requireAuth && !isAuthenticated && (
                        <span className="block text-xs text-gray-400">Sign in required</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Mobile Menu Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                {!isAuthenticated ? (
                  <AccessibleButton
                    onClick={() => {
                      speak('Opening sign in');
                      setShowMobileMenu(false);
                    }}
                    variant="primary"
                    size="lg"
                    fullWidth
                    ariaLabel="Sign in to AccessNav Kenya"
                  >
                    Sign In / Register
                  </AccessibleButton>
                ) : (
                  <>
                    <AccessibleButton
                      onClick={() => {
                        onProfileClick();
                        setShowMobileMenu(false);
                      }}
                      variant="secondary"
                      size="md"
                      fullWidth
                      ariaLabel="Open profile management"
                      icon={<User className="w-4 h-4" />}
                    >
                      Profile Management
                    </AccessibleButton>
                    
                    <AccessibleButton
                      onClick={() => {
                        onSettingsClick();
                        setShowMobileMenu(false);
                      }}
                      variant="secondary"
                      size="md"
                      fullWidth
                      ariaLabel="Open settings"
                      icon={<Settings className="w-4 h-4" />}
                    >
                      Settings
                    </AccessibleButton>
                    
                    <AccessibleButton
                      onClick={handleVoiceToggle}
                      variant={isVoiceEnabled ? 'primary' : 'secondary'}
                      size="md"
                      fullWidth
                      ariaLabel={isVoiceEnabled ? 'Disable voice guidance' : 'Enable voice guidance'}
                      icon={isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    >
                      {isVoiceEnabled ? 'Voice On' : 'Voice Off'}
                    </AccessibleButton>
                    
                    <AccessibleButton
                      onClick={() => {
                        handleLogout();
                        setShowMobileMenu(false);
                      }}
                      variant="danger"
                      size="md"
                      fullWidth
                      ariaLabel="Sign out of AccessNav Kenya"
                      icon={<LogOut className="w-4 h-4" />}
                    >
                      Sign Out
                    </AccessibleButton>
                  </>
                )}
              </div>

              {/* Emergency Access */}
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-900 mb-2">Emergency Access</h4>
                <p className="text-sm text-red-800 mb-3">
                  Emergency services are always available, even without signing in.
                </p>
                <AccessibleButton
                  onClick={() => {
                    onNavigate?.('emergency');
                    setShowMobileMenu(false);
                  }}
                  variant="danger"
                  size="sm"
                  fullWidth
                  ariaLabel="Access emergency services"
                  icon={<Phone className="w-4 h-4" />}
                >
                  Emergency Services
                </AccessibleButton>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};