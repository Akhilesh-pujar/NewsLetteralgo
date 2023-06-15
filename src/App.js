
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Newsletter from './Component/Newsletter/Newsletter';
import React, { useEffect} from 'react';

function App() {
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/');
    ws.addEventListener('open',() =>{
      console.log("Connection Opened");
    })
    ws.addEventListener('error',(error)=>{
      console.log('WebSocket error' , error)
    })
    ws.addEventListener('message',(message)=>{
      const message2 = JSON.parse(message);
      console.log('Received message:', message2);
    })
    ws.addEventListener('close',()=>{
      console.log('Connection Closed')
    })
    
    
    return () => {
      ws.close();
    };
    
  }, []);

  return (
    <Newsletter/>
  );
}

export default App;
