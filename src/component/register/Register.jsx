import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    // Thêm state để theo dõi trường nào có lỗi
    const [fieldErrors, setFieldErrors] = useState({
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false
    });

    // Thêm refs cho các input
    const fullNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Reset trạng thái lỗi khi người dùng nhập
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
        setError('');
        
        // Reset tất cả trạng thái lỗi
        setFieldErrors({
            fullName: false,
            email: false,
            password: false,
            confirmPassword: false
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

        // Kiểm tra mật khẩu trùng khớp
        if (formData.password !== formData.confirmPassword) {
            toast.error('Mật khẩu không trùng khớp!');
            setError('Mật khẩu không trùng khớp!');
            setFieldErrors(prev => ({
                ...prev,
                password: true,
                confirmPassword: true
            }));
            passwordRef.current?.focus();
            return;
        }

        // Kiểm tra các trường bắt buộc
        if (formData.fullName && formData.email && formData.password) {
            try {
                const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
                
                if (existingUsers.some(user => user.email === formData.email)) {
                    toast.error('Email này đã được đăng ký!');
                    setError('Email này đã được đăng ký!');
                    setFieldErrors(prev => ({
                        ...prev,
                        email: true
                    }));
                    emailRef.current?.focus();
                    return;
                }

                // Thêm user mới vào danh sách
                const newUser = {
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password
                };
                
                existingUsers.push(newUser);
                localStorage.setItem('users', JSON.stringify(existingUsers));

                toast.success('Đăng ký thành công!');
                navigate('/login');
            } catch (error) {
                toast.error('Đăng ký thất bại! Vui lòng thử lại');
                setError('Đăng ký thất bại! Vui lòng thử lại');
            }
        } else {
            toast.error('Vui lòng nhập đầy đủ thông tin!');
            setError('Vui lòng nhập đầy đủ thông tin!');
            // Set lỗi cho các trường trống
            const newFieldErrors = {
                fullName: !formData.fullName,
                email: !formData.email,
                password: !formData.password,
                confirmPassword: !formData.confirmPassword
            };
            setFieldErrors(newFieldErrors);
            
            // Focus vào trường trống đầu tiên
            if (!formData.fullName) fullNameRef.current?.focus();
            else if (!formData.email) emailRef.current?.focus();
            else if (!formData.password) passwordRef.current?.focus();
            else if (!formData.confirmPassword) confirmPasswordRef.current?.focus();
        }
    };

    // Cập nhật className cho input
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
                    <p className="text-gray-600 text-sm">Tạo tài khoản mới</p>
                </div>

                {/* Hiển thị lỗi nếu có */}
                {error && <div className="mb-4 text-center text-red-500 text-sm">{error}</div>}

                {/* Form đăng ký */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-xs font-medium text-gray-700 mb-1">
                            Họ và tên:
                        </label>
                        <input
                            ref={fullNameRef}
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={getInputClassName('fullName')}
                            placeholder="Nhập họ và tên của bạn"
                            required
                        />
                    </div>

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

                    <div>
                        <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700 mb-1">
                            Xác nhận mật khẩu:
                        </label>
                        <input
                            ref={confirmPasswordRef}
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={getInputClassName('confirmPassword')}
                            placeholder="Nhập lại mật khẩu của bạn"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-amber-600 text-white py-1.5 px-4 text-sm rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-300"
                    >
                        Đăng ký
                    </button>

                    <div className="text-center text-sm text-gray-600">
                        Bạn đã có tài khoản?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="text-amber-600 hover:text-amber-700 font-medium"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
