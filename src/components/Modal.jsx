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
      className={`fixed inset-0 m-auto z-50 p-0 w-[calc(100%-2rem)] max-w-sm bg-white dark:bg-[#191426] border border-purple-100 dark:border-purple-900/50 rounded-3xl shadow-float backdrop:bg-black/50 backdrop:backdrop-blur-sm transition-all animate-in fade-in zoom-in-95 duration-200 outline-none ${className}`}
    >
      <div className="p-5 sm:p-6" onPointerDown={(e) => e.stopPropagation()}>
        {/* Header row with icon & close button */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-[#2A2142] text-primary dark:text-primary-light flex items-center justify-center shrink-0">
                <Icon size={22} />
              </div>
            )}
            {title && (
              <h2 id={titleId} className="text-lg font-bold text-ink dark:text-white">
                {title}
              </h2>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-ink-muted dark:text-purple-300 hover:text-ink dark:hover:text-white hover:bg-surface-alt dark:hover:bg-purple-900/40 rounded-full transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {description && (
          <p id={descId} className="text-sm text-ink-secondary dark:text-purple-200/80 mb-4 leading-relaxed">
            {description}
          </p>
        )}

        {/* Content body */}
        {children && <div className="mb-5">{children}</div>}

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-5">
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

