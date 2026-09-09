"use client";

import { useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import StartScreen from "@/components/StartScreen";
import TagBackground from "@/components/TagBackground";
import RegisteredScreen from "@/components/RegisteredScreen";
import AlreadyRegisteredScreen from "@/components/AlreadyRegisteredScreen";
import InvalidTagScreen from "@/components/InvalidTagScreen";
import MainView from "@/components/MainView";
import { useTagSession } from "@/lib/useTagSession";
import { demoAlreadyRegistered } from "@/lib/content";

export default function Page() {
  const session = useTagSession();
  /**
   * 시연용 — 이미 다른 사람이 등록한 키링을 태그한 상황을 흉내 냅니다.
   * 켜져 있으면 어느 단계에 있든 안내 화면으로 고정해, 미팅에서 두 경우를
   * 바로 번갈아 보여 줄 수 있습니다.
   */
  const [alreadyRegistered, setAlreadyRegistered] = useState(
    demoAlreadyRegistered
  );

  const isEntryScreen =
    session.stage === "register" || session.stage === "registered";
  // 안내 화면도 배경 사진 위에 올립니다
  const showBackground = isEntryScreen || alreadyRegistered;

  return (
    <PhoneFrame>
      {session.stage === "loading" ? (
        // 검증이 끝나기 전에는 아무것도 그리지 않습니다 (화면 깜빡임 방지)
        <div className="flex-1" />
      ) : session.stage === "invalid" ? (
        <InvalidTagScreen reason={session.tagId ? "unknown" : "missing"} />
      ) : (
        <>
          {showBackground && <TagBackground dim={0} blur={0} gradient={0} />}

          {alreadyRegistered ? (
            <AlreadyRegisteredScreen serialNumber={session.serialNumber} />
          ) : session.stage === "register" ? (
            <StartScreen
              onStart={session.register}
              submitting={session.submitting}
              error={session.error}
            />
          ) : session.stage === "registered" ? (
            <RegisteredScreen serialNumber={session.serialNumber} />
          ) : session.ownership ? (
            <MainView
              ownership={session.ownership}
              serialNumber={session.serialNumber}
            />
          ) : null}
        </>
      )}

      {/* 시연용 컨트롤 — 실제 서비스에는 들어가지 않습니다 */}
      <div className="fixed bottom-3 right-3 z-30 flex gap-2">
        <button
          onClick={() => setAlreadyRegistered((v) => !v)}
          className={`rounded-full border px-3.5 py-1.5 text-[11px] backdrop-blur transition ${
            alreadyRegistered
              ? "border-rose/60 bg-rose/20 text-rose"
              : "border-white/10 bg-black/55 text-mute"
          }`}
        >
          {alreadyRegistered ? "등록된 키링 ON" : "등록된 키링 OFF"}
        </button>
        <button
          onClick={() => {
            setAlreadyRegistered(false);
            session.reset();
          }}
          className="rounded-full border border-white/10 bg-black/55 px-3.5 py-1.5 text-[11px] text-mute backdrop-blur"
        >
          처음부터 다시 시연
        </button>
      </div>
    </PhoneFrame>
  );
}
