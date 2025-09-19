# LocalStorage Monorepo

로컬스토리지 관련 도구들의 모노레포입니다.

## 구조

```
packages/
├── localstorage-devtool/     # 개발 도구 (테스트 환경)
└── localstorage-viewer-toolbar/  # 라이브러리 컴포넌트
```

## 설치

```bash
npm install
```

## 개발

```bash
# devtool 개발 서버 실행
npm run dev

# 특정 패키지 개발 서버 실행
npm run dev --workspace=@localstorage/devtool
npm run dev --workspace=@localstorage/viewer-toolbar
```

## 빌드

```bash
# 모든 패키지 빌드
npm run build

# 특정 패키지만 빌드
npm run build:devtool
npm run build:viewer-toolbar
```

## 린트

```bash
# 모든 패키지 린트
npm run lint

# 특정 패키지만 린트
npm run lint:devtool
npm run lint:viewer-toolbar
```

## 정리

```bash
# 모든 패키지 정리
npm run clean

# 특정 패키지만 정리
npm run clean:devtool
npm run clean:viewer-toolbar
```

