import { FC, useState } from "react";
import styled from '@emotion/styled';

type BuscadorProps = {
  changeText: (text: string) => void;
}

const Search: FC<BuscadorProps> = ({ changeText }) => {
  const [text, setText] = useState<string>("");
  return (
    <div>
      <input
        placeholder="Search"
        value={text}
        type="text"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => changeText(text)}>Buscar</button>
    </div>
  )
}

export default Search;