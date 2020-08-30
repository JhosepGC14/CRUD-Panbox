import React from "react";
import { useForm } from "react-hook-form";

const AddUser = (props) => {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    console.log(data);
    //enviamos la data a la funcion addUser
    props.addUser(data);
    //limpiamos los campos
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Username: </label>
      <input
        id="name"
        name="name"
        type="text"
        ref={register({
          required: { value: true, message: "Campo requerido" },
        })}
      />
      <div className="error">{errors?.name?.message}</div>
      <label htmlFor="username">Username: </label>
      <input
        id="username"
        name="username"
        type="text"
        ref={register({
          required: { value: true, message: "Campo requerido" },
        })}
      />
      <div>{errors?.name?.message}</div>
      <button>Agregar Usuario</button>
    </form>
  );
};

export default AddUser;
