import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "./context";
import { FaTimes } from "react-icons/fa";
import rules from "../images/image-rules.svg";

const InfoModal = () => {
  const { showModal, closeModal } = useGlobalContext();
  const modalRef = useRef(null);
  useEffect(() => {
    if (showModal) {
      modalRef.current.classList.add("modal--visible");
    }
  }, [showModal]);

  return (
    <div ref={modalRef} className={`modal`}>
      <div className='modal-content'>
        <h2>Rules</h2>
        <img
          src={rules}
          alt='scissors beats paper, paper beats rock, rock beats scissors'
        />
        <button id='closeModalBtn'>
          <FaTimes onClick={closeModal} />
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
