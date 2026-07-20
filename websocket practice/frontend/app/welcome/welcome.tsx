import { useState, useRef, useEffect } from "react";

export function Welcome() {
  const [message, setMessage] = useState("");
  const socketRef = useRef<WebSocket | null>(null);
  const [receivedMessage, setReceivedMessage] = useState("");

 
 
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const port = params.get("port") || "8080";

    socketRef.current = new WebSocket(`ws://localhost:${port}`);
    socketRef.current.onopen = () => {
      console.log("Connected to server");
    };
    socketRef.current.onmessage = (event) => {
      console.log(event.data);
      const data = JSON.parse(event.data);
      console.log(data.message);
      setReceivedMessage(data.message);
    };
    socketRef.current.onclose = () => {
      console.log("Disconnected from server");
    };
    socketRef.current.onerror = (error) => {
      console.log(error);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current) {
      socketRef.current.send(message);
      setMessage("");
    }
  };
  return (
    <>
      <h1 className="text-3xl font-bold italic text-center mt-6">WebSocket Practice</h1>
      <div className="flex items-center justify-center mt-5">
        <input type="text" id="input-msg" placeholder="Enter message" className="border p-2 rounded" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2" onClick={sendMessage}>Send</button>
      </div>
      <div className="flex items-center justify-center mt-5">
        <p className="text-xl font-bold">Received Message: {receivedMessage}</p>
      </div>
    </>

  );
}


