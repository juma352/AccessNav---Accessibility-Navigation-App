import React from 'react';
import { ArrowRight, Shield, Users, MapPin, Heart, Smartphone, Globe, Star, CheckCircle } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface WelcomePageProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
  onEmergencyAccess: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({
  onGetStarted,
  onLearnMore,
  onEmergencyAccess,
}) => {
  const { speak } = useAccessibility();

  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      title: 'Real-time Navigation',
      description: 'Get accessible directions with live traffic updates and barrier alerts across all 47 counties of Kenya.',
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Community Powered',
      description: 'Join thousands of users sharing accessibility information to help each other navigate Kenya confidently.',
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: 'Health & Wellness',
      description: 'Find NHIF-accredited providers, track medications, and access telehealth services across Kenya.',
    },
    {
      icon: <Smartphone className="w-8 h-8 text-purple-600" />,
      title: 'Mobile Money Integration',
      description: 'Seamlessly integrate with M-Pesa, manage SACCO savings, and access government benefit programs.',
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-600" />,
      title: 'Rights & Advocacy',
      description: 'Know your rights under Kenya\'s Constitution and connect with legal aid and advocacy organizations.',
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-600" />,
      title: 'Multi-language Support',
      description: 'Available in English, Swahili, and major local languages to serve all Kenyans.',
    },
  ];

  const testimonials = [
    {
      name: 'Grace Wanjiku',
      location: 'Nairobi',
      quote: 'AccessNav has transformed how I navigate the city. The real-time accessibility updates help me plan my routes with confidence.',
      disability: 'Wheelchair user',
    },
    {
      name: 'James Ochieng',
      location: 'Kisumu',
      quote: 'The employment hub connected me with inclusive employers. I found my current job through AccessNav\'s partner network.',
      disability: 'Visual impairment',
    },
    {
      name: 'Fatuma Hassan',
      location: 'Mombasa',
      quote: 'Being able to find NHIF providers and accessible health facilities has made managing my health so much easier.',
      disability: 'Hearing impairment',
    },
  ];

  const stats = [
    { number: '47', label: 'Counties Covered', description: 'Complete coverage across Kenya' },
    { number: '10,000+', label: 'Accessible Locations', description: 'Verified by our community' },
    { number: '5,000+', label: 'Active Users', description: 'Growing community of PWDs' },
    { number: '24/7', label: 'Emergency Support', description: 'Always available when needed' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-black/5 to-red-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 via-black to-red-600 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Karibu AccessNav
              <span className="block text-3xl lg:text-5xl bg-gradient-to-r from-green-600 via-black to-red-600 bg-clip-text text-transparent">
                Kenya 🇰🇪
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Empowering persons with disabilities across all 47 counties of Kenya to navigate 
              with confidence, access opportunities, and live independently.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <AccessibleButton
                onClick={onGetStarted}
                variant="primary"
                size="xl"
                ariaLabel="Get started with AccessNav Kenya"
                icon={<ArrowRight className="w-6 h-6" />}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Get Started Free
              </AccessibleButton>
              
              <AccessibleButton
                onClick={onLearnMore}
                variant="secondary"
                size="xl"
                ariaLabel="Learn more about AccessNav Kenya features"
              >
                Learn More
              </AccessibleButton>
              
              <AccessibleButton
                onClick={onEmergencyAccess}
                variant="danger"
                size="lg"
                ariaLabel="Access emergency services without signing in"
                icon={<Shield className="w-5 h-5" />}
              >
                Emergency Access
              </AccessibleButton>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>NCPWD Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Government Recognized</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Community Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Free to Use</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Navigate Kenya
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Nairobi to Mombasa, Kisumu to Eldoret - AccessNav provides comprehensive 
              accessibility tools for every corner of Kenya.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AccessibleCard key={index} className="text-center hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-gray-100 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </AccessibleCard>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Kenyans with Disabilities
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from our community members across Kenya
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AccessibleCard key={index} className="hover:shadow-xl transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                    <div className="text-sm text-blue-600">{testimonial.disability}</div>
                  </div>
                </div>
              </AccessibleCard>
            ))}
          </div>
        </div>
      </div>

      {/* Kenya-specific Section */}
      <div className="py-16 bg-gradient-to-r from-green-600 via-black to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Built for Kenya, by Kenyans
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            AccessNav Kenya understands the unique challenges faced by persons with disabilities 
            in our beautiful country. From matatu accessibility to NHIF integration, we're here 
            to support your journey to independence.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">47 Counties</div>
              <div className="text-green-200">Complete Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">3 Languages</div>
              <div className="text-green-200">English, Swahili, Local</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">NHIF Integration</div>
              <div className="text-green-200">Healthcare Access</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">M-Pesa Ready</div>
              <div className="text-green-200">Mobile Money Support</div>
            </div>
          </div>
          
          <AccessibleButton
            onClick={onGetStarted}
            variant="secondary"
            size="xl"
            ariaLabel="Join the AccessNav Kenya community"
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            Join Our Community Today
          </AccessibleButton>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Navigate Kenya with Confidence?
          </h2>
          <p className="text-xl mb-8 leading-relaxed">
            Join thousands of Kenyans with disabilities who are already using AccessNav 
            to live more independently and access opportunities across our nation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AccessibleButton
              onClick={onGetStarted}
              variant="secondary"
              size="xl"
              ariaLabel="Create your free AccessNav Kenya account"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Create Free Account
            </AccessibleButton>
            
            <AccessibleButton
              onClick={() => speak('Downloading AccessNav Kenya mobile app')}
              variant="primary"
              size="xl"
              ariaLabel="Download AccessNav Kenya mobile app"
              className="bg-green-600 hover:bg-green-700"
            >
              Download Mobile App
            </AccessibleButton>
          </div>
          
          <p className="text-blue-200 text-sm mt-6">
            Free forever • No credit card required • Available in English & Swahili
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-6 h-6 text-green-500" />
                <span className="text-xl font-bold">AccessNav Kenya</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering persons with disabilities across Kenya to navigate with confidence and live independently.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Real-time Navigation</li>
                <li>Community Reports</li>
                <li>Health & Wellness</li>
                <li>Employment Hub</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Accessibility</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Partners</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>NCPWD</li>
                <li>Ministry of Health</li>
                <li>County Governments</li>
                <li>DPO Network</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 AccessNav Kenya. Made with ❤️ for persons with disabilities in Kenya.</p>
          </div>
        </div>
      </div>
    </div>
  );
};