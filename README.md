# 🌸나랑 벚꽃보러 가지 않을래?

![share_link_image](https://user-images.githubusercontent.com/65995664/221506826-234c3499-3d48-459a-a0f0-9c63b705a005.png)
![received](https://user-images.githubusercontent.com/65995664/221545781-3e2ac60d-9493-447e-8c03-54bdac8a4c53.png)

<br/>
<br/>
<p align="center">
애들아 놀러 가자!
</p>


## ✏️ 이 프로젝트를 시작하게 된 동기
#### 봄 한정 놀러가기 서비스를 만들자.
- 연인 / 친구 / 가족한테 놀러가자는 메시지를 보내자!
- 다가오는 벚꽃 시즌을 맞이하여, 단순히 놀러가자는 것에서 그치지 않고 벚꽃 보러 가기 전부터 설렘을 주기 위해 기획하게 되었습니다. 


## ⏳ 진행 기간
2023.02.22 ~ (진행중)

### 📃 프로젝트 진행 과정
- 아이디어 도출 및 팀 선정
- 개인별 자기소개 시간 및 팀 빌딩
- 프로젝트 목적과 대상을 명확히 하기 위한 지도그리기 
- 개인별 아이디어 스케치 토론 및 PL(Project Leader), UI/UX 결정권자 선정
- BDD & SDD 를 통한 설계 및 태스크 분배 (MVP)
- 페어 프로그래밍 짝 지정 
- 페어 프로그래밍을 활용한 개발 진행

## 🤖기술 스택

### 📚&nbsp;&nbsp;Frameworkes & Libraries

<img alt="NextJS" src ="https://img.shields.io/badge/Next.js-000000?&style=flat&logo=Next.js&logoColor=white"/> <img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-3178C6?&style=flat&logo=TypeScript&logoColor=white"/>
<img alt="Tailwind CSS" src ="https://img.shields.io/badge/Tailwind CSS-06B6D4?&style=flat&logo=Tailwind&logoColor=white"/>
<img alt="Vercel" src ="https://img.shields.io/badge/Vercel-000000?&style=flat&logo=Vercel&logoColor=white"/>
<img alt="Firebase" src ="https://img.shields.io/badge/Firebase-FFCA28?&style=flat&logo=Firebase&logoColor=white"/>
</br>



## [🔗 배포 URL](cherryblossom-chi.vercel.app)
Vercel을 활용하여 배포하였습니다.

## 👁‍🗨 데모









|   Intro    |   초대장 작성 - 배경 선택     |  초대장 작성 - 캐릭터, 스티커 선택 및 위치 지정 |
| :-------------------------: |  :-------------------------: | :-------------------------: | 
| ![intro_blossomm](https://user-images.githubusercontent.com/59612529/221550553-328e3dd6-3dc8-4bb6-a181-56d732da63e2.gif)| ![creation-bg](https://user-images.githubusercontent.com/59612529/221548354-7b96f68d-2b77-4e64-ac6a-760834d44776.gif) | ![creation-sticker](https://user-images.githubusercontent.com/59612529/221548696-0188bf9f-763a-4cd0-af82-5bba9d03b6ce.gif) |

|   초대장 완성     |   초대장 완성 -  다시 보내기     |  초대장 열기 |
| :-------------------------: |  :-------------------------: | :-------------------------: | 
| ![complete](https://user-images.githubusercontent.com/59612529/221549081-7f828335-cde7-4444-a9b4-36f5d7c229d3.gif)| ![backtocreation-](https://user-images.githubusercontent.com/59612529/221549377-69499f1b-459d-4a06-8573-783230e19458.gif) | ![received](https://user-images.githubusercontent.com/59612529/221549622-60dacbe2-5215-4931-9fd1-eaf1593fabc9.gif) |



## ⌨️ 실행 방법

- 모듈 설치
```tsx
npm install
```
- 실행
```tsx
npm run dev
```
- 배포 환경
```tsx
npm bulid
npm start
```

    
  
</br>

## 🔒 팀 코드 컨벤션

<details>
<summary><h3>💬 커밋 컨벤션</h3></summary>
<div markdown="1">

#### 💬 Commit Type and Description

| 커밋명   | 내용                                        |
| -------- | ------------------------------------------- |
| feat     | 파일, 폴더, 새로운 기능 추가                |
| fix      | 버그 수정                                   |
| docs     | 제품 코드 수정 없음                         |
| style    | 코드 형식, 정렬, 주석 등의 변경             |
| refactor | 코드 리팩토링                               |
| test     | 테스트 코드 추가                            |
| chore    | 환경설정, 빌드 업무, 패키지 매니저 설정등.. |
| hotfix   | 치명적이거나 급한 버그 수정                 |
| delete   | 사용하지 않는 변수, 파일 etc 삭제           |


 
</div>
</details>


</br>


## 📦 폴더 구조

```
📦pages
 ┣ 📂api
 ┃ ┣ 📜hello.ts
 ┃ ┗ 📜share.ts
 ┣ 📂complete
 ┃ ┗ 📜[img].tsx
 ┣ 📂creation
 ┃ ┗ 📜index.tsx
 ┣ 📂intro
 ┃ ┗ 📜index.tsx
 ┣ 📂received
 ┃ ┗ 📜[img].tsx
 ┣ 📜_app.tsx
 ┣ 📜_document.tsx
 ┗ 📜index.tsx
 
 📦src
 ┣ 📂components
 ┃ ┣ 📂Creation
 ┃ ┃ ┣ 📂Custom
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Display
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂PageTitle
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂ToastMessage
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📜CompleteLayout.tsx
 ┃ ┣ 📜InterActionCard.tsx
 ┃ ┗ 📜Layout.tsx
 ┣ 📂constants
 ┃ ┗ 📜defaultSEO.ts
 ┣ 📂lib
 ┃ ┗ 📜firebase.ts
 ┗ 📂utils
 ┃ ┗ 📜index.ts
```

</br>

## 👨‍👩‍👧‍👦 팀원



|   찰리(PL)   |   애나(UI/UX Leader)   |   세인트   |   아메   |   울버린   |   조조   |   셀   |
|:----------:|:----------:|:----------:|:----------:|:----------:|:----------:|:----------:|
|[@YeonghunKO](https://github.com/YeonghunKO)|[@anna010ae](https://github.com/anna010ae) | [@Seongtaek-H](https://github.com/Seongtaek-H)  | [@Lee-Yeseul](https://github.com/Lee-Yeseul) | [@seunghoonKang](https://github.com/seunghoonKang) | [@seonghun0828](https://github.com/seonghun0828) | [@devysi0827](https://github.com/devysi0827)|
|<img src="https://avatars.githubusercontent.com/YeonghunKO" width="100">|<img src="https://avatars.githubusercontent.com/anna010ae" width="100">|<img src="https://avatars.githubusercontent.com/Seongtaek-H" width="100">|<img src="https://avatars.githubusercontent.com/Lee-Yeseul" width="100">|<img src="https://avatars.githubusercontent.com/seunghoonKang" width="100">|<img src="https://avatars.githubusercontent.com/seonghun0828" width="100">|<img src="https://avatars.githubusercontent.com/devysi0827" width="100">|
<br>
