import { ComponentProps } from "react";

type ButtonProps = {} & Omit<ComponentProps<"button">, "type">;

const SubmitButton = (props: ButtonProps) => (
  <button {...props} type="submit" />
);

export default SubmitButton;
