// App.js
import React from 'react';
import './App.css';
import Register from './components/Register'; // Import Register component
import SignIn from './components/SignIn';


function App() {
  return (
    <div className="App">
      <Register /> {/* Use Register component */}
    </div>
  );
}

export default App;
