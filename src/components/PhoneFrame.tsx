export default function PhoneFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 화면 크기와 무관하게 같은 모양입니다. 가로 폭만 제한하고 세로는 전체를 씁니다.
    <div className="flex h-dvh w-full justify-center bg-ink">
      <div className="relative flex h-full w-full max-w-[400px] flex-col overflow-hidden bg-ink">
        {children}
      </div>
    </div>
  );
}
