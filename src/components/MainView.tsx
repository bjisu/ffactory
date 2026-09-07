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
  const days = daysTogether(ownership.registeredAt);
  const photo = privatePhotos.find((p) => p.id === openPhoto) ?? null;

  return (
    <>
      <div className="flex-1 overflow-y-auto px-6 pt-5 pb-10">
        {/* 소유 배지 */}
        <div className="flex items-center justify-between rounded-full border border-white/8 bg-ink-2 py-2.5 pl-4 pr-3.5">
          <span className="engrave foil text-[14px]">
            No.{keyring.serialNumber.toLocaleString()}
          </span>
          <span className="text-[12.5px] text-mute">
            {days === 0 ? "오늘부터 함께" : `함께한 지 ${days}일`}
          </span>
        </div>

        {/* 워드마크 */}
        <header className="mt-9">
          <h1 className="text-[46px] font-extrabold leading-[0.86] tracking-[-0.045em] text-chalk">
            {artist.wordmarkTop}
            <br />
            <span className="text-rose">{artist.wordmarkBottom}</span>
          </h1>
          <p className="mt-3.5 text-[12.5px] text-mute">
            {keyring.productName} · {keyring.edition}
          </p>
        </header>

        {/* 뮤직비디오 */}
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

        {/* 비공개 포토 */}
        <section className="mt-11">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[17px] font-semibold tracking-tight text-chalk">
              비공개 포토
            </h2>
            <span className="text-[12px] text-rose">키링 소유자만</span>
          </div>
          <p className="mt-1.5 text-[12.5px] text-mute">
            {formatDate(ownership.registeredAt)}에 열렸습니다
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {privatePhotos.map((p) => (
              <button
                key={p.id}
                onClick={() => setOpenPhoto(p.id)}
                className="group overflow-hidden rounded-2xl border border-white/8 text-left"
              >
                <div className="grain relative aspect-[3/4]">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.caption}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="absolute bottom-2.5 left-2.5 rounded-full bg-black/45 px-2 py-0.5 text-[10.5px] text-chalk/70">
                      샘플
                    </span>
                  )}
                </div>
                <p className="px-3 pb-3 pt-2.5 text-[12.5px] leading-snug text-chalk/85">
                  {p.caption}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* 공식 SNS */}
        <section className="mt-11">
          <h2 className="text-[17px] font-semibold tracking-tight text-chalk">
            공식 채널
          </h2>
          <div className="mt-4 flex flex-col gap-2.5">
            {socialLinks.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-ink-2 px-5 py-4 transition active:scale-[0.99]"
              >
                <span className="text-[14.5px] font-medium text-chalk">
                  {s.label}
                </span>
                <span className="text-[12.5px] text-mute">{s.handle}</span>
              </a>
            ))}
          </div>
        </section>

        {/* 공식 스토어 */}
        <section className="mt-11">
          <a
            href={store.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-3xl border border-rose/30 bg-rose-deep/22 px-6 py-6 transition active:scale-[0.99]"
          >
            <p className="text-[12px] text-rose">{store.note}</p>
            <p className="mt-2 text-[19px] font-bold tracking-tight text-chalk">
              {store.label}
            </p>
            <p className="mt-1 text-[12.5px] text-chalk/65">{store.name}</p>
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
          <div className="grain mt-4 flex-1 overflow-hidden rounded-3xl border border-white/10">
            {photo.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo.image}
                alt={photo.caption}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <p className="mt-5 text-[15px] font-medium text-chalk">
            {photo.caption}
          </p>
          <p className="mt-1 text-[12.5px] text-mute">{photo.date}</p>
        </div>
      )}
    </>
  );
}
