import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../components/Auth/Auth.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await login(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      alert(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="bg-animation">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      
      <div className="auth-container">
        <div className="logo-section">
          <div className="logo">
            <i className="fas fa-check-double"></i>
          </div>
          <h1>TaskFlow</h1>
          <p>Organize your life, one task at a time</p>
        </div>

        <div className="auth-box">
          <h2>Welcome Back</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <i className="fas fa-envelope input-icon"></i>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <i className="fas fa-lock input-icon"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot" className="forgot-link">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <>
                  <span>Login</span>
                  <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>

          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-buttons">
              <button className="social-btn" onClick={() => alert('Google login coming soon!')}>
                <i className="fab fa-google"></i>
              </button>
              <button className="social-btn" onClick={() => alert('GitHub login coming soon!')}>
                <i className="fab fa-github"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;