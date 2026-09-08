"use client";

import PhoneFrame from "@/components/PhoneFrame";
import StartScreen from "@/components/StartScreen";
import TagBackground from "@/components/TagBackground";
import RegisteredScreen from "@/components/RegisteredScreen";
import InvalidTagScreen from "@/components/InvalidTagScreen";
import MainView from "@/components/MainView";
import { useTagSession } from "@/lib/useTagSession";

export default function Page() {
  const session = useTagSession();

  // 배경 사진은 등록 전후 화면에서만 씁니다. 메인은 스크롤 콘텐츠라 검정 배경입니다.
  const showBackground =
    session.stage === "register" || session.stage === "registered";

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

          {session.stage === "register" ? (
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
      <button
        onClick={session.reset}
        // fixed라 콘텐츠 열이 아니라 화면 오른쪽 아래 구석에 붙습니다
        className="fixed bottom-3 right-3 z-30 rounded-full border border-white/10 bg-black/55 px-3.5 py-1.5 text-[11px] text-mute backdrop-blur"
      >
        처음부터 다시 시연
      </button>
    </PhoneFrame>
  );
}
