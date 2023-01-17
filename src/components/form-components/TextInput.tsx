import { useController, UseControllerProps } from "react-hook-form";
import TextField, { TextFieldType } from "../TextInput";

const FormTextInput = (props: TextFieldType & UseControllerProps) => {
  const {
    field: { value, onChange },
  } = useController(props);

  return <TextField {...props} value={value || ""} onChange={onChange} />;
};

export default FormTextInput;
