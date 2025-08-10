import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Mail, Lock, User as UserIcon, Loader2 } from 'lucide-react';
import { setCredentials } from '../../store/slices/authSlices';
import AuthLayout from '../../components/layout/AuthLayout';
import { AUTH_API_URL } from '../../utils/constant';
import { FormInput } from '../../components/ui/FormInput';

const SignupPage = () => {
  // --- FORM STATE ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- API STATE ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- REDUX & ROUTING ---
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to homepage or dashboard
    }
  }, [isAuthenticated, navigate]);

  // --- FORM SUBMISSION HANDLER ---
  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, 
      };
      const { data } = await axios.post(
        `${AUTH_API_URL}/register`,
        { name, email, password },
        config
      );
      
      dispatch(setCredentials(data.user));

      navigate('/');

    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Join the Community."
      subtitle="Create an account to start your shopping adventure and enjoy exclusive member benefits."
      imageUrl="https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    >
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Create an account</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Login here
            </Link>
          </p>
        </div>
        
        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          <FormInput icon={UserIcon} type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <FormInput icon={Mail} type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <FormInput icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {/* --- ERROR DISPLAY --- */}
          {error && (
            <div className="text-center text-sm text-red-500 dark:text-red-400">
              {error}
            </div>
          )}

          {/* --- SUBMIT BUTTON WITH LOADING STATE --- */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105 disabled:opacity-75 disabled:scale-100"
          >
            {loading && <Loader2 className="animate-spin" size={20} />}
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;