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
      {/* 이미지를 하단에 붙이고 가로 전체를 보여 줍니다. 위에 남는 공간은
          flex-1 채움이 정확히 메우므로 이음매 위치가 화면 높이와 무관하게
          항상 맞습니다. 채움의 끝 색은 이미지 상단 색(#fff)과 같습니다. */}
      {/* 블러는 채움과 이미지를 함께 감싼 이 층에 겁니다. 이미지에만 걸면
          이미지 위쪽 가장자리가 투명하게 번져 이음매에 선이 생깁니다.
          블러가 걸릴 때만 살짝 확대해 번진 바깥 테두리를 화면 밖으로 밀어냅니다.
          블러가 0인 시작 화면은 확대도 하지 않으므로, StartScreen이 같은
          비율로 계산한 이미지 영역과 이음매 위치가 정확히 일치합니다. */}
      <div
        className="absolute inset-0 flex flex-col justify-end transition-[filter] duration-700"
        style={{
          filter: `blur(${blur}px)`,
          transform: `scale(${blur > 0 ? BG_SCALE * 1.05 : BG_SCALE})`,
        }}
      >
        <div
          className="min-h-0 flex-1"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #000000 0%, #000000 55%, #ffffff 100%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tagBackground}
          alt=""
          aria-hidden
          onError={() => setBroken(true)}
          className="w-full shrink-0 object-contain object-bottom"
        />
      </div>
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
