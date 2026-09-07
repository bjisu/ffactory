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
  /**
   * 유튜브 공식 MV 주소에서 v= 뒤의 값을 넣으세요.
   * 예: https://www.youtube.com/watch?v=AbCdEfGhIjK → "AbCdEfGhIjK"
   * 비워 두면 샘플 비주얼과 재생 버튼이 대신 표시됩니다.
   */
  youtubeId: "",
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
 * 시연용 이미지는 Unsplash 무료 사진입니다 (상업적 사용 허용, 출처 표기 불필요).
 * 실제 아티스트 사진으로 교체할 때는 /public 경로(예: "/photos/01.jpg")를 넣으면 됩니다.
 * `image`를 null로 두면 플레이스홀더 비주얼이 표시됩니다.
 */
export const privatePhotos: {
  id: number;
  caption: string;
  date: string;
  image: string | null;
}[] = [
  {
    id: 1,
    caption: "DEADLINE 재킷 촬영 비하인드",
    date: "2025.11.02",
    // 핑크·퍼플 스테이지 조명
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
  },
  {
    id: 2,
    caption: "안무 연습실, 첫 합",
    date: "2025.11.18",
    // 어둑한 연습실
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
  },
  {
    id: 3,
    caption: "뮤직비디오 세트 대기 중",
    date: "2025.12.05",
    // 무대 커튼 앞에서 대기하는 실루엣
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80",
  },
  {
    id: 4,
    caption: "발매 전날 밤",
    date: "2026.01.14",
    // 밤 도시 거리
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
  },
];

/** 첫 태그 시 재생되는 인사 메시지 (실제 음성 파일로 교체) */
export const welcomeMessage = {
  duration: "0:07",
  /** /public 에 음성 파일을 넣고 경로를 지정하면 실제 재생됩니다 */
  audioSrc: null as string | null,
};
