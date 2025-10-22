import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  className?:string;
};

const MYInput = ({ name, type, label, placeholder, className }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} placeholder={placeholder} id={name} className={className} />
            {error && <small style={{ color: "red" }}>{error?.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default MYInput;
