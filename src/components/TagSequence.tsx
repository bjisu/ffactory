"use client";

import { useEffect, useState } from "react";
import { artist, keyring, tagBackground } from "@/lib/content";

type Phase = "reading" | "verified";

export default function TagSequence({ onRegister }: { onRegister: () => void }) {
  const [phase, setPhase] = useState<Phase>("reading");
  /** 파일이 없거나 경로가 틀리면 배경 없이 검정으로 돌아갑니다 */
  const [bgBroken, setBgBroken] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPhase("verified"), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    // 배경은 두 화면 바깥에 한 번만 두어, 단계가 바뀌어도 이미지가
    // 다시 마운트되지 않고 그대로 이어집니다
    <div className="relative flex min-h-0 flex-1 flex-col">
      {tagBackground && !bgBroken && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tagBackground}
            alt=""
            aria-hidden
            onError={() => setBgBroken(true)}
            // scale-105는 블러 때문에 가장자리가 비치는 것을 가립니다
            className="absolute inset-0 h-full w-full scale-105 object-cover transition-[filter] duration-700"
            style={{ filter: `blur(${phase === "verified" ? 3 : 1.5}px)` }}
          />
          {/* 기본 딤 — 인식 화면은 사진을 살리고, 정보량이 많은 인증 화면은 진하게 */}
          <div
            className="absolute inset-0 bg-black transition-opacity duration-700"
            style={{ opacity: phase === "verified" ? 0.84 : 0.45 }}
          />
          {/* 아래로 갈수록 진해지는 그라데이션. 인식 화면에서는 약하게 걸어
              사진 중앙부를 살리고 텍스트가 놓이는 아래쪽만 눌러 줍니다 */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/92 transition-opacity duration-700"
            style={{ opacity: phase === "verified" ? 1 : 0.45 }}
          />
        </div>
      )}

      <div className="relative flex min-h-0 flex-1 flex-col">
        {phase === "reading" ? <Reading /> : <Verified onRegister={onRegister} />}
      </div>
    </div>
  );
}

function Reading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-7 px-8">
      {/* 파동은 기존 128px의 60% 크기입니다 */}
      <div className="relative grid h-[77px] w-[77px] place-items-center">
        {[0, 0.5, 1].map((delay) => (
          <span
            key={delay}
            className="ring-pulse absolute h-[77px] w-[77px] rounded-full border border-rose/85"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6 text-rose"
          aria-hidden
        >
          <path
            d="M4 8.5C6.2 10 6.2 14 4 15.5M8.5 6C12 8.5 12 15.5 8.5 18M13 3.5C18 7 18 17 13 20.5"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {/* 배경이 밝아져도 읽히도록 글자 뒤에 그림자를 깝니다 */}
      <p
        className="text-sm tracking-wide text-chalk"
        style={{
          textShadow: "0 1px 3px rgba(0,0,0,0.9), 0 2px 14px rgba(0,0,0,0.85)",
        }}
      >
        칩을 읽고 있습니다
      </p>
    </div>
  );
}

function Verified({ onRegister }: { onRegister: () => void }) {
  const remaining = keyring.totalIssued - keyring.serialNumber;

  return (
    <div className="no-scrollbar flex min-h-0 flex-1 flex-col justify-between overflow-y-auto px-8 pt-16 pb-14">
      <div className="flex flex-1 flex-col justify-center">
        {/* 인증 확인 */}
        <div className="rise flex items-center gap-2.5">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-rose">
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                stroke="#000000"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-[15px] font-semibold text-chalk">
            정품이 확인되었습니다
          </span>
        </div>

        {/* 각인된 고유 번호 — 이 화면의 주인공 */}
        <div
          className="rise sweep relative mt-11 overflow-hidden"
          style={{ animationDelay: "0.14s" }}
        >
          <p className="text-[13px] text-mute">이 키링의 고유 번호</p>
          <p className="engrave foil mt-1 text-[72px] leading-[0.92]">
            No.{keyring.serialNumber.toLocaleString()}
          </p>
        </div>

        {/* 발행 정보 */}
        <dl
          className="rise mt-10 divide-y divide-white/8 border-y border-white/8 text-[13.5px]"
          style={{ animationDelay: "0.26s" }}
        >
          <Row label="아티스트" value={artist.name} />
          <Row label="에디션" value={keyring.edition} />
          <Row
            label="발행 수량"
            value={`${keyring.totalIssued.toLocaleString()}개 한정`}
          />
          <Row label="제조" value={keyring.manufacturedAt} />
        </dl>

        <p
          className="rise mt-5 text-[13px] leading-relaxed text-mute"
          style={{ animationDelay: "0.34s" }}
        >
          아직 {remaining.toLocaleString()}개의 키링이 주인을 기다리고 있습니다.
        </p>
      </div>

      {/* 소유 등록 */}
      <div className="rise" style={{ animationDelay: "0.42s" }}>
        <button
          onClick={onRegister}
          className="w-full rounded-full bg-rose py-4 text-[15px] font-semibold text-ink transition active:scale-[0.985]"
        >
          내 키링으로 등록하기
        </button>
        <p className="mt-3 text-center text-[12px] text-mute">
          등록하면 비공개 콘텐츠가 열립니다
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <dt className="text-mute">{label}</dt>
      <dd className="font-medium text-chalk">{value}</dd>
    </div>
  );
}
