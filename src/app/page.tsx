"use client";

import { useCallback, useState } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import StartScreen from "@/components/StartScreen";
import TagBackground from "@/components/TagBackground";
import TagSequence, { type TagPhase } from "@/components/TagSequence";
import WelcomeMessage from "@/components/WelcomeMessage";
import MainView from "@/components/MainView";
import { useOwnership } from "@/lib/useOwnership";

/** 미등록 상태에서 거치는 단계 */
type Stage = "start" | "tag";

export default function Page() {
  const { ownership, loading, register, reset } = useOwnership();
  const [stage, setStage] = useState<Stage>("start");
  const [tagPhase, setTagPhase] = useState<TagPhase>("reading");
  /** 등록 직후 한 번만 보여주는 인사 메시지 화면 */
  const [showWelcome, setShowWelcome] = useState(false);

  const handleRegister = () => {
    register();
    setShowWelcome(true);
  };

  const handleReset = () => {
    reset();
    setShowWelcome(false);
    setStage("start");
    setTagPhase("reading");
  };

  // TagSequence의 의존성 배열에 들어가므로 매 렌더마다 새로 만들지 않습니다
  const handlePhaseChange = useCallback((p: TagPhase) => setTagPhase(p), []);

  // 시작 화면은 사진이 주인공이라 전체 딤과 블러를 아예 걷습니다.
  // 로고 뒤와 버튼 영역만 StartScreen이 스크림으로 눌러 줍니다.
  // 배경 사진이 밝아(상단이 흰색) 어두운 사진 기준의 딤으로는 분홍 파형과
  // 흰 글씨가 묻힙니다. 인식·인증 화면의 딤을 그에 맞춰 올렸습니다.
  const bg =
    stage === "start"
      ? { dim: 0, blur: 0, gradient: 0 }
      : tagPhase === "reading"
        ? { dim: 0.68, blur: 1.5, gradient: 0.45 }
        : { dim: 0.87, blur: 3, gradient: 1 };

  return (
    <PhoneFrame>
      {loading ? (
        <div className="flex-1" />
      ) : !ownership ? (
        <>
          {/* 배경을 두 화면 바깥에 두어 시작 → 인식으로 넘어가도 이어집니다 */}
          <TagBackground dim={bg.dim} blur={bg.blur} gradient={bg.gradient} />
          {stage === "start" ? (
            <StartScreen onStart={() => setStage("tag")} />
          ) : (
            <TagSequence
              onRegister={handleRegister}
              onPhaseChange={handlePhaseChange}
            />
          )}
        </>
      ) : showWelcome ? (
        <WelcomeMessage onDone={() => setShowWelcome(false)} />
      ) : (
        <MainView ownership={ownership} />
      )}

      {/* 시연용 컨트롤 — 실제 서비스에는 들어가지 않습니다 */}
      <button
        onClick={handleReset}
        // fixed라 콘텐츠 열이 아니라 화면 오른쪽 아래 구석에 붙습니다
        className="fixed bottom-3 right-3 z-30 rounded-full border border-white/10 bg-black/55 px-3.5 py-1.5 text-[11px] text-mute backdrop-blur"
      >
        처음부터 다시 시연
      </button>
    </PhoneFrame>
  );
}
