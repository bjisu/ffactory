"use client";

import { artist, keyring } from "@/lib/content";

/**
 * 첫 진입 화면. 배경 사진은 TagBackground가 page.tsx에서 함께 그립니다.
 * 여기서는 로고 뒤와 버튼 영역만 눌러 주는 스크림과 등장 연출을 얹습니다.
 */
export default function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col justify-between px-8 pb-14 pt-14">
      {/* 상단은 로고가 읽힐 최소한만. 중앙부는 딤 없이 사진 그대로 둡니다 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/55 to-transparent" />
      {/* 하단은 버튼과 문구가 확실히 읽히도록 진하게 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <header className="rise relative text-center">
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

      <div className="relative">
        <p
          className="rise text-center text-[13px] leading-relaxed text-chalk/85"
          style={{
            animationDelay: "0.15s",
            textShadow: "0 1px 3px rgba(0,0,0,0.9), 0 2px 14px rgba(0,0,0,0.85)",
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
  );
}
