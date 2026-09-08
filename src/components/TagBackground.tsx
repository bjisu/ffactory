"use client";

import { useState } from "react";
import { tagBackground, tagBackgroundPortrait } from "@/lib/content";

/**
 * 시작 화면과 칩 인식 화면이 공유하는 배경입니다.
 * 화면별로 컴포넌트를 나누면 단계가 바뀔 때 img가 다시 마운트되어 깜빡이므로,
 * 이 컴포넌트를 두 화면 바깥(page.tsx)에 한 번만 두고 값만 바꿉니다.
 *
 * 위치는 fixed입니다. 콘텐츠 열은 max-w-400으로 좁기 때문에, 배경까지 그 안에
 * 두면 태블릿·데스크톱에서 좌우가 검게 비어 버립니다.
 *
 * 원본 bg.jpg는 비율 0.941이라 세로 화면(0.46~0.56)에서 cover로 덮으면 좌우가
 * 25%씩 잘려 바깥쪽 인물이 사라집니다. 그래서 세로가 긴 화면에서는 원본을
 * 세로로 확장한 bg-portrait.jpg(0.477)를 쓰고, 가로가 넓은 화면에서만
 * 원본을 씁니다.
 */
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
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <picture>
        {/* 가로가 세로보다 넓은 화면에서만 원본을 씁니다 */}
        <source media="(min-aspect-ratio: 1/1)" srcSet={tagBackground} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tagBackgroundPortrait ?? tagBackground}
          alt=""
          aria-hidden
          onError={() => setBroken(true)}
          // 세로 화면은 하단(인물) 기준. 가로 화면은 원본이 세로로 크게
          // 잘리므로 30% 지점을 기준으로 잡아야 네 명의 얼굴이 모두 들어옵니다
          className="h-full w-full object-cover object-bottom transition-[filter] duration-700 [@media(min-aspect-ratio:1/1)]:[object-position:center_30%]"
          style={{ filter: `blur(${blur}px)` }}
        />
      </picture>

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
