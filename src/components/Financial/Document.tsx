import React from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { Document as DocumentType } from '../../types';

interface DocumentProps {
  document: DocumentType;
  onView: (documentId: string) => void;
  onShare: (documentId: string) => void;
}

export const Document: React.FC<DocumentProps> = ({ document, onView, onShare }) => {
  const { speak } = useAccessibility();

  const getDocumentTypeLabel = (type: string) => {
    return type.replace('-', ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getSecurityLevelClass = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <AccessibleCard className="hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-900">{document.name}</h4>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <span>{getDocumentTypeLabel(document.type)}</span>
            <span>Added: {document.dateAdded.toLocaleDateString()}</span>
            {document.issuingAuthority && (
              <span>Issued by: {document.issuingAuthority}</span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {document.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className={`px-2 py-1 rounded text-xs font-medium ${getSecurityLevelClass(document.securityLevel)}`}>
            {document.securityLevel} security
          </div>
          <div className="flex gap-2">
            <AccessibleButton
              onClick={() => onView(document.id)}
              variant="secondary"
              size="sm"
              ariaLabel={`View ${document.name}`}
            >
              View
            </AccessibleButton>
            <AccessibleButton
              onClick={() => onShare(document.id)}
              variant="secondary"
              size="sm"
              ariaLabel={`Share ${document.name}`}
            >
              Share
            </AccessibleButton>
          </div>
        </div>
      </div>
    </AccessibleCard>
  );
};