import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

export const DEMO_STORAGE_KEYS = [
  'cooperative-demo-bookings',
  'cooperative-demo-applications',
  'cooperative-demo-jobs',
  'cooperative-demo-availability',
  'cooperative-demo-approvals',
  'cooperative-demo-admin',
] as const;

export function readDemoState<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    if (stored === null) return fallback;
    const parsed = JSON.parse(stored);
    return parsed === null ? fallback : (parsed as T);
  } catch {
    return fallback;
  }
}

export function useDemoState<T>(key: string, fallback: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => readDemoState(key, fallback));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Demo persistence is best-effort if browser storage is unavailable.
    }
  }, [key, state]);

  return [state, setState];
}

export function resetDemoStorage() {
  if (typeof window === 'undefined') return;

  for (const key of DEMO_STORAGE_KEYS) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore storage errors so reset never breaks the dashboard.
    }
  }
}
