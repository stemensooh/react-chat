import { Form, Button, FormControl, InputGroup } from "react-bootstrap";
import { useState } from "react";

export const SendMessageForm = ({ sendMessage }: any) => {
  const [message, setMessage] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
      }}
    >
      <InputGroup>
        <FormControl
          type="user"
          placeholder="message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <InputGroup>
          <Button variant="primary" type="submit" disabled={!message}>
            Send
          </Button>
        </InputGroup>
      </InputGroup>
    </Form>
  );
};
