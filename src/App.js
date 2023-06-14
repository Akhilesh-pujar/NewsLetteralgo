
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Newsletter from './Component/Newsletter/Newsletter';
import React, { useEffect } from 'react';


function App() {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/');
    ws.onopen = () => {
      console.log('WebSocket connection established');
      ws.send('Hello, server!');
    };
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Received message:', message);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    const message = { action: 'insert', payload: { name: 'John', age: 30 } };
    ws.send(JSON.stringify(message));
    return () => {
      ws.close();
    };
    
  }, []);

  return (
    <Newsletter/>
  );
}

export default App;
