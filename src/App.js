import React, { useState, useEffect } from 'react';
import UserTable from "./components/UserTable";
import AddUser from "./components/AddUser";
import EditUserForm from "./components/EditUserForm";
import { v4 as uuidv4 } from "uuid";
import userApi from "./api/userApi";

function App() {
  //GET
  useEffect(() => {
    const getDataUser = async () => {
      try {
        const response = await userApi.users.getUsers()
        console.log("respuesta del server", response)
        setUsers(response);
      } catch (error) {
        console.log(error);
      }
    }
    getDataUser();
  }, [])

  //state
  const [users, setUsers] = useState([]);


  //POST
  //agregar usuarios
  const addUser = async (user) => {
    try {
      console.log("user en addUser App", user);
      user.id = uuidv4();
      console.log("lo que se envia al post:", user)
      await userApi.users.postUsers(user)
      setUsers([
        ...users,
        user
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE
  //eliminar usuario
  const deleteUser = async (id) => {
    try {
      console.log("id del usaurio a eliminar", id);
      setUsers(users.filter(user => user.id !== id));
      await userApi.users.deleteUsers(id)
    } catch (error) {
      console.log(error)
    }
  };

  //PUT
  //editar
  const [editing, setEditing] = useState(false);
  const [userSelecionado, setUserSelecionado] = useState({
    id: null, name: "", username: ""
  })
  //funcion para enviar data de la fila seleccionada
  const editRow = (user) => {
    setEditing(true);
    setUserSelecionado({
      id: user.id, name: user.name, username: user.username
    });

  };
  //metodo PUT
  const updateUser = async (id, updateUser) => {
    try {
      setEditing(false);
      setUsers(users.map(user => (user.id === id ? updateUser : user)));
      await userApi.users.putUsers(updateUser);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <h1>CRUD React Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <>
              <h2>Editar Usuario</h2>
              <EditUserForm userSelecionado={userSelecionado} updateUser={updateUser} />
            </>
          ) : (
              <>  <h2>Agregar Usuario</h2>
                <AddUser addUser={addUser} />
              </>
            )
          }
        </div>
        <div className="flex-large">
          <h2>Ver Usuarios</h2>
          <UserTable
            users={users}
            deleteUser={deleteUser}
            editRow={editRow} />
        </div>
      </div>
    </div>
  );
}

export default App;
