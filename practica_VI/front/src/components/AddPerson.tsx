import React, { FC, useState } from "react";
import {gql, useMutation} from "@apollo/client"

const ADD_PERSON = gql`
  mutation addPerson($name: String, $surname: String, $email: String, $phone: String) {
    addPerson(name: $name, surname: $surname, email: $email, phone: $phone){
      _id
    }
  }
`

const AddPerson:FC<{reloadHandler:() => void}> = ({reloadHandler}) => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [addPersonMutation] = useMutation(ADD_PERSON);
  
  return <div>
    <input
      type="text"
      value = {name}
      onChange={(e) => setName(e.target.value)} // cuando se modifica el texto del input se almacena en una variable de estado
      placeholder="Nombre"
    />
    <input
      type="text"
      value={surname}
      onChange={(e) => setSurname(e.target.value)}
      placeholder="Apellido"
    />
    <input
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="e-mail"
    />
    <input
      type="text"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      placeholder="Teléfono"
    />
    <button
      onClick={() => addPersonMutation({
        variables: {
          name,
          surname,
          email,
          phone,
        },
      }).then(() => {
        reloadHandler();
        setName("");
        setSurname("");
        setEmail("");
        setPhone("");
      })}  
      // cuando la mutacion se haya ejecutado llamo a reloadHandeler()
      // cambia el estado del padre y se recarga el hijo (lista de personas)
    >
      Add
    </button>
  </div>
}

export default AddPerson;