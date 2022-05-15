import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client"

type Person = {
  _id: string,
  name: string,
  surname: string,
  email: string,
  phone: string
}

const GET_PERSONS = gql`
  query getPersons {
    getPersons {
      _id
      name
      surname
      email
      phone
    }
  }
`;

const PersonsList = () => {

  const {data, loading, error} = useQuery <{ getPersons: Person[] }>(GET_PERSONS);

  const [sortSelect, setSortSelect] = useState<boolean>(false)

  // useQuery es un hook de apollo, cada vez que el servidor graphql nos da algun evento, la pagina se rerenderiza
  // devuelve un objeto con el campo getPersons, que devuelve un array de Person

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error...</div>

  return (
    <div>
      <button onClick={(e) => setSortSelect(false)}>A-Z</button>
      <button onClick={(e) => setSortSelect(true)}>Z-A</button>
      {data&&[...data.getPersons].sort((a, b) => {
        if (!sortSelect) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        } else {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        }
      }).map((person) => (
        <div key={person._id}>
          {person.name} {person.surname} {person.email} {person.phone}
        </div>))
      }
    </div>
  )
};

export default PersonsList;