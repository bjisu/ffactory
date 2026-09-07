"use client";

import { useEffect, useRef, useState } from "react";
import { artist, keyring, welcomeMessage } from "@/lib/content";

/** 파형 막대 높이 — 고정값이라 매 렌더 동일하게 그려집니다 */
const BARS = [
  18, 34, 26, 52, 70, 44, 88, 62, 96, 74, 40, 58, 82, 50, 30, 66, 92, 46, 24,
  60, 78, 36, 54, 86, 42, 28, 68, 48, 90, 32, 56, 72, 38, 64, 22, 80, 46, 30,
];

const PLAY_MS = 7000;

export default function WelcomeMessage({ onDone }: { onDone: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!playing) return;

    // 실제 음성 파일이 있으면 재생하고, 없으면 시간만 흐르게 합니다
    if (welcomeMessage.audioSrc) {
      audio.current = new Audio(welcomeMessage.audioSrc);
      void audio.current.play().catch(() => {});
    }

    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / PLAY_MS);
      setProgress(p);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      audio.current?.pause();
    };
  }, [playing]);

  const played = progress > 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto px-8 pt-16 pb-10">
      <div className="flex flex-1 flex-col justify-center">
        <p className="text-[13px] text-mute">
          No.{keyring.serialNumber.toLocaleString()} 등록 완료
        </p>
        <h1 className="mt-3 text-[26px] font-semibold leading-snug tracking-tight text-chalk">
          {artist.nameKo}가 남긴
          <br />
          인사가 도착했습니다
        </h1>

        {/* 재생기 */}
        <div className="mt-10 rounded-3xl border border-white/8 bg-ink-2 p-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? "일시정지" : "재생"}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-rose transition active:scale-95"
            >
              {playing ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <rect x="6" y="5" width="4" height="14" rx="1" fill="#000000" />
                  <rect x="14" y="5" width="4" height="14" rx="1" fill="#000000" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" aria-hidden>
                  <path d="M7 4.5l12 7.5-12 7.5z" fill="#000000" />
                </svg>
              )}
            </button>

            {/* 파형 */}
            <div className="flex h-12 flex-1 items-center gap-[3px]">
              {BARS.map((h, i) => {
                const reached = i / BARS.length <= progress;
                return (
                  <span
                    key={i}
                    className="flex-1 rounded-full transition-colors duration-150"
                    style={{
                      height: `${Math.max(12, h)}%`,
                      background: reached
                        ? "var(--color-rose)"
                        : "rgba(255,255,255,0.16)",
                    }}
                  />
                );
              })}
            </div>

            <span className="shrink-0 text-[12px] tabular-nums text-mute">
              {welcomeMessage.duration}
            </span>
          </div>

          {!welcomeMessage.audioSrc && (
            <p className="mt-5 border-t border-white/8 pt-4 text-[12px] leading-relaxed text-mute">
              시연용 화면입니다. 실제 음성 파일을 넣으면 이 자리에서 재생됩니다.
            </p>
          )}
        </div>
      </div>

      <button
        onClick={onDone}
        className="w-full rounded-full border border-white/14 py-4 text-[15px] font-medium text-chalk transition active:scale-[0.985]"
      >
        {played ? "계속하기" : "건너뛰기"}
      </button>
    </div>
  );
}
