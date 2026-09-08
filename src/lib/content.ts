/**
 * 시연용 콘텐츠 데이터.
 * 아티스트를 바꾸거나 링크를 교체할 때 이 파일만 수정하면 됩니다.
 */

export const artist = {
  /** 상단 워드마크 로고. public 기준 경로 */
  logo: "/photos/logo.svg",
  /** 발행 정보 등 텍스트로 아티스트명이 필요한 곳에 씁니다 */
  name: "BLACKPINK",
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
  /** 공식 MV */
  url: "https://www.youtube.com/watch?v=2GJfWMYCWY0",
  runtime: "3:24",
  /**
   * 유튜브 공식 MV 주소에서 v= 뒤의 값을 넣으세요.
   * 예: https://www.youtube.com/watch?v=AbCdEfGhIjK → "AbCdEfGhIjK"
   * 비워 두면 샘플 비주얼과 재생 버튼이 대신 표시됩니다.
   */
  youtubeId: "2GJfWMYCWY0",
};

/** 공식 채널. id가 아이콘을 결정하므로 임의로 바꾸지 마세요 */
export const socialLinks: { id: "youtube" | "instagram"; label: string; url: string }[] = [
  {
    id: "youtube",
    label: "YouTube",
    url: "https://www.youtube.com/@BLACKPINK",
  },
  {
    id: "instagram",
    label: "Instagram",
    // TODO: 제안서 제출 전 공식 계정 URL 최종 확인 후 교체
    url: "https://www.instagram.com/blackpinkofficial/",
  },
];

export const store = {
  label: "공식 스토어",
  name: "YG SELECT",
  url: "https://www.ygselect.com",
  /** 보조 문구. 스토어가 아이콘 버튼으로 바뀌면서 현재 화면에는 표시되지 않습니다 */
  note: "키링 소유자 전용 쿠폰 적용",
};

/**
 * 비공개 포토.
 * `image`는 public 폴더 기준 경로입니다. 사진 파일을 public/photos/ 에 넣으세요.
 * 확장자가 png·webp여도 여기 경로만 바꾸면 됩니다 (컴포넌트는 경로를 그대로 씁니다).
 * 파일이 아직 없거나 경로가 틀리면 자동으로 샘플 비주얼이 대신 표시됩니다.
 * `image`를 null로 두어도 샘플 비주얼이 표시됩니다.
 */
export const privatePhotos: {
  id: number;
  caption: string;
  date: string;
  image: string | null;
  /** 정사각 크롭에서 살릴 지점. 생략하면 가운데("center") */
  objectPosition?: string;
}[] = [
  {
    id: 1,
    caption: "DEADLINE 재킷 촬영 비하인드",
    date: "2025.11.02",
    image: "/photos/01.jpg",
  },
  {
    id: 2,
    caption: "안무 연습실, 첫 합",
    date: "2025.11.18",
    image: "/photos/02.jpg",
  },
  {
    id: 3,
    caption: "뮤직비디오 세트 대기 중",
    date: "2025.12.05",
    // 이 파일만 확장자가 .jpeg 입니다
    image: "/photos/03.jpeg",
    // 원본 위쪽이 빈 벽이라 중앙 크롭하면 인물이 아래로 밀려 잘립니다
    objectPosition: "50% 75%",
  },
  {
    id: 4,
    caption: "발매 전날 밤",
    date: "2026.01.14",
    image: "/photos/04.jpg",
  },
];

/**
 * 태그 인식·정품 인증 화면의 배경 이미지.
 * 지금은 비공개 포토 중 한 장을 빌려 쓰고 있습니다. 전용 이미지가 생기면
 * public에 넣고 이 경로만 바꾸세요. null이면 검정 배경으로 표시됩니다.
 */
export const tagBackground: string | null = "/photos/bg.jpg";

/**
 * 세로가 긴 화면(휴대폰·태블릿)용 배경.
 * 원본은 거의 정사각(2100x2232)이라 세로 화면을 cover로 덮으면 좌우가 크게
 * 잘립니다. 이 파일은 원본을 아래에 두고 위쪽을 원본 상단 색으로 이어지게
 * 늘린 2100x4400 버전이라 인물이 잘리지 않습니다.
 * null이면 가로·세로 모두 원본을 씁니다.
 */
export const tagBackgroundPortrait: string | null = "/photos/bg-portrait.jpg";

/** 첫 태그 시 재생되는 인사 메시지 (실제 음성 파일로 교체) */
export const welcomeMessage = {
  duration: "0:07",
  /** /public 에 음성 파일을 넣고 경로를 지정하면 실제 재생됩니다 */
  audioSrc: null as string | null,
};
