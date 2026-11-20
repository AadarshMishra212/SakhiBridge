import React, { useEffect, useRef, useId } from 'react';
import { X } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

/**
 * Modern Accessible Modal using the native <dialog> element
 * Complies with Modern Web Guidance:
 * - Uses dialog.showModal() for top-layer rendering, inert page, and native Esc handling
 * - overscroll-behavior: contain prevents background scrolling
 * - Accessible name with aria-labelledby
 * - Click-outside dismissal support
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  confirmText,
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  onConfirm,
  isConfirmLoading = false,
  icon: Icon,
  className = ''
}) => {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descId = useId();

  // Synchronize modal state with native HTMLDialogElement
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle native cancel event (Esc key)
  const handleCancel = (e) => {
    e.preventDefault();
    if (onClose) onClose();
  };

  // Click outside backdrop detection
  const handlePointerDown = (e) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const rect = dialog.getBoundingClientRect();
    const isOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;

    if (isOutside && onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onPointerDown={handlePointerDown}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descId : undefined}
      className={`fixed inset-0 m-auto z-50 p-0 w-[calc(100%-2rem)] max-w-md bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.10] dark:border-lace/[0.12] rounded-4xl shadow-float backdrop:bg-black/60 backdrop:backdrop-blur-md transition-all animate-in fade-in zoom-in-95 duration-200 outline-none ${className}`}
    >
      <div className="p-6 sm:p-7" onPointerDown={(e) => e.stopPropagation()}>
        {/* Header row with icon & close button */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-10 h-10 rounded-2xl bg-burgundy-900/[0.04] dark:bg-white/[0.06] text-primary flex items-center justify-center shrink-0 border border-burgundy-900/[0.06] dark:border-lace/[0.08]">
                <Icon size={22} />
              </div>
            )}
            {title && (
              <h2 id={titleId} className="text-lg sm:text-xl font-bold text-ink dark:text-lace font-serif">
                {title}
              </h2>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-ink-muted dark:text-lace/70 hover:text-ink dark:hover:text-lace hover:bg-burgundy-900/[0.05] dark:hover:bg-white/[0.06] rounded-full transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {description && (
          <p id={descId} className="text-xs sm:text-sm text-ink-secondary dark:text-lace/80 mb-4 leading-relaxed font-sans">
            {description}
          </p>
        )}

        {/* Content body */}
        {children && <div className="mb-5">{children}</div>}

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-6">
          {cancelText && (
            <PrimaryButton
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              fullWidth
            >
              {cancelText}
            </PrimaryButton>
          )}

          {confirmText && onConfirm && (
            <PrimaryButton
              type="button"
              variant={confirmVariant}
              size="md"
              isLoading={isConfirmLoading}
              onClick={onConfirm}
              fullWidth
            >
              {confirmText}
            </PrimaryButton>
          )}
        </div>
      </div>
    </dialog>
  );
};
