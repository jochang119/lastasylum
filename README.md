# Last Asylum 좌표 조회 툴

서버 번호 + 닉네임으로 플레이어 좌표만 간단하게 조회하는 웹앱입니다.

## 배포 방법 (Vercel - 무료)

### 1. 준비
- GitHub 계정
- Vercel 계정 (https://vercel.com 에서 GitHub으로 로그인)

### 2. 프로젝트 올리기

1. 이 폴더를 GitHub 저장소에 올립니다.
2. Vercel에 로그인 후 **Add New Project** → 해당 저장소 선택
3. **Environment Variables**에 아래를 추가합니다:

| Name | Value |
|------|-------|
| `LAST_ASYLUM_API_KEY` | 여기에 본인 API 키 입력 |

4. Deploy 버튼 클릭

### 3. 완료
배포가 끝나면 `https://프로젝트이름.vercel.app` 주소로 접속하면 됩니다.

---

## 로컬에서 테스트하고 싶을 때

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 폴더에서
vercel dev
```

환경변수는 `.env` 파일에 넣으면 됩니다:

```
LAST_ASYLUM_API_KEY=여기에_키
```

---

## 주의사항

- API 키는 절대 프론트엔드 코드에 넣지 마세요.
- 키가 노출됐다면 Last Asylum Tracker 사이트에서 바로 폐기하고 새로 발급받으세요.
- 무료 계정은 하루 1,000회 제한이 있습니다.
