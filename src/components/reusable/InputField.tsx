import { type InputFieldProps } from "../../types";
import classes from "./resuable.module.css";


export default function InputField({
  label,
  placeholder,
  required = false,
  type = 'text',
  options = [],
  value,
  onChange,
}: InputFieldProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div>
      <label>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      {type === 'select' ? (
        <select
          value={value}
          onChange={handleInputChange}
          className={classes["input-field"]}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange}
          className={classes["input-field"]}
        />
      )}
    </div>
  );
}
