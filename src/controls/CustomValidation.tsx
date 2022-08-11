import { Alert } from "@mui/material";
import React from "react";

interface IProps {
  messages: string[];
}

export default class CustomValidation extends React.Component<IProps> {
  render() {
    const { messages } = this.props;

    return (
      <Alert severity="error">
        <ul>
          {messages.map((message, idx) => {
            return <li key={idx}>{message}</li>;
          })}
        </ul>
      </Alert>
    );
  }
}
