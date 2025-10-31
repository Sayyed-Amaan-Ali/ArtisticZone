import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role:'' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const endpoint = isLogin ? 'http://localhost:8080/api/auth/login' : 'http://localhost:8080/api/auth/register';
    try {
      const res = await axios.post(endpoint, form);
      localStorage.setItem('user', res.data.fullName);
      console.log(res.data);
      navigate('/');
    } catch(e) {
      console.log(e);
      alert('Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {!isLogin && (
          <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="role"
            placeholder="Role Name"
            value={form.role}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded"
          />
          </div>

        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-center text-sm text-blue-500 cursor-pointer"
        >
          {isLogin ? 'New user? Register here' : 'Already registered? Login here'}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
