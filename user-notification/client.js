const ws = new WebSocket('ws://127.0.0.1:8000');

ws.onopen = () =>{
    console.log('WebSocket Connected')
}

ws.onmessage = (event) =>{
  const message = JSON.parse(event.data);
      console.log('Received message:', message);
}

ws.onclose = () => {
      console.log('WebSocket connection closed');
    };