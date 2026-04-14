import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const res = await login(email, password);

        if (res.success) {
            navigate('/');
        } else {
            setError(res.message || 'Login failed');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
                
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                    Login
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    
                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full p-2 bg-white text-black dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-2 bg-white text-black dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* Register Link */}
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;