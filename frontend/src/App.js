// frontend/src/App.js
import React, { useState } from 'react';

function App() {
  const [response, setResponse] = useState('');

  const checkBackend = async () => {
    try {
      const res = await fetch(`/api/health`);
      const data = await res.json();
      setResponse(JSON.stringify(data));
    } catch (err) {
      setResponse(err.toString());
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Hello World from Frontend</h1>
      <button onClick={checkBackend}>Check Backend</button>
      <p>{response}</p>
    </div>
  );
}

export default App;

