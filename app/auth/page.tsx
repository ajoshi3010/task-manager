'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setErrorMessage(''); // Reset error message on toggle
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const url = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          // Redirect to homepage or task page
          window.location.href = '/'; // Change as necessary
        } else {
          // Notify user of successful registration
          alert('Registration successful! You can now log in.');
          toggleForm(); // Switch to login form
        }
      } else {
        setErrorMessage(data.error || 'Something went wrong!');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-600 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {errorMessage && (
          <div className="bg-red-200 text-red-800 p-2 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1 text-gray-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
              disabled={loading} // Disable input while loading
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-1 text-gray-500">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
              disabled={loading} // Disable input while loading
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all duration-300 w-full"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'} {/* Display loading state */}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-800">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            onClick={toggleForm}
            className="text-blue-500 hover:underline ml-1"
            disabled={loading} // Disable form toggle while loading
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
