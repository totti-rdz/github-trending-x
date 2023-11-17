type Option = {
  label: string;
  value: string;
};

type Props = {
  className?: string;
  label?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  value: string;
};

const Select = ({
  label,
  name,
  onChange,
  options,
  value,
}: Props) => {
  return (
    <>
      {!!label && <label htmlFor={name + '-select'}>{label}</label>}
      <select
        name={name}
        id={name + '-select'}
        className="rounded-lg bg-accent-600 px-2 py-1"
        value={value}
        onChange={onChange}
      >
        {options.map(({ label, value }) => {
          return (
            <option value={value} key={value}>
              {label}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
