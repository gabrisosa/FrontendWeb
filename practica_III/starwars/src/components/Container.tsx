import { FC, useState } from "react";
import Detail from "./Detail";
import List from "./List";
import Search from "./Search";


const Container: FC = () => {

  const [text, setText] = useState<string>("");
  const [urlPerson, setUrlPerson] = useState<string | undefined>(undefined);

  return (
    <div>
      <Search changeText={setText} />
      <Detail urlPerson={urlPerson} />
      <List setUrl={setUrlPerson} key={urlPerson} text={text} />
    </div>
  )
}

export default Container;