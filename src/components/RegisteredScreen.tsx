"use client";

import { keyring } from "@/lib/content";

/**
 * 등록 완료 화면. 잠깐만 보여 주고 useTagSession이 메인으로 넘깁니다.
 * 버튼이 없는 것은 의도이며, 이 화면은 히스토리에 남지 않습니다.
 */
export default function RegisteredScreen({
  serialNumber,
}: {
  serialNumber: number | null;
}) {
  return (
    <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-5 px-8">
      <span className="rise grid h-12 w-12 place-items-center rounded-full bg-rose">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="#000000"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <div className="rise text-center" style={{ animationDelay: "0.12s" }}>
        <p className="text-[19px] font-semibold tracking-tight text-chalk">
          등록이 완료되었습니다
        </p>
        {serialNumber !== null && (
          <p
            className="engrave mt-2 text-[15px] text-rose"
            style={{ fontWeight: 900 }}
          >
            No.{serialNumber.toLocaleString()}
          </p>
        )}
        <p className="mt-3 text-[12.5px] text-mute">
          {keyring.edition} · 비공개 콘텐츠가 열립니다
        </p>
      </div>
    </div>
  );
}
