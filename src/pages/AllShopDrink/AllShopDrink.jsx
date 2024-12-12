import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { shops } from '../../data/dataAllShopDrink';
import { useNavigate } from 'react-router-dom';

function AllShopDrink({ onLogout }) {
    const [visibleShops, setVisibleShops] = useState(9);
    const [showNewShop, setShowNewShop] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const newShopRef = useRef(null);
    const navigate = useNavigate();

    // Lọc shops để chỉ hiển thị 11 shop đầu tiên, shop cuối chỉ hiện khi showNewShop = true
    const displayedShops = shops.filter((shop, index) => {
        if (index < 11) return true;
        return showNewShop;
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            toast.info(
                <div>
                    <p className="font-semibold mb-2">Quán Last Minute vừa khai trương! 🎉</p>
                    <button
                        className="bg-amber-500 text-white px-4 py-1 rounded-lg hover:bg-amber-600"
                        onClick={() => {
                            setShowNewShop(true);
                            setVisibleShops(12);
                            setSearchTerm('');
                            setTimeout(() => {
                                const lastShop = shops[shops.length - 1];
                                if (lastShop && lastShop.isNew && newShopRef.current) {
                                    newShopRef.current.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'center',
                                    });
                                }
                            }, 100);
                        }}
                    >
                        Xem ngay
                    </button>
                </div>,
                {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    closeOnClick: true,
                },
            );
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Lọc danh sách quán dựa trên từ khóa tìm kiếm và danh sách đã được lọc
    const filteredShops = displayedShops.filter((shop) => shop.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleViewDetail = (shopId) => {
        navigate(`/shops/${shopId}`);
    };

    const handleLogout = () => {
        try {
            onLogout();
            toast.success('Đăng xuất thành công!');
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
            toast.error('Có lỗi xảy ra khi đăng xuất!');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header với các nút điều hướng */}
                <div className="flex items-center justify-end gap-4">
                    <button
                        onClick={() => navigate('/orders')}
                        className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition shadow-lg flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path
                                fillRule="evenodd"
                                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="hidden sm:inline">Đơn hàng của tôi</span>
                        <span className="sm:hidden">Đơn hàng</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-lg flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="hidden sm:inline">Đăng xuất</span>
                    </button>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                    <div className="text-center flex-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-2">
                            Khám Phá Quán Nước Thủ Đức
                        </h1>
                        <p className="text-amber-700">Những điểm đến lý tưởng cho người yêu đồ uống</p>
                    </div>
                </div>

                {/* Thanh tìm kiếm */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm quán..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                        />
                        <svg
                            className="absolute right-3 top-2.5 h-5 w-5 text-amber-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Hiển thị kết quả tìm kiếm */}
                {searchTerm && (
                    <div className="text-center mb-4">
                        <p className="text-amber-700">
                            {filteredShops.length > 0
                                ? `Tìm thấy ${filteredShops.length} kết quả cho "${searchTerm}"`
                                : `Không tìm thấy kết quả nào cho "${searchTerm}"`}
                        </p>
                    </div>
                )}

                {/* Grid layout cho danh sách quán */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(searchTerm ? filteredShops : displayedShops.slice(0, visibleShops)).map((shop) => (
                        <div
                            key={shop.id}
                            ref={shop.isNew ? newShopRef : null}
                            className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl ${
                                shop.isNew ? 'ring-2 ring-amber-500' : ''
                            }`}
                        >
                            {/* Ảnh quán */}
                            <div className="relative h-48 overflow-hidden">
                                <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                    <h2 className="text-xl font-bold text-white">
                                        {shop.name}
                                        {shop.isNew && (
                                            <span className="ml-2 inline-block bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                                                Mới
                                            </span>
                                        )}
                                    </h2>
                                </div>
                            </div>

                            {/* Thông tin quán */}
                            <div className="p-5 space-y-3">
                                <div className="flex items-start space-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <p className="text-sm text-gray-600">{shop.address}</p>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-amber-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <p className="text-sm text-gray-600">{shop.hours}</p>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-amber-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <p className="text-sm font-medium text-amber-700">{shop.price}</p>
                                </div>

                                {/* Nút xem chi tiết */}
                                <button
                                    onClick={() => handleViewDetail(shop.id)}
                                    className="mt-4 w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition duration-300 text-sm font-medium"
                                >
                                    Xem Chi Tiết
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hiển thị nút "Xem thêm" khi không có tìm kiếm */}
                {!searchTerm && visibleShops < displayedShops.length && (
                    <div className="text-center mt-8">
                        <button
                            onClick={() => setVisibleShops((prev) => prev + 3)}
                            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition duration-300"
                        >
                            Xem thêm
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllShopDrink;
