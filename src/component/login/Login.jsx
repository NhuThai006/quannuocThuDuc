import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({
        email: false,
        password: false
    });

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setError('');
        setFieldErrors(prev => ({
            ...prev,
            [name]: false
        }));
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFieldErrors({
            email: false,
            password: false
        });

        // Kiểm tra định dạng email
        if (!formData.email.endsWith('@gmail.com')) {
            setError('Email phải có định dạng @gmail.com');
            toast.error('Email phải có định dạng @gmail.com');
            setFieldErrors(prev => ({
                ...prev,
                email: true
            }));
            emailRef.current?.focus();
            return;
        }

        if (formData.email === 'user@gmail.com' && formData.password === '1212') {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userId', 'default_user');
            navigate('/shops');
            toast.success('Đăng nhập thành công!');
            return;
        }

        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(
                u => u.email === formData.email && u.password === formData.password
            );

            if (user) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userId', user.email);
                navigate('/shops');
                toast.success('Đăng nhập thành công!');
            } else {
                setError('Email hoặc mật khẩu không chính xác!');
                toast.error('Email hoặc mật khẩu không chính xác!');
                setFieldErrors({
                    email: true,
                    password: true
                });
                emailRef.current?.focus();
            }
        } catch (error) {
            setError('Đăng nhập thất bại! Vui lòng thử lại');
            toast.error('Đăng nhập thất bại! Vui lòng thử lại');
        }
    };

    const getInputClassName = (fieldName) => `w-full px-3 py-1.5 text-sm border rounded-md outline-none
        ${fieldErrors[fieldName] 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:border-blue-500'
        }`;

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-[#FFF5E1]">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm mx-4">
                {/* Logo và Tiêu đề */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-amber-600 mb-1">Drink Shop</h1>
                    <p className="text-gray-600 text-sm">Chào mừng bạn trở lại!</p>
                </div>

                {/* Hiển thị lỗi nếu có */}
                {error && <div className="mb-4 text-center text-red-500 text-sm">{error}</div>}

                {/* Form đăng nhập */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                            Email:
                        </label>
                        <input
                            ref={emailRef}
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={getInputClassName('email')}
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                            Mật khẩu:
                        </label>
                        <input
                            ref={passwordRef}
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={getInputClassName('password')}
                            placeholder="Nhập mật khẩu của bạn"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="h-3 w-3 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-xs text-gray-700">
                                Ghi nhớ đăng nhập
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-amber-600 text-white py-1.5 px-4 text-sm rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-300"
                    >
                        Đăng nhập
                    </button>

                    <div className="text-center text-sm text-gray-600">
                        Chưa có tài khoản?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="text-amber-600 hover:text-amber-700 font-medium"
                        >
                            Đăng ký
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
