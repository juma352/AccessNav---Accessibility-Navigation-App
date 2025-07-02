import React, { useState } from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { ChevronDown, ChevronUp, BookOpen, Scale, Shield, FileText, Award, Users } from 'lucide-react';

interface PWDActEducationProps {
  onClose: () => void;
}

export const PWDActEducation: React.FC<PWDActEducationProps> = ({ onClose }) => {
  const { speak } = useAccessibility();
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
      speak(`${section} section collapsed`);
    } else {
      setExpandedSection(section);
      speak(`${section} section expanded`);
    }
  };

  const renderSectionHeader = (section: string, title: string, icon: React.ReactNode) => (
    <div 
      className="flex items-center justify-between p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
      onClick={() => toggleSection(section)}
      role="button"
      aria-expanded={expandedSection === section}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && toggleSection(section)}
    >
      <div className="flex items-center gap-3">
        <div className="text-blue-600">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-blue-900">{title}</h3>
      </div>
      <div className="text-blue-600">
        {expandedSection === section ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">PWD Act 2025 Education</h2>
          <p className="text-gray-600">Understanding your rights and protections under the new legislation</p>
        </div>
        <AccessibleButton
          onClick={onClose}
          variant="secondary"
          size="md"
          ariaLabel="Close PWD Act education"
        >
          Close
        </AccessibleButton>
      </div>

      <div className="bg-gradient-to-r from-green-600 via-black to-red-600 text-white p-6 rounded-xl mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">The Persons with Disabilities Act 2025</h3>
          <p className="text-lg mb-4">
            A landmark legislation that strengthens the rights and protections for persons with disabilities across Kenya.
          </p>
          <p className="text-white text-opacity-90">
            Enacted to promote equality, inclusion, and full participation of persons with disabilities in all aspects of society.
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {renderSectionHeader('overview', 'Overview of the Act', <BookOpen className="w-6 h-6" />)}
        {expandedSection === 'overview' && (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="mb-4">
              The Persons with Disabilities Act 2025 is a comprehensive legislation that builds upon previous laws to strengthen the rights and protections for persons with disabilities in Kenya. The Act aligns with the United Nations Convention on the Rights of Persons with Disabilities (UNCRPD) and Kenya's Constitution.
            </p>
            <p className="mb-4">
              This legislation addresses various aspects of life for persons with disabilities, including accessibility, education, employment, healthcare, and social protection. It establishes clear obligations for both public and private entities to ensure inclusion and equal opportunities.
            </p>
            <p>
              The Act represents a significant step forward in recognizing the rights and dignity of persons with disabilities, moving from a charity-based approach to a rights-based framework that empowers individuals to participate fully in society.
            </p>
          </div>
        )}

        {renderSectionHeader('rights', 'Key Rights and Protections', <Shield className="w-6 h-6" />)}
        {expandedSection === 'rights' && (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h4 className="font-bold text-lg mb-3">The Act guarantees several fundamental rights:</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="bg-green-100 text-green-700 p-1 rounded-full mt-1 flex-shrink-0">✓</div>
                <div>
                  <strong>Right to Equality and Non-discrimination</strong> - Protection against all forms of discrimination based on disability in all areas of life.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-green-100 text-green-700 p-1 rounded-full mt-1 flex-shrink-0">✓</div>
                <div>
                  <strong>Right to Accessible Environment</strong> - Mandates accessibility in buildings, transportation, information, and communication technologies.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-green-100 text-green-700 p-1 rounded-full mt-1 flex-shrink-0">✓</div>
                <div>
                  <strong>Right to Education</strong> - Ensures inclusive education at all levels and promotes lifelong learning opportunities.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-green-100 text-green-700 p-1 rounded-full mt-1 flex-shrink-0">✓</div>
                <div>
                  <strong>Right to Employment</strong> - Prohibits discrimination in hiring, promotion, and working conditions, and requires reasonable accommodations.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-green-100 text-green-700 p-1 rounded-full mt-1 flex-shrink-0">✓</div>
                <div>
                  <strong>Right to Healthcare</strong> - Ensures access to quality healthcare services, including rehabilitation and assistive technologies.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-green-100 text-green-700 p-1 rounded-full mt-1 flex-shrink-0">✓</div>
                <div>
                  <strong>Right to Political Participation</strong> - Guarantees the right to vote, hold office, and participate in public affairs.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-green-100 text-green-700 p-1 rounded-full mt-1 flex-shrink-0">✓</div>
                <div>
                  <strong>Right to Legal Capacity</strong> - Recognizes the right of persons with disabilities to make their own decisions with appropriate support.
                </div>
              </li>
            </ul>
          </div>
        )}

        {renderSectionHeader('accessibility', 'Accessibility Requirements', <FileText className="w-6 h-6" />)}
        {expandedSection === 'accessibility' && (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="mb-4">
              The Act establishes comprehensive accessibility standards that must be implemented across Kenya. These standards cover:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <AccessibleCard title="Physical Environment">
                <ul className="space-y-2 text-sm">
                  <li>• All new buildings must be fully accessible</li>
                  <li>• Existing buildings must be retrofitted within specified timeframes</li>
                  <li>• Public spaces must include accessible pathways, ramps, and facilities</li>
                  <li>• Accessible parking spaces must be designated and enforced</li>
                </ul>
              </AccessibleCard>
              <AccessibleCard title="Transportation">
                <ul className="space-y-2 text-sm">
                  <li>• Public transportation vehicles must be accessible</li>
                  <li>• Transportation hubs must have accessible facilities</li>
                  <li>• Alternative transportation options must be available</li>
                  <li>• Staff must be trained to assist persons with disabilities</li>
                </ul>
              </AccessibleCard>
              <AccessibleCard title="Information & Communication">
                <ul className="space-y-2 text-sm">
                  <li>• Websites must meet international accessibility standards</li>
                  <li>• Public information must be available in accessible formats</li>
                  <li>• Sign language interpretation must be provided for public events</li>
                  <li>• Telecommunication services must be accessible</li>
                </ul>
              </AccessibleCard>
              <AccessibleCard title="Digital Accessibility">
                <ul className="space-y-2 text-sm">
                  <li>• Mobile applications must be accessible</li>
                  <li>• Digital services must support assistive technologies</li>
                  <li>• Electronic documents must be in accessible formats</li>
                  <li>• Digital kiosks and self-service machines must be accessible</li>
                </ul>
              </AccessibleCard>
            </div>
            <p className="text-sm bg-yellow-50 p-3 rounded-lg">
              <strong>Note:</strong> The Act requires all public and private entities to comply with these standards within specified timeframes, with penalties for non-compliance.
            </p>
          </div>
        )}

        {renderSectionHeader('implementation', 'Implementation and Enforcement', <Scale className="w-6 h-6" />)}
        {expandedSection === 'implementation' && (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="mb-4">
              The Act establishes robust mechanisms for implementation and enforcement to ensure its provisions are effectively carried out:
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-lg mb-2">National Council for Persons with Disabilities (NCPWD)</h4>
                <p>The NCPWD has been strengthened with expanded powers to:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Monitor compliance with the Act</li>
                  <li>Investigate complaints of discrimination</li>
                  <li>Issue compliance notices to violators</li>
                  <li>Impose administrative penalties for non-compliance</li>
                  <li>Develop and review accessibility standards</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-2">County Disability Boards</h4>
                <p>Each of Kenya's 47 counties must establish a County Disability Board responsible for:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Implementing the Act at the county level</li>
                  <li>Monitoring compliance within the county</li>
                  <li>Coordinating with the NCPWD on enforcement</li>
                  <li>Addressing local disability-related issues</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-2">Judicial Remedies</h4>
                <p>The Act provides for judicial remedies, including:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Right to file complaints with the NCPWD or courts</li>
                  <li>Compensation for discrimination or rights violations</li>
                  <li>Injunctive relief to stop discriminatory practices</li>
                  <li>Class action lawsuits for systemic discrimination</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-2">Penalties for Non-Compliance</h4>
                <p>The Act introduces significant penalties for non-compliance:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Administrative fines for organizations failing to meet accessibility standards</li>
                  <li>Criminal penalties for severe cases of discrimination</li>
                  <li>Mandatory remediation orders</li>
                  <li>Publication of non-compliant entities</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {renderSectionHeader('benefits', 'Benefits and Support Programs', <Award className="w-6 h-6" />)}
        {expandedSection === 'benefits' && (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="mb-4">
              The Act establishes and enhances various benefits and support programs for persons with disabilities:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg text-blue-900 mb-2">Financial Support</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Enhanced cash transfer program for persons with severe disabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Tax exemptions on income and assistive devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Subsidies for healthcare costs related to disability</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg text-green-900 mb-2">Education Support</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Scholarships for students with disabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Free assistive learning technologies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Support for inclusive education programs</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg text-purple-900 mb-2">Employment Support</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Tax incentives for employers hiring persons with disabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Subsidies for workplace accommodations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>Vocational training and job placement services</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-bold text-lg text-orange-900 mb-2">Healthcare Support</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Enhanced NHIF coverage for disability-related conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Free or subsidized assistive devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Rehabilitation services in all counties</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-bold text-lg text-yellow-900 mb-2">How to Access Benefits</h4>
              <p className="mb-2">To access these benefits, persons with disabilities need to:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Register with the National Council for Persons with Disabilities (NCPWD)</li>
                <li>Obtain a disability identification card</li>
                <li>Apply for specific benefits through the relevant government agencies</li>
                <li>Provide necessary documentation, including medical assessments where required</li>
              </ol>
              <p className="mt-3 text-sm">
                <strong>Note:</strong> AccessNav Kenya can help guide you through these processes and connect you with the appropriate agencies.
              </p>
            </div>
          </div>
        )}

        {renderSectionHeader('advocacy', 'Advocacy and Participation', <Users className="w-6 h-6" />)}
        {expandedSection === 'advocacy' && (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="mb-4">
              The Act emphasizes the importance of advocacy and participation of persons with disabilities in all aspects of society:
            </p>
            
            <div className="space-y-5">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-lg mb-2">Representation in Decision-Making</h4>
                <p>
                  The Act mandates representation of persons with disabilities in various decision-making bodies, including:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>National and county governments</li>
                  <li>Public service boards</li>
                  <li>Educational institutions</li>
                  <li>Healthcare policy committees</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-lg mb-2">Support for Disabled Persons Organizations (DPOs)</h4>
                <p>
                  The Act provides for:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Financial support for DPOs</li>
                  <li>Capacity building programs</li>
                  <li>Inclusion of DPOs in policy development</li>
                  <li>Formal recognition of DPOs as stakeholders in disability matters</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-bold text-lg mb-2">Public Participation</h4>
                <p>
                  The Act requires:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Accessible public participation processes</li>
                  <li>Inclusion of persons with disabilities in public consultations</li>
                  <li>Accessible formats for public information</li>
                  <li>Sign language interpretation for public events</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-bold text-lg mb-2">Awareness and Education</h4>
                <p>
                  The Act mandates:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Public awareness campaigns on disability rights</li>
                  <li>Inclusion of disability rights in school curricula</li>
                  <li>Training for public officials on disability inclusion</li>
                  <li>Media representation of persons with disabilities</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-lg text-blue-900 mb-2">How You Can Get Involved</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="bg-blue-100 text-blue-700 p-1 rounded-full mt-1 flex-shrink-0">→</div>
                  <div>
                    <strong>Join a DPO</strong> - Connect with local Disabled Persons Organizations in your county
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-100 text-blue-700 p-1 rounded-full mt-1 flex-shrink-0">→</div>
                  <div>
                    <strong>Participate in public forums</strong> - Attend county assembly meetings and public participation events
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-100 text-blue-700 p-1 rounded-full mt-1 flex-shrink-0">→</div>
                  <div>
                    <strong>Report violations</strong> - Use AccessNav Kenya to report accessibility issues and rights violations
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-blue-100 text-blue-700 p-1 rounded-full mt-1 flex-shrink-0">→</div>
                  <div>
                    <strong>Educate others</strong> - Share information about disability rights with your community
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">How AccessNav Kenya Supports Your Rights</h3>
        <p className="mb-4">
          AccessNav Kenya is committed to helping you understand and exercise your rights under the PWD Act 2025:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-bold text-lg mb-2">Navigation & Reporting</h4>
            <p className="text-sm">
              Use our app to navigate accessible routes and report accessibility barriers, contributing to enforcement of the Act.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-bold text-lg mb-2">Resource Directory</h4>
            <p className="text-sm">
              Access our comprehensive directory of government offices, DPOs, and service providers to help you access benefits.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-bold text-lg mb-2">Community Support</h4>
            <p className="text-sm">
              Connect with other users to share experiences, advice, and advocacy opportunities related to the Act.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-2">
          This information is provided for educational purposes and is based on the Persons with Disabilities Act 2025.
        </p>
        <p className="text-sm text-gray-600">
          For legal advice or official interpretation of the Act, please consult with a qualified legal professional or the NCPWD.
        </p>
      </div>
    </div>
  );
};