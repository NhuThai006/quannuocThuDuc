import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shops } from '../../data/dataAllShopDrink';
import iconnew from '../../assets/images/icon-new.gif';
import caffe from '../../assets/images/caffe.jpg';
import tea from '../../assets/images/tea.jpg';
import juice from '../../assets/images/juice.jpg';

import { toast } from 'react-toastify';
import OrderDrink from '../OrderDrink/OrderDrink';

function ShopDrinkDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const shop = shops.find((s) => s.id === parseInt(id));

    const newItemsMap = useMemo(() => {
        const result = new Map();
        Object.entries(shop?.menu || {}).forEach(([category, items]) => {
            const numberOfNewItems = Math.floor(Math.random() * 2) + 1;
            const selectedIndexes = new Set();

            while (selectedIndexes.size < numberOfNewItems && selectedIndexes.size < items.length) {
                const randomIndex = Math.floor(Math.random() * items.length);
                selectedIndexes.add(`${category}-${randomIndex}`);
            }

            result.set(category, selectedIndexes);
        });
        return result;
    }, [shop]);

    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: '',
        user: '',
    });
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showOrderModal, setShowOrderModal] = useState(false);

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (!newReview.comment.trim() || !newReview.user.trim()) {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        const review = {
            ...newReview,
            date: new Date().toLocaleDateString('vi-VN'),
        };

        shop.reviews.unshift(review);

        setNewReview({
            rating: 5,
            comment: '',
            user: '',
        });
        setShowReviewForm(false);
        toast.success('Cảm ơn bạn đã đánh giá!');
    };

    const handleAddItem = (item) => {
        const existingItem = selectedItems.find(i => i.name === item.name);
        if (existingItem) {
            setSelectedItems(selectedItems.map(i => 
                i.name === item.name 
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            ));
        } else {
            setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
        }
        toast.success(`Đã thêm ${item.name} vào giỏ hàng`);
    };

    const handleRemoveItem = (item) => {
        const existingItem = selectedItems.find(i => i.name === item.name);
        if (existingItem.quantity > 1) {
            setSelectedItems(selectedItems.map(i => 
                i.name === item.name 
                    ? { ...i, quantity: i.quantity - 1 }
                    : i
            ));
        } else {
            setSelectedItems(selectedItems.filter(i => i.name !== item.name));
        }
    };

    const calculateTotal = () => {
        return selectedItems.reduce((total, item) => {
            const price = parseInt(item.price.replace(/\D/g, ''));
            return total + (price * item.quantity);
        }, 0);
    };

    const handleConfirmOrder = (orderInfo) => {
        const newOrder = {
            id: Date.now(),
            orderDate: new Date().toLocaleDateString('vi-VN'),
            status: 'Đang xử lý',
            customerInfo: orderInfo,
            items: selectedItems,
            total: calculateTotal(),
            shopId: shop.id,
            shopName: shop.name
        };

        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        
        const updatedOrders = [newOrder, ...existingOrders];
        
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        
        setSelectedItems([]);
        navigate('/orders');
    };

    if (!shop) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-amber-800 mb-4">Không tìm thấy thông tin quán</h2>
                    <button
                        onClick={() => navigate('/shops')}
                        className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition"
                    >
                        Quay lại danh sách
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header với ảnh cover */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    <div className="relative h-[400px]">
                        <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                        <button
                            onClick={() => navigate('/shops')}
                            className="absolute top-4 left-4 bg-white/90 p-3 rounded-full hover:bg-white transition shadow-lg"
                        >
                            <svg
                                className="w-6 h-6 text-amber-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h1 className="text-4xl font-bold text-white mb-2">{shop.name}</h1>
                            <p className="text-white/90 text-lg">{shop.description}</p>
                        </div>
                    </div>
                    <div className="p-6 bg-white border-t border-gray-100">
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center">
                                <svg
                                    className="w-6 h-6 text-amber-600 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-gray-700">{shop.hours}</span>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    className="w-6 h-6 text-amber-600 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                </svg>
                                <span className="text-gray-700">{shop.address}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-amber-800 mb-8 text-center">Menu</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Object.entries(shop.menu).map(([category, items]) => {
                            let categoryImage;
                            switch (category) {
                                case 'coffee':
                                    categoryImage = caffe;
                                    break;
                                case 'tea':
                                    categoryImage = tea;
                                    break;
                                case 'juice':
                                    categoryImage = juice;
                                    break;
                                default:
                                    categoryImage = caffe;
                            }

                            return (
                                <div key={category} className="bg-amber-50 rounded-lg overflow-hidden">
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={categoryImage}
                                            alt={category}
                                            className="w-full h-full object-cover hover:scale-110 transition duration-500"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-amber-800 mb-4 capitalize border-b-2 border-amber-200 pb-2">
                                            {category}
                                        </h3>
                                        <div className="space-y-4">
                                            {items.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                                                >
                                                    <span className="text-gray-800 font-medium flex items-center gap-2">
                                                        {newItemsMap.get(category).has(`${category}-${index}`) && (
                                                            <img
                                                                src={iconnew}
                                                                alt="iconnew"
                                                                className="w-7 h-4 object-cover"
                                                            />
                                                        )}
                                                        {item.name}
                                                    </span>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-amber-600 font-bold">{item.price}</span>
                                                        <button
                                                            onClick={() => handleAddItem(item)}
                                                            className="px-3 py-1 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Tiện ích Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-amber-800 mb-8 text-center">Tiện ích</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {shop.facilities.map((facility, index) => (
                            <div
                                key={index}
                                className="px-6 py-3 bg-amber-50 text-amber-800 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition"
                            >
                                {facility}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Đánh giá Section */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-amber-800 text-center">
                            Đánh giá từ khách hàng
                        </h2>
                        <button
                            onClick={() => setShowReviewForm(true)}
                            className="w-full sm:w-auto bg-amber-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-amber-600 transition flex items-center justify-center gap-2"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5" 
                                viewBox="0 0 20 20" 
                                fill="currentColor"
                            >
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                            </svg>
                            <span className="hidden sm:inline">Viết đánh giá</span>
                            <span className="sm:hidden">Đánh giá</span>
                        </button>
                    </div>

                    {/* Form đánh giá */}
                    {showReviewForm && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4">
                                <h3 className="text-2xl font-bold text-amber-800 mb-6">Đánh giá của bạn</h3>
                                <form onSubmit={handleSubmitReview} className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Tên của bạn</label>
                                        <input
                                            type="text"
                                            value={newReview.user}
                                            onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2">Đánh giá</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                                    className="focus:outline-none"
                                                >
                                                    <svg
                                                        className={`w-8 h-8 ${
                                                            star <= newReview.rating
                                                                ? 'text-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2">Nhận xét của bạn</label>
                                        <textarea
                                            value={newReview.comment}
                                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 h-32"
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowReviewForm(false)}
                                            className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                                        >
                                            Gửi đánh giá
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Danh sách đánh giá hiện tại */}
                    <div className="grid gap-6 max-w-4xl mx-auto">
                        {shop.reviews.map((review, index) => (
                            <div key={index} className="bg-amber-50 rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-bold text-lg text-amber-800">{review.user}</span>
                                    <span className="text-amber-600">{review.date}</span>
                                </div>
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Thêm giỏ hàng và nút thanh toán */}
                {selectedItems.length > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
                        <div className="container mx-auto max-w-6xl flex justify-between items-center">
                            <div>
                                <span className="font-bold text-amber-800">Tổng cộng: {calculateTotal()}đ</span>
                                <span className="text-gray-600 ml-2">({selectedItems.reduce((total, item) => total + item.quantity, 0)} món)</span>
                            </div>
                            <button
                                onClick={() => setShowOrderModal(true)}
                                className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition"
                            >
                                Thanh toán
                            </button>
                        </div>
                    </div>
                )}

                {/* Modal đặt hàng */}
                <OrderDrink
                    isOpen={showOrderModal}
                    onClose={() => setShowOrderModal(false)}
                    selectedItems={selectedItems}
                    total={calculateTotal()}
                    onConfirmOrder={handleConfirmOrder}
                />
            </div>
        </div>
    );
}

export default ShopDrinkDetail;
