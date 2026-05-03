/**
 * Stillpoint voice samples in different UI contexts.
 *
 * The Stillpoint voice is calm, encouraging, clear — like a calm,
 * supportive friend. Direct without being curt; warm without being
 * saccharine. Specific, not generic. Treats users as competent adults
 * pursuing peace, not as fragile or in need of cheerleading.
 *
 * Source: the Stillpoint context (`content/context.ts`). Used as
 * illustration material in the Spruce command catalog — particularly
 * /voice, /design, /critique, and /finish examples.
 */

export const stillpointVoice = {
  sessionIntro: "Let’s take a few moments to come back to what matters.",
  notification: "Breathe in. Breathe out. You’ve got this.",
  onboarding: "Small steps, taken daily, create big change.",
  emptyState: "Your practice starts here. Pick a session when you’re ready.",
  successMessage: "You did good work today.",
  errorMessage:
    "Something didn’t go through. Take a breath; try again when you’re ready.",
  confirmationPrompt: "Take a moment with this. Are you sure?",
  signoff: "See you tomorrow.",

  // ─── Additional moments ─────────────────────────────────────────────
  // Resumption — when a user returns to a session they paused.
  resumeSession: "Welcome back. Your session is right where you left it.",
  // Streaks — quiet acknowledgment, not performative cheering.
  streakMilestone: "Seven days in a row. That’s a real practice taking shape.",
  streakReturn:
    "It’s been a few days. No pressure — just glad you’re here when you are.",
  // Reminders — gentle, never urgent, never guilt-inducing.
  gentleReminder: "A few minutes for yourself, when it’s right.",
  eveningReminder:
    "Wind down with a short session before bed — five minutes is plenty.",
  // Interruptions and recovery.
  sessionInterrupted:
    "Looks like the session was interrupted. We saved your progress.",
  // Transitions between practice types.
  switchPractice: "Different day, different need. Try something new tonight.",
} as const;
