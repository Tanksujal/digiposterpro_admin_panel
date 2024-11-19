import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Add the updated styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const apiurl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true);
    setErrorMessage('');
    const obj = { email, password };

    try {
      const response = await axios.post(`${apiurl}/auth/loginUseradmin`, obj, { withCredentials: true });

      if (response.data.success) {
        navigate('/dashboard');
      } else {
        setErrorMessage(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="auth-box">
        <div className="logo-container">
          <img src="../../f.png" alt="Logo" className="logo" />
        </div>
        <h2 className="login-heading">Login to Your Account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="forgot-password">
          <button className="btn-recover">Forgot Password?</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
