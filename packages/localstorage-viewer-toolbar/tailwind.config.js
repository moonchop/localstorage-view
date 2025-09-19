export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../localstorage-viewer-toolbar/src/**/*.{js,jsx,ts,tsx}",
  ], // 빌드시 실제 사용하는 클래스만 포함
  theme: {
    extend: {}, // 필요 시 사용자 설정 추가
  },
  corePlugins: {
    preflight: false, // 라이브러리에서 CSS 리셋 비활성화 (사용자 스타일과 충돌 방지)
  },
  plugins: [],
};
