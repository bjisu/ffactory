/**
 * 시연용 콘텐츠 데이터.
 * 아티스트를 바꾸거나 링크를 교체할 때 이 파일만 수정하면 됩니다.
 */

export const artist = {
  /** 상단 대형 워드마크 (2줄로 쪼개서 표시) */
  wordmarkTop: "BLACK",
  wordmarkBottom: "PINK",
  nameKo: "블랙핑크",
};

export const keyring = {
  /** 굿즈 라인 명칭 */
  productName: "OFFICIAL NFC KEYRING",
  /** 에디션 표기 */
  edition: "DEADLINE EDITION",
  /** 총 발행 수량 */
  totalIssued: 5000,
  /** 이 태그의 고유 번호 — 실제로는 칩마다 다른 값이 서버에서 내려옵니다 */
  serialNumber: 1847,
  /** 제조 정보 */
  manufacturedAt: "2026.01.15",
};

export const musicVideo = {
  title: "DEADLINE",
  label: "3rd MINI ALBUM",
  /** 공식 유튜브 채널 (확인됨) */
  url: "https://www.youtube.com/@BLACKPINK",
  runtime: "3:24",
};

export const socialLinks = [
  {
    id: "youtube",
    label: "YouTube",
    handle: "@BLACKPINK",
    url: "https://www.youtube.com/@BLACKPINK",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@blackpinkofficial",
    // TODO: 제안서 제출 전 공식 계정 URL 최종 확인 후 교체
    url: "https://www.instagram.com/blackpinkofficial/",
  },
];

export const store = {
  label: "공식 스토어",
  name: "YG SELECT",
  url: "https://www.ygselect.com",
  /** 스토어 버튼 하단 보조 문구 */
  note: "키링 소유자 전용 쿠폰 적용",
};

/**
 * 비공개 포토.
 * 저작권 문제로 실제 이미지는 포함하지 않았습니다.
 * `image` 값에 /public 경로(예: "/photos/01.jpg")를 넣으면
 * 플레이스홀더 대신 실제 사진이 표시됩니다.
 */
export const privatePhotos = [
  { id: 1, caption: "DEADLINE 재킷 촬영 비하인드", date: "2025.11.02", image: null },
  { id: 2, caption: "안무 연습실, 첫 합", date: "2025.11.18", image: null },
  { id: 3, caption: "뮤직비디오 세트 대기 중", date: "2025.12.05", image: null },
  { id: 4, caption: "발매 전날 밤", date: "2026.01.14", image: null },
];

/** 첫 태그 시 재생되는 인사 메시지 (실제 음성 파일로 교체) */
export const welcomeMessage = {
  duration: "0:07",
  /** /public 에 음성 파일을 넣고 경로를 지정하면 실제 재생됩니다 */
  audioSrc: null as string | null,
};
