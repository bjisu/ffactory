"use client";

import { useState } from "react";
import {
  artist,
  keyring,
  musicVideo,
  privatePhotos,
  socialLinks,
  store,
} from "@/lib/content";
import { daysTogether, formatDate, type Ownership } from "@/lib/useOwnership";

export default function MainView({ ownership }: { ownership: Ownership }) {
  const [openPhoto, setOpenPhoto] = useState<number | null>(null);
  /** 파일이 아직 없거나 경로가 틀린 사진 — 샘플 비주얼로 되돌립니다 */
  const [brokenPhotos, setBrokenPhotos] = useState<number[]>([]);
  const days = daysTogether(ownership.registeredAt);
  const photo = privatePhotos.find((p) => p.id === openPhoto) ?? null;

  const markBroken = (id: number) =>
    setBrokenPhotos((prev) => (prev.includes(id) ? prev : [...prev, id]));
  /** 실제로 띄울 수 있는 경로만 돌려줍니다 */
  const srcOf = (p: { id: number; image: string | null }) =>
    p.image && !brokenPhotos.includes(p.id) ? p.image : null;

  return (
    <>
      {/* pb는 하단에 떠 있는 "처음부터 다시 시연" 버튼을 피하기 위한 여백입니다 */}
      <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-5 pb-20">
        {/* 소유 배지 */}
        {/* 작은 글씨에서는 foil 그라데이션이 오히려 읽기 어려워 단색을 씁니다 */}
        <div className="flex items-center justify-between rounded-full border border-white/16 bg-ink-3 py-2.5 pl-4 pr-3.5">
          <span
            className="engrave text-[15px] text-rose"
            style={{ fontWeight: 900 }}
          >
            No.{keyring.serialNumber.toLocaleString()}
          </span>
          <span className="text-[12.5px] font-medium text-chalk/85">
            {days === 0 ? "오늘부터 함께" : `함께한 지 ${days}일`}
          </span>
        </div>

        {/* 워드마크 */}
        <header className="mt-9">
          {/* 가로 폭만 지정하고 높이는 h-auto로 두어 원본 비율을 유지합니다 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artist.logo}
            alt={artist.name}
            className="h-auto w-[252px]"
          />
          <p className="mt-4 text-[12.5px] text-mute">
            {keyring.productName} · {keyring.edition}
          </p>
        </header>

        {/* 뮤직비디오 — youtubeId가 있으면 실제 영상, 없으면 샘플 비주얼 */}
        {musicVideo.youtubeId ? (
          <div className="mt-8 overflow-hidden rounded-3xl border border-white/8 bg-ink-2">
            {/* 카드 상단 모서리에 맞춰 iframe을 잘라냅니다 */}
            <div className="relative aspect-video overflow-hidden rounded-t-3xl">
              <iframe
                src={`https://www.youtube.com/embed/${musicVideo.youtubeId}`}
                title={musicVideo.title}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex items-end justify-between px-5 py-4">
              <div>
                <p className="text-[11.5px] text-chalk/60">{musicVideo.label}</p>
                <p className="mt-1 text-[21px] font-bold tracking-tight text-chalk">
                  {musicVideo.title}
                </p>
              </div>
              <span className="text-[11.5px] tabular-nums text-chalk/60">
                {musicVideo.runtime}
              </span>
            </div>
          </div>
        ) : (
          <a
            href={musicVideo.url}
            target="_blank"
            rel="noreferrer"
            className="grain group mt-8 block overflow-hidden rounded-3xl border border-white/8"
          >
            <div className="relative flex h-52 items-end p-5">
              <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-chalk/95 transition group-active:scale-92">
                <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5" aria-hidden>
                  <path d="M7 4.5l12 7.5-12 7.5z" fill="#000000" />
                </svg>
              </span>
              <div>
                <p className="text-[11.5px] text-chalk/60">{musicVideo.label}</p>
                <p className="mt-1 text-[21px] font-bold tracking-tight text-chalk">
                  {musicVideo.title}
                </p>
              </div>
              <span className="absolute right-5 bottom-5 text-[11.5px] tabular-nums text-chalk/60">
                {musicVideo.runtime}
              </span>
            </div>
          </a>
        )}

        {/* 비공개 포토 */}
        <section className="mt-11">
          <h2 className="text-[17px] font-semibold tracking-tight text-chalk">
            비공개 포토
          </h2>
          <p className="mt-1.5 text-[12.5px] text-mute">
            {formatDate(ownership.registeredAt)}에 열렸습니다
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {privatePhotos.map((p) => (
              <button
                key={p.id}
                onClick={() => setOpenPhoto(p.id)}
                // flex-col이 없으면 브라우저가 버튼 내용을 세로 중앙에 두어
                // 캡션 줄 수가 다른 카드끼리 사진 높이가 어긋납니다
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 text-left"
              >
                {/* 사진이 없으면 grain 비주얼만 남습니다 */}
                <div className="grain relative aspect-square">
                  {srcOf(p) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={srcOf(p)!}
                      alt={p.caption}
                      onError={() => markBroken(p.id)}
                      style={{ objectPosition: p.objectPosition ?? "center" }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>
                <p className="px-3 pb-3 pt-2.5 text-[12.5px] leading-snug text-chalk/85">
                  {p.caption}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* 공식 채널 + 스토어 — 아이콘만 가로 한 줄 */}
        <section className="mt-11 flex items-center justify-center gap-5">
          {socialLinks.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="grid h-13 w-13 place-items-center rounded-full border border-white/14 text-chalk transition active:scale-92"
            >
              <SocialIcon id={s.id} />
            </a>
          ))}
          {/* 스토어는 구매 동선이라 분홍 채움으로 구분합니다 */}
          <a
            href={store.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${store.label} ${store.name}`}
            className="grid h-13 w-13 place-items-center rounded-full bg-rose text-ink transition active:scale-92"
          >
            <SocialIcon id="store" />
          </a>
        </section>
      </div>

      {/* 포토 상세 */}
      {photo && (
        <div
          className="absolute inset-0 z-20 flex flex-col bg-black/92 px-6 pb-10 pt-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setOpenPhoto(null)}
            className="self-end text-[13px] text-mute"
          >
            닫기
          </button>
          {/* 사진과 설명을 한 덩어리로 묶어 화면 세로 중앙에 둡니다 */}
          <div className="flex flex-1 flex-col justify-center">
            <div className="grain relative aspect-square overflow-hidden rounded-3xl border border-white/10">
              {srcOf(photo) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={srcOf(photo)!}
                  alt={photo.caption}
                  onError={() => markBroken(photo.id)}
                  style={{ objectPosition: photo.objectPosition ?? "center" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </div>
            <p className="mt-5 text-[15px] font-medium text-chalk">
              {photo.caption}
            </p>
            <p className="mt-1 text-[12.5px] text-mute">{photo.date}</p>
          </div>
        </div>
      )}
    </>
  );
}

/** 공식 채널 아이콘 — 외부 라이브러리 없이 직접 그립니다 */
function SocialIcon({ id }: { id: "youtube" | "instagram" | "store" }) {
  if (id === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" aria-hidden>
        <path
          fill="currentColor"
          d="M22.6 7.2a2.8 2.8 0 0 0-1.9-2C19 4.7 12 4.7 12 4.7s-7 0-8.7.5a2.8 2.8 0 0 0-1.9 2C1 8.9 1 12 1 12s0 3.1.4 4.8a2.8 2.8 0 0 0 1.9 2c1.7.4 8.7.4 8.7.4s7 0 8.7-.4a2.8 2.8 0 0 0 1.9-2c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8z"
        />
        <path fill="#000000" d="M9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
      </svg>
    );
  }

  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" aria-hidden>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
        />
        <circle
          cx="12"
          cy="12"
          r="4.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
        />
        <circle cx="17.2" cy="6.8" r="1.25" fill="currentColor" />
      </svg>
    );
  }

  // 쇼핑백
  return (
    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" aria-hidden>
      <path
        d="M4.6 8.2h14.8l-1.1 11.1a1.7 1.7 0 0 1-1.7 1.5H7.4a1.7 1.7 0 0 1-1.7-1.5L4.6 8.2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M8.9 10.4V7.1a3.1 3.1 0 0 1 6.2 0v3.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}
