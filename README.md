# File Archive

파일을 업로드하고 팀과 공유할 수 있는 파일 아카이브 웹사이트입니다.

## 기술 스택

- **Frontend**: React 19 + Vite + MUI v9
- **Backend / DB**: Supabase (Storage + Database)
- **배포**: GitHub Pages (GitHub Actions)

## 주요 기능

- 드래그앤드롭 / 파일 선택 / 폴더 업로드
- 카테고리 자동 분류 (문서, 이미지, 영상, 압축파일, 코드, 기타)
- 파일명 검색
- 다운로드 / 삭제
- 새로고침 후에도 파일 목록 유지 (Supabase DB 연동)

## 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 아래 값을 입력합니다.

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

> Supabase 대시보드 → Project Settings → API에서 확인할 수 있습니다.

## Supabase 설정

### Storage 버킷

| 버킷명 | 공개 여부 | 최대 크기 |
|---|---|---|
| `uploaded-files` | Public | 100MB |

### Database 테이블 (`files`)

| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | uuid | Primary Key |
| file_name | text | 고유 파일명 (충돌 방지) |
| original_name | text | 원본 파일명 |
| file_path | text | Storage 내 경로 |
| folder_path | text | 폴더 업로드 시 상위 경로 |
| file_size | bigint | 파일 크기 (bytes) |
| file_type | text | MIME 타입 |
| extension | text | 확장자 |
| category | text | 자동 분류 카테고리 |
| storage_bucket | text | 버킷명 |
| public_url | text | 다운로드 URL |
| uploaded_at | timestamptz | 업로드 시각 |
| created_at | timestamptz | 레코드 생성 시각 |

## 실행 방법

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 컴포넌트 구조

```
src/
├── components/archive/
│   ├── file-icon.jsx        # 확장자별 아이콘
│   ├── file-card.jsx        # 파일 카드 (다운로드/삭제 포함)
│   ├── file-list.jsx        # 파일 목록
│   ├── file-search-bar.jsx  # 검색창
│   ├── category-tabs.jsx    # 카테고리 필터 탭
│   └── file-upload-area.jsx # 업로드 영역
├── hooks/
│   └── use-file-archive.js  # 파일 CRUD 훅
├── utils/
│   └── file-utils.js        # 분류·포맷 유틸
├── lib/
│   └── supabase.js          # Supabase 클라이언트
└── pages/
    └── archive-page.jsx     # 메인 페이지
```
