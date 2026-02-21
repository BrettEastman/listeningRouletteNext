import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
  /* Light Mode Colors */
  --color-primary: #6366f1;
  --color-primary-dark: #4f46e5;
  --color-primary-light: #818cf8;
  --color-secondary: #ec4899;
  --color-secondary-dark: #db2777;
  --color-secondary-light: #f472b6;

  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-surface-elevated: #ffffff;
  --color-border: #e2e8f0;
  --color-border-light: #f1f5f9;

  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-tertiary: #64748b;
  --color-text-inverse: #ffffff;

  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  --color-accent: #b33a3a;
  --color-accent-dark: #942f2f;
  --color-accent-light: #d14a4a;

  /* Spacing Scale */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  --spacing-4xl: 6rem;

  /* Typography Scale */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 2.5rem;
  --font-size-5xl: 3rem;

  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-pill: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark Mode Colors */
    --color-primary: #818cf8;
    --color-primary-dark: #6366f1;
    --color-primary-light: #a5b4fc;
    --color-secondary: #f472b6;
    --color-secondary-dark: #ec4899;
    --color-secondary-light: #f9a8d4;

    --color-background: #0f172a;
    --color-surface: #1e293b;
    --color-surface-elevated: #334155;
    --color-border: #334155;
    --color-border-light: #475569;

    --color-text-primary: #f1f5f9;
    --color-text-secondary: #cbd5e1;
    --color-text-tertiary: #94a3b8;
    --color-text-inverse: #0f172a;

    --color-success: #34d399;
    --color-warning: #fbbf24;
    --color-error: #f87171;
    --color-info: #60a5fa;

    --color-accent: #f87171;
    --color-accent-dark: #ef4444;
    --color-accent-light: #fca5a5;
  }
}

*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

p {
  font-size: var(--font-size-lg);
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  background-color: var(--color-background);
  background-image: linear-gradient(135deg, var(--color-surface) 0%, var(--color-background) 100%);
  color: var(--color-text-primary);
  transition: background-color 0.2s ease, color 0.2s ease;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
  color: var(--color-text-primary);
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-primary-dark);
}
#root, #__next {
  isolation: isolate;
}
`;

export default GlobalStyles;
