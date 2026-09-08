"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type NfcStatus =
  | "idle"
  /** scan() 호출됨 — OS 스캔 팝업이 떠 있는 상태 */
  | "scanning"
  /** Web NFC 미지원 브라우저 (iOS Safari, 데스크톱 등) */
  | "unsupported"
  /** 사용자가 권한을 거부함 */
  | "denied"
  /** 그 밖의 실패 (NFC 꺼짐 등) */
  | "error";

/**
 * Web NFC는 아직 표준 DOM 타입에 없어서 필요한 만큼만 선언합니다.
 * https://developer.mozilla.org/docs/Web/API/NDEFReader
 */
type NDEFReaderLike = {
  scan: (options?: { signal?: AbortSignal }) => Promise<void>;
};

declare global {
  interface Window {
    NDEFReader?: new () => NDEFReaderLike;
  }
}

/**
 * OS NFC 스캔 팝업을 띄웁니다.
 *
 * scan()은 사용자 제스처가 있어야 호출할 수 있으므로, start()는 반드시
 * 탭 핸들러 안에서 직접 불러야 합니다. 화면이 바뀐 뒤 effect에서 부르면
 * 제스처가 만료되어 권한 요청이 막힐 수 있습니다.
 *
 * 미지원·거부·실패 어느 경우에도 예외를 밖으로 던지지 않습니다.
 * 호출 측은 status만 보고 안내 문구를 바꾸면 됩니다.
 */
export function useNfcScan() {
  const [status, setStatus] = useState<NfcStatus>("idle");
  const abortRef = useRef<AbortController | null>(null);

  // 화면을 벗어나면 스캔을 멈춥니다
  useEffect(() => () => abortRef.current?.abort(), []);

  const start = useCallback(() => {
    if (typeof window === "undefined" || !window.NDEFReader) {
      setStatus("unsupported");
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setStatus("scanning");

    try {
      const reader = new window.NDEFReader();
      reader.scan({ signal: controller.signal }).catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const name = err instanceof Error ? err.name : "";
        setStatus(name === "NotAllowedError" ? "denied" : "error");
      });
    } catch {
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus("idle");
  }, []);

  return { status, start, reset };
}
