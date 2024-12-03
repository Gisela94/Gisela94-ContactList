import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ContactCard from "../component/ContactCard";
import { FaPlusCircle } from "react-icons/fa"; // Agregar icono de añadir

const ContactList = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        {/* Botón para agregar nuevo contacto con un ícono */}
        <Link className="btn btn-warning" to={"/addContact"}>
          <FaPlusCircle className="mr-2" />
          Agregar Nuevo Contacto
        </Link>
      </div>

      {store.contacts.length > 0 ? (
        // Si hay contactos, mostrar las tarjetas
        <div className="row">
          {store.contacts.map((contact) => (
            <div key={contact.id} className="col-12 col-md-4 mb-4">
              <ContactCard contact={contact} />
            </div>
          ))}
        </div>
      ) : (
        // Si no hay contactos, mostrar mensaje amigable
        <div className="alert alert-warning">
          <h4>No se han encontrado contactos</h4>
          <p>Agrega algunos para empezar a gestionar tu agenda.</p>
        </div>
      )}
    </div>
  );
};

export default ContactList;
