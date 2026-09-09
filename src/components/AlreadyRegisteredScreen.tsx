"use client";

import { demoRegistration, keyring, store } from "@/lib/content";

/**
 * 이미 다른 사람이 등록한 키링을 태그했을 때의 화면.
 *
 * 핵심은 "가짜"가 아니라 "이미 주인이 있는 진품"이라는 점이라, 정품 확인
 * 표시는 그대로 두고 등록 여부만 다르게 안내합니다.
 * 등록 버튼이 없으므로 비공개 포토와 메인으로는 넘어갈 수 없습니다.
 */
export default function AlreadyRegisteredScreen({
  serialNumber,
}: {
  serialNumber: number | null;
}) {
  const serial = serialNumber ?? keyring.serialNumber;

  return (
    <>
      {/* 배경 위에서 글자가 읽히도록 화면 전체 폭을 덮습니다 */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[30vh] bg-gradient-to-b from-black/75 via-black/35 to-transparent" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[55vh] bg-gradient-to-t from-black via-black/85 to-transparent" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-between px-8 pb-10 pt-10 [@media(min-height:760px)]:pb-14 [@media(min-height:760px)]:pt-16">
        {/* 정품 확인은 그대로 — 진품이 맞다는 것이 먼저입니다 */}
        <div className="rise flex items-center gap-2.5">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose">
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

        <div>
          <div className="rise" style={{ animationDelay: "0.12s" }}>
            <p className="text-[13px] text-chalk/70">이 키링의 고유 번호</p>
            <p
              className="engrave mt-1 text-[56px] leading-[0.95] text-rose"
              style={{ fontWeight: 900 }}
            >
              No.{serial.toLocaleString()}
            </p>
            <p className="mt-4 text-[15px] font-medium text-chalk">
              이미 등록된 키링입니다
            </p>
          </div>

          <dl
            className="rise mt-5 divide-y divide-white/10 border-y border-white/10 text-[13.5px]"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center justify-between py-3">
              <dt className="text-chalk/60">등록일</dt>
              <dd className="font-medium text-chalk">
                {demoRegistration.registeredAt}
              </dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-chalk/60">함께한 기간</dt>
              <dd className="font-medium text-chalk">
                {demoRegistration.daysTogether}일째
              </dd>
            </div>
          </dl>

          <div className="rise mt-6" style={{ animationDelay: "0.28s" }}>
            <p
              className="text-center text-[13px] leading-relaxed text-chalk/85"
              style={{
                textShadow:
                  "0 1px 3px rgba(0,0,0,0.9), 0 2px 14px rgba(0,0,0,0.85)",
              }}
            >
              비공개 콘텐츠는 소유자만 볼 수 있습니다.
              <br />내 키링을 등록하면 같은 콘텐츠가 열립니다.
            </p>
            <a
              href={store.url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 block w-full rounded-full border border-rose/50 py-4 text-center text-[15px] font-semibold text-rose transition active:scale-[0.985]"
            >
              {store.label}에서 구매하기
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
