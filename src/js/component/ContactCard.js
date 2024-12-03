import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { FaRegTrashCan, FaPencil, FaPhoneFlip, FaEnvelope } from "react-icons/fa6";
import { BsGeoAltFill } from "react-icons/bs";
import ConfirmationModal from "./ConfirmationModal";
import { Link, useNavigate } from "react-router-dom";

const ContactCard = ({ contact }) => {
  const { actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const randomNumber = Math.floor(Math.random() * 95);
  const randomGender = Math.floor(Math.random() * 2);
  const gender = randomGender === 0 ? "women" : "men";
  const navigate = useNavigate();

  const deleteContact = () => {
    actions.deleteContact(contact.id);
    setShowModal(false);
  };

  const editContact = () => {
    navigate(`/editContact/${contact.id}`);
  };

  if (!contact) {
    return <div><h1>No contact data available</h1></div>;
  }

  return (
    <div className="card mb-4 shadow-sm border-light rounded">
      <div className="row g-0">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
        <img
  src="https://res.cloudinary.com/dsgltzpu7/image/upload/v1733230093/steve_mik025.jpg" 
  className="img-fluid rounded-circle"
  alt={`${contact.name || "Unnamed"}'s avatar`}
  style={{ height: "120px", width: "120px", objectFit: "cover" }}
/>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title text-primary">{contact.name || "No Name"}</h5>
            <p className="card-text">
              <i><BsGeoAltFill /></i> {contact.address || "No Address"} <br />
              <i><FaPhoneFlip /></i> {contact.phone || "No Phone"} <br />
              <i><FaEnvelope /></i>{" "}
              <a href={`mailto:${contact.email || ""}`} className="text-decoration-none">{contact.email || "No Email"}</a>
            </p>
          </div>
        </div>
        <div className="col-md-2 d-flex flex-column justify-content-center align-items-center p-3">
          <i
            onClick={editContact}
            className="text-info p-2 mb-2"
            style={{ cursor: "pointer", transition: "color 0.3s" }}
            onMouseOver={(e) => e.target.style.color = '#0069d9'}
            onMouseOut={(e) => e.target.style.color = 'initial'}
          >
            <FaPencil size="1.8em" />
          </i>
          <i
            onClick={() => setShowModal(true)}
            className="text-danger p-2"
            style={{ cursor: "pointer", transition: "color 0.3s" }}
            onMouseOver={(e) => e.target.style.color = '#d9534f'}
            onMouseOut={(e) => e.target.style.color = 'initial'}
          >
            <FaRegTrashCan size="1.8em" />
          </i>
        </div>
      </div>
      <ConfirmationModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={deleteContact}
      />
    </div>
  );
};

export default ContactCard;
