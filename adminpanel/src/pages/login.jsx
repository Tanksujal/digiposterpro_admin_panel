import axios from 'axios';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const apiurl = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true);
    setErrorMessage('');
    let obj = {
        email,password
    }
    try {
      const response = await axios.post(`${apiurl}/auth/loginUseradmin`,obj,{ withCredentials: true });

      if (response.data.success) {
        navigate('/dashboard')
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
    <div>
      <div className="main-wrapper">
        <div className="auth-wrapper d-flex no-block justify-content-center align-items-center bg-dark">
          <div className="auth-box bg-dark border-top border-secondary">
            <div id="loginform">
              <div className="text-center pt-3 pb-3">
                <span className="db">
                  <img src="../assets/images/logo.png" alt="logo" />
                </span>
              </div>
              <form
                className="form-horizontal mt-3"
                id="loginform"
                onSubmit={handleSubmit}
              >
                <div className="row pb-4">
                  <div className="col-12">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-success text-white h-100">
                          <i className="mdi mdi-account fs-4" />
                        </span>
                      </div>
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-warning text-white h-100">
                          <i className="mdi mdi-lock fs-4" />
                        </span>
                      </div>
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                {errorMessage && (
                  <div className="text-danger text-center mb-3">
                    {errorMessage}
                  </div>
                )}
                <div className="row border-top border-secondary">
                  <div className="col-12">
                    <div className="form-group">
                      <div className="pt-3">
                        <button
                          className="btn btn-info"
                          id="to-recover"
                          type="button"
                        >
                          <i className="mdi mdi-lock fs-4 me-1" /> Lost
                          password?
                        </button>
                        <button
                          className="btn btn-success float-end text-white"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? 'Logging in...' : 'Login'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* Add recover password form if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
