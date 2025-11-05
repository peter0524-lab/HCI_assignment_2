<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI Grad School Assistant

대학원 진학을 준비하는 학생들을 위한 AI 기반 도우미 애플리케이션입니다.

## 주요 기능

- 📝 **CV 생성**: 사용자 정보를 바탕으로 전문적인 이력서 자동 생성
- 📄 **연구 계획서 작성**: AI를 활용한 맞춤형 연구 제안서 생성
- 👨‍🏫 **교수 추천**: 연구 분야에 맞는 교수님 추천
- ✉️ **이메일 작성**: 교수님께 보낼 전문적인 컨택 이메일 자동 생성

## 로컬 실행

**필수 요구사항:** Node.js 20.x 이상

1. **저장소 클론**
   ```bash
   git clone https://github.com/peter0524-lab/HCI_assignment_2.git
   cd HCI_assignment_2
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **환경 변수 설정**
   ```bash
   cp .env.example .env
   ```
   `.env` 파일을 열어서 `GEMINI_API_KEY`에 본인의 API 키를 입력하세요.
   
   - API 키 발급: [Google AI Studio](https://aistudio.google.com/app/apikey)

4. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   브라우저에서 `http://localhost:3000` 접속

## 배포하기

### Vercel에 배포

1. [Vercel](https://vercel.com)에 로그인
2. "Import Project" 선택
3. GitHub 저장소 연결
4. **Environment Variables 설정:**
   - `GEMINI_API_KEY`: 본인의 Gemini API 키
5. Deploy 클릭

### Railway에 배포

1. [Railway](https://railway.app)에 로그인
2. "New Project" → "Deploy from GitHub repo" 선택
3. 저장소 선택
4. **Variables 탭에서 환경 변수 설정:**
   - `GEMINI_API_KEY`: 본인의 Gemini API 키
5. 자동으로 배포 시작

## 기술 스택

- **Frontend:** React 19, TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API
- **Markdown Rendering:** marked

## 프로젝트 구조

```
.
├── components/          # React 컴포넌트
│   ├── common/         # 공통 컴포넌트
│   ├── icons/          # 아이콘 컴포넌트
│   └── steps/          # 단계별 컴포넌트
├── services/           # API 서비스
├── hooks/              # Custom React Hooks
├── types.ts            # TypeScript 타입 정의
└── App.tsx             # 메인 앱 컴포넌트
```

## 라이선스

MIT

## 문제 해결

### 빌드 시 빈 화면만 표시되는 경우
- 환경 변수가 제대로 설정되었는지 확인하세요
- Vercel/Railway 대시보드에서 `GEMINI_API_KEY`가 설정되었는지 확인하세요

### CSS가 로드되지 않는 경우
- 빌드가 제대로 완료되었는지 확인하세요
- `npm run build`를 로컬에서 실행하여 오류가 있는지 확인하세요
