"use client";

import { useState } from "react";
import { tagBackground } from "@/lib/content";

/**
 * 시작 화면과 칩 인식 화면이 공유하는 배경입니다.
 * 화면별로 컴포넌트를 나누면 단계가 바뀔 때 img가 다시 마운트되어 깜빡이므로,
 * 이 컴포넌트를 두 화면 바깥(page.tsx)에 한 번만 두고 값만 바꿉니다.
 */
/**
 * 배경 확대 배율. 원본은 세로로 길고 위쪽이 빈 벽이라 그대로 깔면 상단이
 * 비어 보입니다. 아래를 기준으로 확대해 인물을 화면 가운데로 올립니다.
 * globals.css의 bg-settle 키프레임 끝 값과 반드시 같아야 합니다.
 */
const BG_SCALE = 1.35;

export default function TagBackground({
  dim,
  blur,
  gradient,
  intro = false,
}: {
  /** 검정 딤 레이어 불투명도 (0~1) */
  dim: number;
  /** 배경 블러 세기 (px) */
  blur: number;
  /** 아래로 갈수록 진해지는 그라데이션의 불투명도 (0~1) */
  gradient: number;
  /** 첫 화면에서 한 번만 재생하는 확대 → 제자리 연출 */
  intro?: boolean;
}) {
  /** 파일이 없거나 경로가 틀리면 배경 없이 검정으로 돌아갑니다 */
  const [broken, setBroken] = useState(false);
  /**
   * 마운트 시점의 값으로 고정합니다. 연출이 끝나기 전에 다음 화면으로 넘어가면
   * 클래스가 사라지면서 배율이 튀기 때문에, 단계가 바뀌어도 유지합니다.
   */
  const [playIntro] = useState(intro);

  if (!tagBackground || broken) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tagBackground}
        alt=""
        aria-hidden
        onError={() => setBroken(true)}
        className={`absolute inset-0 h-full w-full origin-bottom object-cover transition-[filter] duration-700 ${
          playIntro ? "bg-settle" : ""
        }`}
        style={{ filter: `blur(${blur}px)`, transform: `scale(${BG_SCALE})` }}
      />
      <div
        className="absolute inset-0 bg-black transition-opacity duration-700"
        style={{ opacity: dim }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/92 transition-opacity duration-700"
        style={{ opacity: gradient }}
      />
    </div>
  );
}
