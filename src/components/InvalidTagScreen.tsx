"use client";

/**
 * 식별자가 없거나 발행 목록에 없을 때 보여 주는 안내 화면.
 * 정품이 아닐 수도 있고 링크만 복사해 온 경우일 수도 있어, 단정하지 않고
 * 다시 태그하도록 안내합니다.
 */
export default function InvalidTagScreen({
  reason,
}: {
  /** missing: 주소에 식별자가 없음 / unknown: 발행 목록에 없는 식별자 */
  reason: "missing" | "unknown";
}) {
  return (
    <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full border border-white/25">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-chalk/80">
          <path
            d="M12 7.5v6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="17" r="1.2" fill="currentColor" />
        </svg>
      </span>

      <div>
        <p className="text-[17px] font-semibold tracking-tight text-chalk">
          {reason === "missing"
            ? "키링 정보를 찾을 수 없습니다"
            : "확인되지 않는 키링입니다"}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-mute">
          {reason === "missing" ? (
            <>
              키링을 휴대폰 뒷면에 다시 대 주세요.
              <br />
              주소를 직접 입력하거나 복사한 경우에도 이 화면이 나옵니다.
            </>
          ) : (
            <>
              정품 목록에서 확인되지 않았습니다.
              <br />
              키링을 다시 태그해도 같은 화면이 나오면 구매처에 문의해 주세요.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
