import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  onClick?: () => void;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const { speak } = useAccessibility();

  const handleBreadcrumbClick = (item: BreadcrumbItem) => {
    if (item.onClick && !item.current) {
      item.onClick();
      speak(`Navigating to ${item.label}`);
    }
  };

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb navigation"
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight 
                className="w-4 h-4 text-gray-400 mx-2" 
                aria-hidden="true"
              />
            )}
            
            {index === 0 && (
              <Home 
                className="w-4 h-4 text-gray-500 mr-2" 
                aria-hidden="true"
              />
            )}
            
            {item.current ? (
              <span 
                className="text-gray-900 font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => handleBreadcrumbClick(item)}
                className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1 transition-colors"
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};