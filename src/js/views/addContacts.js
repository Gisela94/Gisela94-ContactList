import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Ícono de regresar

const AddContacts = () => {
  const { actions } = useContext(Context);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    actions.addContact(form);

    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    window.alert("Contacto añadido con éxito!");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Añadir un Nuevo Contacto</h1>

      <form onSubmit={handleAddContact} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-bold">Nombre Completo</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Escribe el nombre"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">Correo Electrónico</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            className="form-control"
            placeholder="Escribe el correo electrónico"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label fw-bold">Número de Teléfono</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="number"
            className="form-control"
            placeholder="Escribe el teléfono"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label fw-bold">Dirección</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            type="text"
            className="form-control"
            placeholder="Escribe la dirección"
            required
          />
        </div>
        <button type="submit" className="w-100 btn btn-success mt-3">
          Guardar
        </button>
      </form>

      <Link to={"/"} className="mt-4 btn btn-outline-secondary d-block mx-auto">
        <FaArrowLeft className="mr-2" />
        Regresar a los Contactos
      </Link>
    </div>
  );
};

export default AddContacts;
