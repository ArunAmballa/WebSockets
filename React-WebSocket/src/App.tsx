import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages,setMessages]=useState("")
  const [sendMessage,setSendMessage]=useState("");

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      setSocket(newSocket)
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setMessages(message.data);
    }
    return () => newSocket.close();
  }, [])

  if(!socket){
    return (
      <div>
        <h1>Connecting to Web Socket Server</h1>
      </div>
    )
  }

  return (
    <>
    <input type="text" id="message" onChange={(e)=>setSendMessage(e.target.value)}/>
    <button onClick={()=>socket.send(sendMessage)}>Send Message</button>
      <h1>Latest Message:{messages}</h1>
    </>
  )
}

export default App