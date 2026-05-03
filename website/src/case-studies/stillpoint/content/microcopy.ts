/**
 * Stillpoint UI strings — button labels, navigation items, app-screen
 * copy, notifications, status messages, form labels.
 *
 * Used as illustration material in the Spruce command catalog — most
 * directly in /design, /voice, and /refine examples that need real UI
 * strings to demonstrate the corrective.
 *
 * Voice register matches `content/voice.ts`: calm, specific, respectful.
 * Buttons describe their actions; status messages describe what's
 * happening; form labels are direct.
 */

export const stillpointMicrocopy = {
  buttons: {
    primary: {
      startSession: "Start Session",
      continue: "Continue",
      save: "Save",
      beginPractice: "Begin Practice",
    },
    secondary: {
      skip: "Skip for now",
      tryDifferent: "Try a different session",
      pause: "Pause",
    },
    tertiary: {
      learnMore: "Learn more about this practice",
      viewHistory: "View your practice history",
    },
  },

  navigation: {
    home: "Home",
    meditate: "Meditate",
    sleep: "Sleep",
    journal: "Journal",
    profile: "Profile",
  },

  appScreen: {
    morningGreeting: "Good morning, Alex",
    findYourStillpoint: "Find your stillpoint",
    startYourDay: "Start your day with a few mindful minutes.",
    continueYourJourney: "Continue your journey",
    morningGrounding: "Morning Grounding",
    duration: "5 min · Breath",
  },

  notifications: {
    morning: "A few minutes for yourself, when it's right.",
    evening: "Wind down with a short session before bed.",
    streakHeld: "Your practice is taking shape. See you tomorrow.",
    sessionReady: "Your session is ready when you are.",
  },

  status: {
    saving: "Saving…",
    saved: "Saved",
    syncing: "Syncing your practice",
    offline: "Offline — your progress will sync when you're back online.",
    sessionLoading: "Preparing your session",
  },

  formLabels: {
    journalEntryTitle: "What's on your mind?",
    journalEntryPlaceholder: "Write whatever comes up.",
    practiceLength: "How long do you have?",
    reminderTime: "When should we send a gentle reminder?",
    name: "What should we call you?",
  },
} as const;
