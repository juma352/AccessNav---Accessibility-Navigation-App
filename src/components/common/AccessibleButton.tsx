import React, { ReactNode } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface AccessibleButtonProps {
  children: ReactNode;
  onClick: () => void;
  ariaLabel?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  onClick,
  ariaLabel,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  icon,
  fullWidth = false,
}) => {
  const { speak, fontSize, contrastLevel } = useAccessibility();

  const handleClick = () => {
    if (!disabled) {
      onClick();
      if (ariaLabel) {
        speak(ariaLabel);
      }
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-600 hover:border-blue-700';
      case 'secondary':
        return 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 hover:border-gray-400';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white border-2 border-red-600 hover:border-red-700';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white border-2 border-green-600 hover:border-green-700';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-600 hover:border-blue-700';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-2 px-3 text-sm min-h-[40px]';
      case 'md':
        return 'py-3 px-4 text-base min-h-[48px]';
      case 'lg':
        return 'py-4 px-6 text-lg min-h-[56px]';
      case 'xl':
        return 'py-5 px-8 text-xl min-h-[64px]';
      default:
        return 'py-3 px-4 text-base min-h-[48px]';
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${fontSize}
        ${contrastLevel}
        ${fullWidth ? 'w-full' : ''}
        font-semibold rounded-lg shadow-lg
        focus:outline-none focus:ring-4 focus:ring-blue-300
        active:scale-95 transform transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        flex items-center justify-center gap-3
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};