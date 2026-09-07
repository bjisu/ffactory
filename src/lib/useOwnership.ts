"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "nfc-keyring-ownership";

export type Ownership = {
  registeredAt: string; // ISO 8601
};

/** 등록일로부터 며칠 지났는지 (같은 날이면 0) */
export function daysTogether(registeredAt: string): number {
  const start = new Date(registeredAt);
  const startDay = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(
    0,
    Math.round((today.getTime() - startDay.getTime()) / 86_400_000)
  );
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

export function useOwnership() {
  const [ownership, setOwnership] = useState<Ownership | null>(null);
  /** localStorage 를 아직 못 읽은 상태 — 화면 깜빡임 방지용 */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setOwnership(JSON.parse(raw) as Ownership);
    } catch {
      // 저장소를 못 읽으면 미등록 상태로 시작합니다
    }
    setLoading(false);
  }, []);

  const register = useCallback(() => {
    const next: Ownership = { registeredAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // 저장이 안 되더라도 화면은 정상 진행합니다
    }
    setOwnership(next);
  }, []);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // 무시
    }
    setOwnership(null);
  }, []);

  return { ownership, loading, register, reset };
}
