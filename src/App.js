import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './component/login/Login';
import './index.css';
import AllShopDrink from './pages/AllShopDrink/AllShopDrink';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShopDrinkDetail from './pages/ShopDrinkDetail/ShopDrinkDetail';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import ToTop from '../src/component/totop/Totop';
import { useEffect, useState } from 'react';
import Register from './component/register/Register';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import ScrollToTop from './component/scrolltotop/ScrollToTop';

function App() {
    const [showToTop, setShowToTop] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setShowToTop(window.scrollY > 100);
        });
    });

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
    };

    return (
        <>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route
                        path="/login"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/shops" replace />
                            ) : (
                                <Login setIsAuthenticated={setIsAuthenticated} />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={isAuthenticated ? <Navigate to="/shops" replace /> : <Register />}
                    />
                    <Route
                        path="/shops"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <AllShopDrink onLogout={handleLogout} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/shops/:id"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <ShopDrinkDetail />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <OrderHistory />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {showToTop && <ToTop />}
        </>
    );
}

export default App;
