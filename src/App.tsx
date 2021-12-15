import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");

  // Input element가 이 이벤트를 발생시켰다
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // react typescript 쓰는 사람은 currentTarget을 선택함.
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          value={value}
          onChange={onChange}
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
