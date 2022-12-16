import "./InputBox.scss";

export default function InputBox({
  inputClassName,
  inputValue,
  inputOnChange,
  inputId,
  inputType,
  inputName,
  inputPlaceholder,
  inputWrap,
}) {
  return (
    <input
      autoComplete
      className={inputClassName}
      value={inputValue}
      onChange={inputOnChange}
      id={inputId}
      type={inputType}
      name={inputName}
      placeholder={inputPlaceholder}
    />
  );
}
