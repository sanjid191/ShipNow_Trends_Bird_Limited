import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import loginBg from '../assets/login-bg.jpg';
import loginShowcase from '../assets/login-showcase.png';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  
  // Validation / Error States
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Email format validation
  const validateEmail = (val) => {
    if (!val) return 'Email address is required';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) return 'Please enter a valid email address';
    return '';
  };

  // Password validation
  const validatePassword = (val) => {
    if (!val) return 'Password is required';
    if (val.length < 8) return 'Password must be at least 8 characters long';
    return '';
  };

  // Live validation updates
  useEffect(() => {
    if (isSubmitted) {
      setEmailError(validateEmail(email));
    }
  }, [email, isSubmitted]);

  useEffect(() => {
    if (isSubmitted) {
      setPasswordError(validatePassword(password));
    }
  }, [password, isSubmitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passErr);

    if (!emailErr && !passErr) {
      const success = login(email, password);
      if (success) {
        navigate('/', { replace: true });
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-white font-sans overflow-hidden">
      
      {/* Left Column: Brand Showcase (Centered logo, cards, and text) */}
      <div className="w-full lg:w-1/2 bg-[#6366F1] flex flex-col justify-between p-8 sm:p-12 lg:p-14 text-white h-[45vh] lg:h-screen lg:max-h-screen overflow-hidden relative select-none shrink-0">
        
        {/* Header Logo: Centered Slanted parallel bars + SHIPNOW */}
        <div className="flex items-center justify-center gap-3 z-10 shrink-0 w-full">
          <div className="flex items-end gap-1.5 h-6">
            <div className="w-1.5 h-4.5 bg-slate-900/60 rounded-sm transform -skew-x-12" />
            <div className="w-1.5 h-6 bg-white rounded-sm transform -skew-x-12" />
          </div>
          <span className="text-xl font-black font-heading tracking-wider italic leading-none">
            SHIPNOW
          </span>
        </div>

        {/* Central Graphic (Delivery truck base + overlay woman absolute) */}
        <div className="flex justify-center items-center my-auto py-4 z-10 overflow-visible shrink">
          {/* Main Card (Truck) */}
          <div className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[380px] aspect-[4/3.2] shadow-2xl rounded-2xl">
            <img 
              src={loginBg} 
              alt="ShipNow Cargo Deliveries" 
              className="object-cover w-full h-full rounded-2xl border border-white/10"
            />
            {/* Overlay Card (Woman with Phone in top right corner) */}
            <div className="absolute -top-[12%] -right-[12%] w-[45%] aspect-[1/1.1] shadow-2xl border-4 border-white rounded-2xl overflow-hidden bg-slate-100">
              <img 
                src={loginShowcase} 
                alt="ShipNow User Tracking" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Welcome Text: Centered text-center and mx-auto */}
        <div className="space-y-2 z-10 max-w-lg shrink-0 text-center mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-extrabold font-heading tracking-tight leading-tight text-center">
            Welcome to ShipNow
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 font-medium leading-relaxed text-center">
            Manage your shipments, fleet, and warehouse in one smart dashboard.
          </p>
        </div>

        {/* Decorative background graphics */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500 rounded-full filter blur-[150px] opacity-30 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-indigo-800 rounded-full filter blur-[100px] opacity-40 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      </div>

      {/* Right Column: Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white min-h-[55vh] lg:h-screen overflow-y-auto">
        <div className="w-full max-w-[380px] flex flex-col items-center py-6">
          
          {/* Logo Brand Symbol above Welcome text */}
          <div className="flex items-end gap-1.5 h-8 mb-4 shrink-0">
            <div className="w-2 h-6 bg-slate-900 rounded-sm transform -skew-x-12" />
            <div className="w-2 h-8 bg-[#6366F1] rounded-sm transform -skew-x-12" />
          </div>

          <h1 className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight text-center">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-500 text-center font-medium mt-1 mb-8">
            Log in to continue managing your logistics with ShipNow
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
            
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 select-none">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter a valid email address"
                className={`w-full px-3.5 py-3 text-xs bg-[#F8FAFC] border ${
                  emailError ? 'border-red-500 focus:ring-red-100 focus:border-red-500' : 'border-slate-100 focus:ring-primary-100 focus:border-primary-500 focus:bg-white'
                } rounded-xl placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-200`}
              />
              {emailError && (
                <span className="text-xs font-semibold text-red-500 animate-fade-in">
                  {emailError}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 select-none">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className={`w-full px-3.5 py-3 text-xs bg-[#F8FAFC] border ${
                    passwordError ? 'border-red-500 focus:ring-red-100 focus:border-red-500' : 'border-slate-100 focus:ring-primary-100 focus:border-primary-500 focus:bg-white'
                  } rounded-xl placeholder-slate-400 pr-10 focus:outline-none focus:ring-4 transition-all duration-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              {passwordError && (
                <span className="text-xs font-semibold text-red-500 animate-fade-in">
                  {passwordError}
                </span>
              )}
            </div>

            {/* Checkbox & Forgot Link */}
            <div className="flex items-center justify-between text-xs select-none pt-0.5">
              <label className="flex items-center gap-2 font-bold text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4.5 w-4.5 text-primary-600 border-slate-300 rounded focus:ring-primary-500 cursor-pointer"
                />
                Remember Me
              </label>
              <a 
                href="#forgot" 
                className="font-bold text-[#6366F1] hover:text-indigo-700 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#1E293B] hover:bg-slate-900 text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer text-center text-xs mt-2"
            >
              Login
            </button>
          </form>

          {/* Bottom Footer */}
          <div className="mt-8 text-xs font-bold text-slate-500 select-none">
            Don't have an account?{' '}
            <a 
              href="#register" 
              className="font-extrabold text-[#6366F1] hover:text-indigo-700 transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              Register
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}
