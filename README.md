# React Masterclass

Learn and dominate the React ecosystem once and for all.

### Using:

- Styled Components
- Recoil
- React Query
- React Router DOM
- Apex Charts
- React Spring
- Typescript
- Firebase

### CRA 앱에 바로 Typescript 적용하기

```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

### Crypto Tracker 만들기

/ : coin 전체
/:coinId : 특정 코인만

### React Router 버전

```
npm i react-router-dom@5.3.0
```

### React Query

```
react query가 있으면 useEffect, useState가 없어도 됨!

1. index.tsx에 Provider 추가
2. request를 보내고 json을 리턴하는 fetcher 함수 생성
3. 데이터를 사용하는 곳에 useQuery 사용

useQuery("Query Key", fetcher 함수)

argument
- Query Key : 이 query의 고유 식별자
- fetcher 함수 : 2에서 만든 함수

return
- isLoading : 응답이 왔는지 아닌지 확인하는 함수
- data : 응답이 제대로 왔을 때 받은 데이터

* react query를 사용하면 데이터를 캐시에 저장하고 있어서 다른 페이지 왔다갔다 해도 데이터를 다시 가져오지 않음

```
