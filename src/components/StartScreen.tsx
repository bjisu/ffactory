"use client";

import { artist, keyring } from "@/lib/content";

/**
 * 첫 진입 화면. 배경 사진은 TagBackground가 page.tsx에서 함께 그립니다.
 *
 * 배경 이미지는 하단에 붙어 가로 폭에 맞춰 들어가므로, 위에 남는 빈 공간의
 * 높이는 화면 높이에 따라 달라집니다. 여기서도 배경과 똑같은 비율로 영역을
 * 나눠서, 어떤 화면 높이에서도 로고가 그 빈 공간 안에 머물게 합니다.
 */
export default function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      {/* 이미지 위 빈 공간과 같은 높이. 그 안에서 로고를 가운데 정렬합니다 */}
      <div className="flex min-h-0 flex-1 items-center justify-center px-8">
        <header className="rise text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artist.logo}
            alt={artist.name}
            className="mx-auto h-auto w-[252px]"
          />
          <p className="mt-4 text-[12.5px] tracking-[0.18em] text-chalk/75">
            {keyring.edition}
          </p>
        </header>
      </div>

      {/* 배경 이미지가 차지하는 영역. 비율은 bg.jpg(2100x2232)와 같아야
          로고가 놓이는 위쪽 빈 공간의 높이가 배경과 정확히 맞습니다.
          이미지를 교체하면 이 비율도 함께 바꿔야 합니다.
          이 안 하단에 검정 그라데이션을 깔고 문구와 버튼을 얹습니다 */}
      <div className="relative w-full shrink-0 aspect-[2100/2232]">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/85 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 px-8 pb-14">
          <p
            className="rise text-center text-[13px] leading-relaxed text-chalk/85"
            style={{
              animationDelay: "0.15s",
              textShadow:
                "0 1px 3px rgba(0,0,0,0.9), 0 2px 14px rgba(0,0,0,0.85)",
            }}
          >
            키링을 휴대폰 뒷면에 대면
            <br />
            정품 확인과 함께 비공개 콘텐츠가 열립니다
          </p>
          {/* rise와 glow는 둘 다 animation 속성을 쓰므로 한 요소에 겹칠 수 없습니다.
              바깥에서 떠오르게 하고, 버튼에는 빛만 겁니다. */}
          <div className="rise mt-7" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={onStart}
              className="glow w-full rounded-full bg-rose py-4 text-[15px] font-semibold text-ink transition active:scale-[0.985]"
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
