"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Lightbox — pop-up viewport for artifacts that need their own breathing
 * room. Built on the native <dialog> element so focus trap, ESC handling,
 * and accessibility come for free; backdrop click closes; body scroll
 * locks while open.
 *
 * Used by JourneyDemo (the journey map is a wide horizontal artifact
 * that doesn't fit cleanly in the constrained command-detail container).
 * Other Discovery demos use ExpandablePanel; the lightbox is reserved
 * for artifacts where the format itself needs space.
 */

type Props = {
  open: boolean;
  onClose: () => void;
  /** Title shown in the lightbox header (also used for aria-label). */
  title: string;
  /** Optional subtitle (smaller, beneath the title). */
  subtitle?: string;
  children: ReactNode;
};

export function Lightbox({ open, onClose, title, subtitle, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync the open prop with the dialog's native open state.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // Lock body scroll while the lightbox is open.
      document.body.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The dialog's native close event fires on ESC and on dialog.close() —
  // make sure parent state matches.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  // Click on the dialog element itself (not its children) = backdrop click.
  // Native <dialog> doesn't expose backdrop click directly; this works
  // because the dialog fills the viewport and the inner content is a
  // child element.
  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleClick}
      aria-label={title}
      className="
        fixed inset-0 m-auto w-[min(95vw,1600px)] max-w-none max-h-[90vh]
        bg-surface text-ink rounded-md border border-rule shadow-2xl
        p-0 backdrop:bg-ink/60 backdrop:backdrop-blur-sm
        open:animate-[fadeIn_120ms_ease-out]
      "
    >
      {/* Header bar — title, subtitle, close button. Sticky so it
          stays visible if the body scrolls. */}
      <header className="sticky top-0 z-10 bg-surface-elevated border-b border-rule px-6 py-4 md:px-8 md:py-5 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-2xs uppercase tracking-widest text-accent mb-1">
            Artifact viewer
          </p>
          <h2 className="font-display font-normal text-xl md:text-2xl tracking-tight text-ink leading-tight">
            {title}
          </h2>
          {subtitle ? (
            <p className="font-display italic font-normal text-sm md:text-base text-ink-muted leading-snug mt-1">
              {subtitle}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close artifact viewer"
          className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border border-rule text-ink-subtle hover:border-accent hover:text-accent transition-colors duration-fast ease-considered focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <CloseIcon />
        </button>
      </header>

      {/* Body — scrollable area. Height accommodates the header. */}
      <div className="overflow-auto" style={{ maxHeight: "calc(90vh - 88px)" }}>
        {children}
      </div>
    </dialog>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 3 L11 11 M11 3 L3 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
