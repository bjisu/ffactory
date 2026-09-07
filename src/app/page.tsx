"use client";

import { useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import TagSequence from "@/components/TagSequence";
import WelcomeMessage from "@/components/WelcomeMessage";
import MainView from "@/components/MainView";
import { useOwnership } from "@/lib/useOwnership";

export default function Page() {
  const { ownership, loading, register, reset } = useOwnership();
  /** 등록 직후 한 번만 보여주는 인사 메시지 화면 */
  const [showWelcome, setShowWelcome] = useState(false);

  const handleRegister = () => {
    register();
    setShowWelcome(true);
  };

  const handleReset = () => {
    reset();
    setShowWelcome(false);
  };

  return (
    <PhoneFrame>
      {loading ? (
        <div className="flex-1" />
      ) : !ownership ? (
        <TagSequence onRegister={handleRegister} />
      ) : showWelcome ? (
        <WelcomeMessage onDone={() => setShowWelcome(false)} />
      ) : (
        <MainView ownership={ownership} />
      )}

      {/* 시연용 컨트롤 — 실제 서비스에는 들어가지 않습니다 */}
      <button
        onClick={handleReset}
        className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/10 bg-black/55 px-3.5 py-1.5 text-[11px] text-mute backdrop-blur"
      >
        처음부터 다시 시연
      </button>
    </PhoneFrame>
  );
}
