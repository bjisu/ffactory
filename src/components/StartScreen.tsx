"use client";

/**
 * 첫 진입 화면. 배경은 TagBackground가 page.tsx에서 함께 그립니다.
 * 여기서는 하단 그라데이션과 버튼만 얹습니다.
 */
export default function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col justify-end px-8 pb-14">
      {/* 버튼 영역이 사진 위에서도 확실히 읽히도록 아래쪽을 눌러 줍니다 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/75 to-transparent" />

      <div className="relative">
        <p
          className="text-center text-[13px] leading-relaxed text-chalk/85"
          style={{
            textShadow: "0 1px 3px rgba(0,0,0,0.9), 0 2px 14px rgba(0,0,0,0.85)",
          }}
        >
          키링을 휴대폰 뒷면에 대면
          <br />
          정품 확인과 함께 비공개 콘텐츠가 열립니다
        </p>
        <button
          onClick={onStart}
          className="mt-5 w-full rounded-full bg-rose py-4 text-[15px] font-semibold text-ink transition active:scale-[0.985]"
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
