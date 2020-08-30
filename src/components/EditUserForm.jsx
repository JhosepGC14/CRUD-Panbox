import React from "react";
import { useForm } from "react-hook-form";

const EditUserForm = (props) => {
  const { register, errors, handleSubmit, setValue } = useForm({
    defaultValues: props.userSelecionado,
  });

  setValue("name", props.userSelecionado.name);
  setValue("username", props.userSelecionado.username);

  const onSubmit = (data, e) => {
    console.log(data);
    // se le asigna el id del usuario seleccionado a la nueva data
    data.id = props.userSelecionado.id;
    //fn para actualizar
    props.updateUser(props.userSelecionado.id, data);
    //reseta el form
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
      <button>Editar Usuario</button>
    </form>
  );
};

export default EditUserForm;
