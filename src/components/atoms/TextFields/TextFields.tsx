import { Field } from "./TextFields.styles";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

export default function TextField({label, error, id, ...rest}: Props) {
    return (
      <Field invalid={Boolean(error)}>
        <label htmlFor={id}>{label}</label>
        <input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...rest} />
        {error && <small id={`${id}-error`}>{error}</small>}
      </Field>
    );
  }