import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

interface TSelectProps {
  name: string;
  label: string;
  title: string;
  nameOptions?:
    | {
        value: string;
        label: string;
        disabled?: boolean;
      }[]
    | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
}

const MYSelect = ({
  label,
  name,
  nameOptions,
  title,
  disabled,
  mode,
}: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            placeholder={title}
            style={{ width: "100%" }}
            {...field}
            options={nameOptions}
            size="middle"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default MYSelect;
