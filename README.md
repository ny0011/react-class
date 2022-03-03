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
* 첫번째 - Query Key : 이 query의 고유 식별자
* 두번째 - fetcher 함수 : 2에서 만든 함수
* 세번째 - option
** 그 중에서 refetchInterval를 사용하면 fetch를 실행하는 주기를 설정할 수 있다
ex) refetchInterval : 5000

return
- isLoading : 응답이 왔는지 아닌지 확인하는 함수
- data : 응답이 제대로 왔을 때 받은 데이터

* react query를 사용하면 데이터를 캐시에 저장하고 있어서 다른 페이지 왔다갔다 해도 데이터를 다시 가져오지 않음

* Devtools
캐시에 있는 query를 볼 수 있음
1. App.tsx에서 import
2. 아래 jsx를 Router 밑에 두기
<ReactQueryDevtools initialIsOpen={true} />

* 한 파일에 useQuery를 여러개 사용한다면?
1. isLoading, data 등 변수가 중복 선언되어서 에러 발생
-> {isLoading: infoLoading } 으로 이름을 변경할 수 있다
2. querykey를 같은거로 할 수 없음
-> querykey가 array 형태로 됨
-> querykey를 지정할 때 array로 만들어서 array 값을 다르게 하면 됨
```

### Apexcharts

- 그래프를 예쁘게 그려주는 라이브러리

### React Helmet
- head를 쉽게 관리하기 위해 쓰는 라이브러리

## State Management
- 상태 관리를 할 때 useState(), Recoil 등을 사용함
- 라이트/다크모드를 변경하는 것도 상태 변화에 속함
- 처음에는 useState만으로 테마 변경해봄
```
useState로만 다크모드 만들기
1. index.tsx -> App.tsx로 ThemeProvider를 가져온다
2. (App.tsx) isDark라는 state를 생성
3. (App.tsx) toggleDark 함수를 만들어 isDark 상태 변경
4. Coins.tsx에서 App.tsx toggleDark를 사용하고 싶음
4-1. toggleDark를 하위 컴포넌트가 사용할 수 있게 App.tsx에서 Router.tsx로 toggleDark를 전달
4-2. (Router.tsx) typescript가 형식을 알 수 있게 Interface를 정의
4-3. (Router.tsx) toggleDark를 Router 함수 안에 넣고 Coins에 전달
5. Coins.tsx의 button에서 사용하기 위해 4-2~4-3를 반복
6. Chart.tsx에서 isDark를 사용하고 싶다면?
...
-> 이 방법은 global state라고 함.
사용할 컴포넌트에서 바로 사용할 수 없고 여러번 거쳐야 해서 복잡함.

toggleDark : App -> Router -> Coins
isDark : App -> Router -> Coin -> Chart

이렇게 긴 여행을 떠나야 함..
```
### Recoil
- 상태 관리를 쉽게 해 주는 라이브러리
```
설정 방법
1. index.tsx에서 RecoilRoot로 App을 감싼다
2. atoms.ts라는 파일을 만들어 recoil의 atom 함수를 가져온다
3. atom을 사용하는 새 함수를 생성하는데 atom에 { key: "", default: ""} 를 넣어준다
export const isDarkAtom = atom({
    key: "isDark",
    default: false
})

사용 방법
4. App.tsx에서 useRecoilValue로 값을 가져온다
const isDark = useRecoilValue(isDarkAtom)

5. 값을 수정하고 싶을 때 useSetRecoilState을 사용해 값을 변경할 수 있는 setter함수를 가져온다
const setterFn = useSetRecoilState(isDarkAtom)
```