import { type ErrorComponentProps } from "@tanstack/react-router";
import { HTTPError } from "ky";

const Error = ({ error }: ErrorComponentProps) => {
  if (error instanceof Response) {
    return <p>{error.statusText}</p>;
  } else if (error instanceof HTTPError) {
    return <p>{error.response.statusText}</p>;
  }
  return <p>Unknown error</p>;
};

export default Error;
