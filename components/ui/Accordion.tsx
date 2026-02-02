'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

const accordionItemVariants = cva(
  'border-b border-neutral-200 last:border-b-0',
  {
    variants: {},
    defaultVariants: {},
  }
);

const accordionTriggerVariants = cva(
  'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-90',
  {
    variants: {
      variant: {
        default: 'text-left',
        centered: 'text-center justify-center',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const accordionContentVariants = cva('overflow-hidden text-sm', {
  variants: {},
  defaultVariants: {},
});

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionItemVariants> {
  value: string;
}

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
  variant?: 'default' | 'borderless';
}

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof accordionTriggerVariants> {
  showIcon?: boolean;
}

export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionContentVariants> {}

const AccordionContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
}>({});

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    { className, defaultValue, value, onValueChange, collapsible = true, variant = 'default', children, ...props },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string | undefined>(value || defaultValue);

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        const nextValue = value === newValue ? (collapsible ? undefined : newValue) : newValue;
        if (value === undefined) {
          setInternalValue(nextValue);
        }
        onValueChange?.(nextValue || '');
      },
      [value, collapsible, onValueChange]
    );

    return (
      <AccordionContext.Provider value={{ value: value ?? internalValue, onValueChange: handleValueChange, collapsible }}>
        <div
          ref={ref}
          className={cn('w-full', variant === 'borderless' && 'divide-y-0', className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = 'Accordion';

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = React.useContext(AccordionContext);
    const isOpen = selectedValue === value;

    return (
      <div ref={ref} className={cn(accordionItemVariants(), className)} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              isOpen,
              onToggle: () => onValueChange?.(value),
            } as any);
          }
          return child;
        })}
      </div>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, variant, showIcon = true, isOpen, onToggle, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(accordionTriggerVariants({ variant }), className)}
        onClick={onToggle}
        {...props}
      >
        {children}
        {showIcon && (
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-4 w-4 shrink-0 text-neutral-500 transition-transform" />
          </motion.div>
        )}
      </button>
    );
  }
);
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, isOpen, ...props }, ref) => {
    return (
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            ref={ref}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={cn(accordionContentVariants(), className)}
            {...props}
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.2 }}
              className="pb-4 pt-0"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
