export default function PhoneFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh w-full sm:flex sm:items-center sm:justify-center sm:py-10">
      {/* 데스크톱에서는 기기 목업으로, 모바일에서는 전체 화면으로 보입니다 */}
      <div
        className="
          relative mx-auto flex min-h-dvh w-full flex-col overflow-hidden
          bg-ink
          sm:min-h-0 sm:h-[860px] sm:w-[400px] sm:rounded-[44px]
          sm:border sm:border-white/10
          sm:shadow-[0_50px_120px_-30px_rgba(247,167,187,0.20),0_0_0_11px_#0b0b0e]
        "
      >
        {children}
      </div>
    </div>
  );
}
