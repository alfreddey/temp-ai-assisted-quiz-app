import { classNames } from "../../../lib/classNames";

interface SegmentedControlProps {
  legend: string;
  name: string;
  value: number;
  options: readonly number[];
  onChange: (value: number) => void;
  disabled: boolean;
}

/** A row of radio buttons styled as one pill, used for small numeric choices. */
export function SegmentedControl({
  legend,
  name,
  value,
  options,
  onChange,
  disabled,
}: SegmentedControlProps) {
  return (
    <fieldset className="segmented">
      <legend className="field__label">{legend}</legend>
      <div className="segmented__track">
        {options.map((option) => (
          <label
            key={option}
            className={classNames("segmented__item", value === option && "is-selected")}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              disabled={disabled}
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
