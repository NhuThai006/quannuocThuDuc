import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function OrderHistory() {
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('orders');
        const allOrders = savedOrders ? JSON.parse(savedOrders) : [];
        const userId = localStorage.getItem('userId');
        return allOrders.filter((order) => order.customerInfo.userId === userId);
    });
    const navigate = useNavigate();

    const handleCancelOrder = (orderId) => {
        const isConfirmed = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?');
        if (isConfirmed) {
            const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
            const updatedAllOrders = allOrders.map((order) =>
                order.id === orderId ? { ...order, status: 'Đã hủy' } : order,
            );

            localStorage.setItem('orders', JSON.stringify(updatedAllOrders));

            const userId = localStorage.getItem('userId');
            const userOrders = updatedAllOrders.filter((order) => order.customerInfo.userId === userId);
            setOrders(userOrders);

            toast.success('Đã hủy đơn hàng thành công!');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Đang xử lý':
                return 'text-yellow-600 bg-yellow-100';
            case 'Đã hủy':
                return 'text-red-600 bg-red-100';
            case 'Hoàn thành':
                return 'text-green-600 bg-green-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                    <h1 className="text-3xl font-bold text-amber-800">Lịch sử đơn hàng</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate('/shops')}
                            className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
                        >
                            Quay lại cửa hàng
                        </button>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <p className="text-gray-600 mb-4">Bạn chưa có đơn hàng nào</p>
                        <button
                            onClick={() => navigate('/shops')}
                            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition"
                        >
                            Đặt hàng ngay
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-amber-800 mb-2">Đơn hàng #{order.id}</h3>
                                        <p className="text-gray-600">Đặt ngày: {order.orderDate}</p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                            order.status,
                                        )}`}
                                    >
                                        {order.status}
                                    </span>
                                </div>

                                <div className="border-t border-gray-200 pt-4 mb-4">
                                    <h4 className="font-medium text-gray-800 mb-2">Thông tin người đặt:</h4>
                                    <p className="text-gray-600">Họ tên: {order.customerInfo.name}</p>
                                    <p className="text-gray-600">SĐT: {order.customerInfo.phone}</p>
                                    <p className="text-gray-600">Địa chỉ: {order.customerInfo.address}</p>
                                    {order.customerInfo.note && (
                                        <p className="text-gray-600">Ghi chú: {order.customerInfo.note}</p>
                                    )}
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <h4 className="font-medium text-gray-800 mb-2">Đồ uống đã đặt:</h4>
                                    <div className="space-y-2">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex justify-between text-gray-600">
                                                <span>
                                                    {item.name} x {item.quantity}
                                                </span>
                                                <span>{item.price}</span>
                                            </div>
                                        ))}
                                        <div className="border-t border-gray-200 pt-2 mt-2 font-bold text-amber-800 flex justify-between">
                                            <span>Tổng cộng:</span>
                                            <span>{order.total}đ</span>
                                        </div>
                                    </div>
                                </div>

                                {order.status === 'Đang xử lý' && (
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={() => handleCancelOrder(order.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                        >
                                            Hủy đơn hàng
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderHistory;
