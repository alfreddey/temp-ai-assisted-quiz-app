interface SelectFieldProps<T extends string> {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  disabled: boolean;
}

export function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled,
}: SelectFieldProps<T>) {
  return (
    <label className="select">
      <span className="field__label">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
