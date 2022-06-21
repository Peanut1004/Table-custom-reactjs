import React, { useContext } from "react";
import { AppContext } from "../Context";

function Modal() {
  const { handleButtonModal, formError, isError } = useContext(AppContext);

  return (
    <div className={isError ? "modal transition" : "modal"}>
      <div className="modal-wrap">
        <h3 className="modal-title">
          Invalid
          {/* {Object.keys(formError).map((el, index) => (
            <p key={index}>
              {el} <span>,</span>
            </p>
          ))} */}
        </h3>
        <div className="modal-content">
          {Object.values(formError).map((el, index) => (
            <p key={index}>{el}</p>
          ))}
          <div className="modal-button">
            <button onClick={handleButtonModal}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
