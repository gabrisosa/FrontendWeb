import { FC, useEffect, useState } from "react";

type Person = {
  name: string,
  url: string
}

type PeopleData = {
  count: number,
  next: string | undefined
  previous: string | undefined
  results: Person[];
}

type ListProps = {
  setUrl: (url: string) => void;
  text: string
}

const List: FC<ListProps> = ({ text, setUrl }) => {

  const [data, setData] = useState<PeopleData | undefined>(undefined);

  const getPeople = async () => {
    try {
      const response = await fetch(`https://swapi.dev/api/people/?search=${text}`);
      const data = await response.json();
      setData(data);
    } catch (e) {
      console.error(e)
    }
  }

  const getNextPrevious = async (url: string | undefined) => {
    try {
      const response = await fetch(`${url}`);
      const data = await response.json();
      setData(data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getPeople();
  }, [text]);

  return (
    <div>
      {
        data &&
        <div>
          {data.results.map(p =>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setUrl(p.url)}
              key={p.url}>{p.name}
            </div>)
          }
        </div>
      }
      {data?.previous && <button
        onClick={() => {
          getNextPrevious(data.previous);
        }}
      >PREV</button>}
      {!data && "No hay datos"}
      {data?.next && <button
        onClick={() => {
          getNextPrevious(data.next);
        }}
      >NEXT</button>}
    </div>
  )
}

export default List;