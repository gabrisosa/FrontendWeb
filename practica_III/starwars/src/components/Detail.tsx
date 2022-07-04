import { FC, useEffect, useState } from "react";

type DetailProps = {
  urlPerson: string | undefined,
}

type Person = {
  name: string,
  height: string,
  mass: string
}

const Detail: FC<DetailProps> = ({ urlPerson }) => {

  const [person, setPerson] = useState<Person | undefined>(undefined);

  const getPerson = async () => {
    const response = await fetch(`${urlPerson}`);
    const data = await response.json();
    setPerson(data);
  }

  useEffect(() => {
    if (urlPerson) {
      getPerson();
    }
  }, [urlPerson]);

  return (
    <div>
      {person &&
        <dl>
          <dt>Name</dt>
          <dd>{person.name}</dd>
          <dt>Height</dt>
          <dd>{person.height}</dd>
          <dt>Mass</dt>
          <dd>{person.mass}</dd>
        </dl>
      }
    </div>
  )
}

export default Detail;