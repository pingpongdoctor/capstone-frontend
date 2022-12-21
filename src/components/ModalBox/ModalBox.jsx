import "./ModalBox.scss";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import closeIcon from "../../assets/icons/close.png";

export default function ModalBox({
  modalOnClickHandler,
  modalCloseOnClickHandler,
  modalBoxContent,
  modalBtnContent,
}) {
  return (
    <div className="modal-box">
      <div className="modal-box__container">
        <img
          onClick={modalCloseOnClickHandler}
          className="modal-box__close-icon"
          src={closeIcon}
          alt="close-icon"
        />
        <p className="modal-box__content">{modalBoxContent}</p>
        <ButtonComponent
          onClickHandler={modalOnClickHandler}
          btnContent={modalBtnContent}
          btnClassName="btn btn--modal-box"
        />
      </div>
    </div>
  );
}
