import "./ButtonComponent.scss";

export default function ButtonComponent({
  onClickHandler,
  btnClassName,
  btnContent,
  btnName,
  onSubmitHandler,
  btnType,
}) {
  return (
    <button
      type={btnType}
      className={btnClassName}
      name={btnName}
      onSubmit={onSubmitHandler}
      onClick={onClickHandler}
    >
      {btnContent}
    </button>
  );
}
