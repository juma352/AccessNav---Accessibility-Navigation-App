import React, { ReactNode } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface AccessibleCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  priority?: 'low' | 'medium' | 'high';
}

export const AccessibleCard: React.FC<AccessibleCardProps> = ({
  children,
  title,
  className = '',
  clickable = false,
  onClick,
  ariaLabel,
  priority = 'medium',
}) => {
  const { speak, fontSize, contrastLevel } = useAccessibility();

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
      if (ariaLabel || title) {
        speak(ariaLabel || title || 'Card selected');
      }
    }
  };

  const getPriorityBorder = () => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-red-500';
      case 'medium':
        return 'border-l-4 border-l-yellow-500';
      case 'low':
        return 'border-l-4 border-l-green-500';
      default:
        return '';
    }
  };

  const cardClasses = `
    bg-white rounded-xl shadow-lg border-2 border-gray-200
    ${getPriorityBorder()}
    ${fontSize}
    ${contrastLevel}
    ${clickable ? 'cursor-pointer hover:shadow-xl hover:border-blue-300 transform hover:scale-[1.02] transition-all duration-200' : ''}
    ${clickable ? 'focus:outline-none focus:ring-4 focus:ring-blue-300' : ''}
    p-6
    ${className}
  `;

  const CardComponent = clickable ? 'button' : 'div';

  return (
    <CardComponent
      className={cardClasses}
      onClick={clickable ? handleClick : undefined}
      aria-label={clickable ? ariaLabel : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-left">
          {title}
        </h3>
      )}
      {children}
    </CardComponent>
  );
};