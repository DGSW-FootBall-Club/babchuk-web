export const colors = {
  background: "var(--color-background)",
  subtle: "var(--color-subtle)",
  muted: "var(--color-muted)",
  line: "var(--color-line)",
  lineSubtle: "var(--color-line-subtle)",
  foreground: "var(--color-foreground)",
  body: "var(--color-body)",
  mutedForeground: "var(--color-muted-foreground)",
  placeholder: "var(--color-placeholder)",
  primary: "var(--color-primary)",
  primarySubtle: "var(--color-primary-subtle)",
  danger: "var(--color-danger)",
  dangerSubtle: "var(--color-danger-subtle)",
  success: "var(--color-success)",
} as const;

export type ColorToken = keyof typeof colors;
