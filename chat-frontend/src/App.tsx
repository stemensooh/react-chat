import { useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Chat } from "./components/Chat";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Lobby } from "./components/Lobby";

function App() {
  const [stateConnection, setStateConnection] = useState(false)
  const [connection, setConnection] = useState({} as HubConnection);
  const [messages, setMessages] = useState([] as any);
  const [users, setUsers] = useState([]);

  const joinRoom = async (user: string, room: string) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44382/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        // console.log("ReceiveMessage", {user, message});
        setMessages((messages: []) => [...messages, {user, message}]);
        // setMessages([...messages]);
      });

      connection.on("UsersInRoom", (users) => {
        // console.log("UsersInRoom", users);
        setUsers(users);
      });

      connection.onclose((e) => {
        setStateConnection(false);
        setConnection({} as HubConnection);
        setMessages([]);
        setUsers([]);
      });

      await connection.start().then(async () => {
        
        await connection.invoke("JoinRoom", { user, room });
        // console.log('JoinRoom',connection );
      });
      // await 
      setConnection(connection);
      setStateConnection(true);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (message: string) => {
    console.log(message);
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="app">
      <h2>MyChat</h2>
      <hr className="line" />
      {!stateConnection ? (
        <Lobby joinRoom={joinRoom} />
      ) : (
        <Chat
          sendMessage={sendMessage}
          messages={messages}
          users={users}
          closeConnection={closeConnection}
        />
      )}
    </div>
  );
}

export default App;
