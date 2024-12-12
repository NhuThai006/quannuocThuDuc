import React from 'react';
import { toast } from 'react-toastify';

function OrderDrink({ isOpen, onClose, selectedItems, total, onConfirmOrder }) {
    const [orderInfo, setOrderInfo] = React.useState({
        name: '',
        phone: '',
        address: '',
        note: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!orderInfo.name || !orderInfo.phone || !orderInfo.address) {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        const userId = localStorage.getItem('userId');
        const orderWithUserId = {
            ...orderInfo,
            userId
        };

        onConfirmOrder(orderWithUserId);
        toast.success('Đặt hàng thành công!');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                    title="Đóng"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-amber-800 mb-6">Thông tin đặt hàng</h2>
                
                {/* Danh sách đồ uống đã chọn */}
                <div className="mb-6 bg-amber-50 p-4 rounded-lg">
                    <h3 className="font-bold text-amber-800 mb-3">Đồ uống đã chọn:</h3>
                    <div className="space-y-2">
                        {selectedItems.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span className="font-medium">{item.price}</span>
                            </div>
                        ))}
                        <div className="border-t border-amber-200 pt-2 mt-2 font-bold text-amber-800 flex justify-between">
                            <span>Tổng cộng:</span>
                            <span>{total}đ</span>
                        </div>
                    </div>
                </div>

                {/* Form thông tin */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Họ tên *</label>
                        <input
                            type="text"
                            value={orderInfo.name}
                            onChange={(e) => setOrderInfo({ ...orderInfo, name: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Số điện thoại *</label>
                        <input
                            type="tel"
                            value={orderInfo.phone}
                            onChange={(e) => setOrderInfo({ ...orderInfo, phone: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Địa chỉ giao hàng *</label>
                        <input
                            type="text"
                            value={orderInfo.address}
                            onChange={(e) => setOrderInfo({ ...orderInfo, address: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Ghi chú</label>
                        <textarea
                            value={orderInfo.note}
                            onChange={(e) => setOrderInfo({ ...orderInfo, note: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 h-24"
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                        >
                            Xác nhận đặt hàng
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OrderDrink;
