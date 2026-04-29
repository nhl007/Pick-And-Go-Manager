export type PasswordRuleKey = "length" | "upper" | "number" | "symbol";

export type PasswordStrengthState = {
  score: number;
  rules: Record<PasswordRuleKey, boolean>;
};

const SPECIAL_RE = /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/;`~]/;

export function evaluatePasswordStrength(password: string): PasswordStrengthState {
  const length = password.length >= 8;
  const upper = /[A-Z]/.test(password);
  const number = /[0-9]/.test(password);
  const symbol = SPECIAL_RE.test(password);

  const rules: Record<PasswordRuleKey, boolean> = {
    length,
    upper,
    number,
    symbol,
  };

  const satisfied = [length, upper, number, symbol].filter(Boolean).length;
  let score = 0;
  if (password.length === 0) {
    score = 0;
  } else if (password.length < 8) {
    score = Math.min(2, 1 + Math.floor(password.length / 4));
  } else {
    score = 2 + satisfied;
  }
  score = Math.min(4, Math.max(0, score));

  return { score, rules };
}

export function passwordMeetsAllRules(password: string): boolean {
  const { rules } = evaluatePasswordStrength(password);
  return rules.length && rules.upper && rules.number && rules.symbol;
}
