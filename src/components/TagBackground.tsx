"use client";

import { useState } from "react";
import { tagBackground } from "@/lib/content";

/**
 * 시작 화면과 칩 인식 화면이 공유하는 배경입니다.
 * 화면별로 컴포넌트를 나누면 단계가 바뀔 때 img가 다시 마운트되어 깜빡이므로,
 * 이 컴포넌트를 두 화면 바깥(page.tsx)에 한 번만 두고 값만 바꿉니다.
 */

/**
 * 배경 확대 배율. 현재 배경(bg.jpg, 2100x2800)은 object-cover만으로 화면을
 * 채우고 인물도 잘리지 않아 확대가 필요 없습니다. 확대하면 좌우가 더 잘려
 * 바깥쪽 인물이 사라집니다.
 */
const BG_SCALE = 1;

export default function TagBackground({
  dim,
  blur,
  gradient,
}: {
  /** 검정 딤 레이어 불투명도 (0~1) */
  dim: number;
  /** 배경 블러 세기 (px) */
  blur: number;
  /** 아래로 갈수록 진해지는 그라데이션의 불투명도 (0~1) */
  gradient: number;
}) {
  /** 파일이 없거나 경로가 틀리면 배경 없이 검정으로 돌아갑니다 */
  const [broken, setBroken] = useState(false);

  if (!tagBackground || broken) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tagBackground}
        alt=""
        aria-hidden
        onError={() => setBroken(true)}
        className="absolute inset-0 h-full w-full origin-bottom object-cover transition-[filter] duration-700"
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
