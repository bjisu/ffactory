"use client";

import { useCallback, useEffect, useState } from "react";

/** 태그별로 토큰과 등록일을 따로 보관합니다 */
const STORAGE_PREFIX = "nfc-tag:";

export type Ownership = {
  registeredAt: string; // ISO 8601
};

type Stored = {
  token: string;
  registeredAt: string;
};

export type TagStage =
  /** 검증 중 — 화면 깜빡임을 막기 위해 아무것도 그리지 않습니다 */
  | "loading"
  /** 식별자가 없거나 발행 목록에 없음 */
  | "invalid"
  /** 정품 확인됨, 아직 미등록 */
  | "register"
  /** 방금 등록 완료 — 잠시 뒤 메인으로 넘어갑니다 */
  | "registered"
  | "main";

export type TagSession = {
  stage: TagStage;
  tagId: string | null;
  serialNumber: number | null;
  ownership: Ownership | null;
  /** 등록 요청이 진행 중인지 (버튼 중복 클릭 방지) */
  submitting: boolean;
  error: string | null;
  register: () => void;
  reset: () => void;
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

function read(tagId: string): Stored | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + tagId);
    return raw ? (JSON.parse(raw) as Stored) : null;
  } catch {
    return null;
  }
}

function write(tagId: string, value: Stored) {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + tagId, JSON.stringify(value));
  } catch {
    // 저장이 안 되더라도 이번 세션은 그대로 진행합니다
  }
}

/** 등록 화면이 뒤로가기로 되살아나지 않도록 히스토리를 덮어씁니다 */
function replaceHistory() {
  try {
    window.history.replaceState(null, "", window.location.href);
  } catch {
    // 히스토리를 못 만져도 화면 전환에는 영향이 없습니다
  }
}

/**
 * 태그 URL(...?tag=<식별자>)로 진입한 뒤의 전체 흐름을 관리합니다.
 * 진입 → 서버 검증 → (미등록이면) 등록 화면 → 등록 → 등록 완료 → 메인.
 */
export function useTagSession(): TagSession {
  const [stage, setStage] = useState<TagStage>("loading");
  const [tagId, setTagId] = useState<string | null>(null);
  const [serialNumber, setSerialNumber] = useState<number | null>(null);
  const [ownership, setOwnership] = useState<Ownership | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("tag");
    setTagId(id);

    if (!id) {
      setStage("invalid");
      return;
    }

    const stored = read(id);
    const query = new URLSearchParams({ tag: id });
    if (stored?.token) query.set("token", stored.token);

    let cancelled = false;
    fetch(`/api/tags/verify?${query.toString()}`)
      .then((res) => res.json())
      .then((data: {
        valid?: boolean;
        serialNumber?: number;
        registered?: boolean;
      }) => {
        if (cancelled) return;
        if (!data.valid) {
          setStage("invalid");
          return;
        }
        setSerialNumber(data.serialNumber ?? null);
        // 토큰이 유효하면 등록 화면을 건너뛰고 바로 메인으로 보냅니다
        if (data.registered && stored) {
          setOwnership({ registeredAt: stored.registeredAt });
          replaceHistory();
          setStage("main");
        } else {
          setStage("register");
        }
      })
      .catch(() => {
        if (!cancelled) setStage("invalid");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const register = useCallback(() => {
    if (!tagId || submitting) return;
    setSubmitting(true);
    setError(null);

    fetch("/api/tags/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tag: tagId }),
    })
      .then((res) => res.json())
      .then((data: {
        ok?: boolean;
        token?: string;
        serialNumber?: number;
        registeredAt?: string;
      }) => {
        if (!data.ok || !data.token || !data.registeredAt) {
          setError("등록에 실패했습니다. 잠시 후 다시 시도해 주세요.");
          setSubmitting(false);
          return;
        }
        write(tagId, { token: data.token, registeredAt: data.registeredAt });
        setSerialNumber(data.serialNumber ?? serialNumber);
        setOwnership({ registeredAt: data.registeredAt });
        setSubmitting(false);
        setStage("registered");
      })
      .catch(() => {
        setError("등록에 실패했습니다. 연결을 확인해 주세요.");
        setSubmitting(false);
      });
  }, [tagId, submitting, serialNumber]);

  // 등록 완료 화면은 잠깐 보여 주고 메인으로 넘깁니다
  useEffect(() => {
    if (stage !== "registered") return;
    const t = setTimeout(() => {
      replaceHistory();
      setStage("main");
    }, 2000);
    return () => clearTimeout(t);
  }, [stage]);

  /** 시연용 — 저장된 토큰을 지우고 처음 상태로 되돌립니다 */
  const reset = useCallback(() => {
    if (tagId) {
      try {
        window.localStorage.removeItem(STORAGE_PREFIX + tagId);
      } catch {
        // 무시
      }
    }
    setOwnership(null);
    setError(null);
    setStage(tagId ? "register" : "invalid");
  }, [tagId]);

  return {
    stage,
    tagId,
    serialNumber,
    ownership,
    submitting,
    error,
    register,
    reset,
  };
}
