import React, { useState } from "react";
const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Simplified login - in real app, implement proper authentication
      const userData = {
        username,
        role: username === 'owner' ? 'owner' : 'worker'
      };
      onLogin(userData);
    };
  
    return (
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

  export default LoginPage;