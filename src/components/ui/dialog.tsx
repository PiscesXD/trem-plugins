'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

import type { ClassValue } from 'clsx';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

interface DialogPortalProps extends DialogPrimitive.DialogPortalProps {
  className?: string;
  children?: React.ReactNode;
}

const DialogPortal: React.FC<DialogPortalProps> = ({ className, ...props }) => (
  <DialogPrimitive.Portal className={cn(className)} {...props} />
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

interface DialogOverlayProps extends DialogPrimitive.DialogOverlayProps {
  className?: string;
}

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      `
        fixed inset-0 z-50 bg-black/80
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=open]:animate-in data-[state=open]:fade-in-0
      `,
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps extends DialogPrimitive.DialogContentProps {
  className?: string;
  children?: React.ReactNode;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        `
          fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg
          translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6
          shadow-lg duration-200
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0
          data-[state=closed]:zoom-out-95
          data-[state=closed]:slide-out-to-left-1/2
          data-[state=closed]:slide-out-to-top-[48%]
          data-[state=open]:animate-in data-[state=open]:fade-in-0
          data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2
          data-[state=open]:slide-in-from-top-[48%]
          sm:rounded-lg
        `,
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className={cn(
          `
            absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background
            transition-opacity
            data-[state=open]:bg-accent data-[state=open]:text-muted-foreground
            disabled:pointer-events-none
            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
            hover:opacity-100
          `,
        )}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">關閉</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        `
          flex flex-col space-y-1.5 text-center
          sm:text-left
        `,
        className,
      )}
      {...props}
    />
  ),
);
DialogHeader.displayName = 'DialogHeader';

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        `
          flex flex-col-reverse
          sm:flex-row sm:justify-end sm:space-x-2
        `,
        className,
      )}
      {...props}
    />
  ),
);
DialogFooter.displayName = 'DialogFooter';

interface DialogTitleProps extends DialogPrimitive.DialogTitleProps {
  className?: string;
}

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

interface DialogDescriptionProps
  extends DialogPrimitive.DialogDescriptionProps {
  className?: string;
}

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
