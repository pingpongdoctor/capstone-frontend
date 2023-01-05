import "./InputBox.scss";

export default function InputBox({
  inputClassName,
  inputValue,
  inputOnChange,
  inputId,
  inputType,
  inputName,
  inputPlaceholder,
  inputOnWheel,
}) {
  return (
    <input
      className={inputClassName}
      value={inputValue}
      onChange={inputOnChange}
      onWheel={inputOnWheel}
      id={inputId}
      type={inputType}
      name={inputName}
      placeholder={inputPlaceholder}
    />
  );
}
