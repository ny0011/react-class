import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

function App() {
  return (
    <Father as="header">
      <Btn>Log In </Btn>
      <Btn as="a" href="/">
        Log In
      </Btn>
    </Father>
  );
}

export default App;
