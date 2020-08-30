import React from "react";

const UserTable = (props) => {
  console.log("props en usertable: ", props);
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre:</th>
          <th>Username:</th>
          <th>Acciones:</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>
              <button
                className="button muted-button"
                onClick={() => {
                  props.editRow(user);
                }}
              >
                Editar
              </button>
              <button
                className="button muted-button"
                onClick={() => {
                  props.deleteUser(user.id);
                }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
