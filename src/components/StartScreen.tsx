"use client";

import { artist, keyring } from "@/lib/content";

/**
 * 첫 진입 화면. 배경 사진은 TagBackground가 page.tsx에서 화면 전체에 깝니다.
 *
 * 스크림도 배경과 같이 fixed로 화면 전체 폭을 덮습니다. 콘텐츠 열(max-w-400)
 * 안에만 두면 태블릿·데스크톱에서 사진 위에 좁은 검은 띠만 생깁니다.
 * 글자와 버튼은 z-10으로 배경 위에 올립니다.
 */
export default function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <>
      {/* 로고가 놓이는 위쪽 */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[30vh] bg-gradient-to-b from-black/75 via-black/35 to-transparent" />
      {/* 문구와 버튼이 놓이는 아래쪽 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[45vh] bg-gradient-to-t from-black via-black/80 to-transparent" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-between px-8 pb-10 pt-10 [@media(min-height:760px)]:pb-14 [@media(min-height:760px)]:pt-16">
        <header className="rise text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artist.logo}
            alt={artist.name}
            // 화면이 짧으면 로고와 간격을 함께 줄입니다
            className="mx-auto h-auto w-[186px] [@media(min-height:760px)]:w-[252px]"
          />
          <p className="mt-3 text-[11px] tracking-[0.16em] text-chalk/75 [@media(min-height:760px)]:mt-4 [@media(min-height:760px)]:text-[12.5px] [@media(min-height:760px)]:tracking-[0.18em]">
            {keyring.edition}
          </p>
        </header>

        <div>
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
          <div
            className="rise mt-5 [@media(min-height:760px)]:mt-7"
            style={{ animationDelay: "0.3s" }}
          >
            <button
              onClick={onStart}
              className="glow w-full rounded-full bg-rose py-4 text-[15px] font-semibold text-ink transition active:scale-[0.985]"
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
