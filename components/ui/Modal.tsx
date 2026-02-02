'use client';

import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useRef, 
  useCallback, 
  forwardRef,
  HTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  KeyboardEvent
} from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================
// Types & Interfaces
// ============================================

interface ModalContextValue {
  isOpen: boolean;
  close: () => void;
  titleId: string;
  descriptionId: string;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal subcomponents must be used within a Modal');
  }
  return context;
};

// ============================================
// Focus Management Utilities
// ============================================

const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];
  return Array.from(
    container.querySelectorAll(focusableSelectors.join(', '))
  ).filter(
    (el): el is HTMLElement => 
    el instanceof HTMLElement && 
    el.offsetParent !== null
  );
};

const focusFirstElement = (container: HTMLElement): void => {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  } else {
    // If no focusable elements, focus the container itself
    container.focus();
  }
};

// ============================================
// Main Modal Component
// ============================================

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  restoreFocus?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  overlayClassName,
  contentClassName,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  restoreFocus = true,
}) => {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  
  // Generate unique IDs for accessibility
  const titleId = React.useId();
  const descriptionId = React.useId();

  // Focus trap handler
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;

    if (event.key === 'Escape' && closeOnEscape) {
      onClose();
      return;
    }

    // Focus trap: cycle through focusable elements
    if (event.key === 'Tab') {
      const focusableElements = getFocusableElements(modalRef.current);
      
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab: move to previous element
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: move to next element
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  }, [closeOnEscape, onClose]);

  // Handle modal open
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = 'hidden';
      
      // Store the previously focused element for restoration
      if (restoreFocus) {
        previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
      }

      // Focus the first element after a brief delay to ensure modal is rendered
      const timeoutId = setTimeout(() => {
        if (modalRef.current) {
          focusFirstElement(modalRef.current);
        }
      }, 50);

      return () => clearTimeout(timeoutId);
    } else {
      document.body.style.overflow = '';
      
      // Restore focus to the previously focused element
      if (restoreFocus && previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus();
      }
      
      // Delay unmounting for animation
      const timeoutId = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, restoreFocus]);

  if (!mounted) return null;

  const contextValue: ModalContextValue = {
    isOpen,
    close: onClose,
    titleId,
    descriptionId,
  };

  return createPortal(
    <ModalContext.Provider value={contextValue}>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          'bg-black/50 backdrop-blur-sm',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
          overlayClassName
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget && closeOnOverlayClick) {
            onClose();
          }
        }}
      >
        {/* Modal Content */}
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className={cn(
            'relative z-10 w-full max-w-lg transform',
            'bg-white rounded-lg shadow-2xl',
            'transition-all duration-300',
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
            contentClassName
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
};

// ============================================
// Modal Subcomponents
// ============================================

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between p-6 border-b border-neutral-200', className)}
        {...props}
      >
        {children}
        <ModalClose />
      </div>
    );
  }
);
ModalHeader.displayName = 'ModalHeader';

export interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ className, children, ...props }, ref) => {
    const { titleId } = useModalContext();
    return (
      <h2
        ref={ref}
        id={titleId}
        className={cn('text-xl font-semibold text-neutral-900', className)}
        {...props}
      >
        {children}
      </h2>
    );
  }
);
ModalTitle.displayName = 'ModalTitle';

export interface ModalDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const ModalDescription = forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const { descriptionId } = useModalContext();
    return (
      <p
        ref={ref}
        id={descriptionId}
        className={cn('text-sm text-neutral-600 mt-1', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
ModalDescription.displayName = 'ModalDescription';

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-6', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ModalBody.displayName = 'ModalBody';

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-end gap-3 p-6 border-t border-neutral-200', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ModalFooter.displayName = 'ModalFooter';

export interface ModalCloseProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children?: ReactNode;
}

export const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ className, children, ...props }, ref) => {
    const { close } = useModalContext();
    return (
      <button
        ref={ref}
        type="button"
        onClick={close}
        className={cn(
          'p-2 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          'flex items-center justify-center',
          className
        )}
        aria-label="Close modal"
        {...props}
      >
        {children || <X className="w-5 h-5" />}
      </button>
    );
  }
);
ModalClose.displayName = 'ModalClose';
