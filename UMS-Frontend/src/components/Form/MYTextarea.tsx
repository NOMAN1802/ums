import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  type?: string;
  placeHolder: string;
  label?: string;
};

const MYTextArea = ({ name, label, placeHolder }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <TextArea placeholder={placeHolder} {...field} id={name} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default MYTextArea;
