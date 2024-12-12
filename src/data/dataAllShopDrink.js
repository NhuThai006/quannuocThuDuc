import bamoscofe from '../assets/images/bamoscofe.jpg';
import cafelam from '../assets/images/cafelam.jpg';
import cafelastminute from '../assets/images/cafelastminute.jpg';
import cafemeoi from '../assets/images/cafemeoi.jpg';
import cafethi from '../assets/images/cafethi.jpg';
import cafeupao from '../assets/images/cafeupao.jpg';
import cancafe from '../assets/images/cancoffe.jpg';
import domesaigon from '../assets/images/domesaigon.jpg';
import elmarcoffe from '../assets/images/elmar coffe.jpg';
import goctinhyen from '../assets/images/goctinhyen.jpg';
import izycafe from '../assets/images/izycafe.jpg';
import loganstion from '../assets/images/logansation.jpg';

export const shops = [
    {
        id: 1,
        name: 'Cafe Thị',
        address: '18/80 tổ 8, Khu Phố 6, Thủ Đức, Hồ Chí Minh',
        hours: '08h00 - 22h00',
        price: '20.000đ - 55.000đ',
        image: cafethi,
        description: 'Quán cafe ấm cúng với không gian xanh mát, phù hợp để học tập và làm việc.',
        menu: {
            coffee: [
                { name: 'Cà phê đen', price: '20.000đ' },
                { name: 'Cà phê sữa', price: '25.000đ' },
                { name: 'Bạc xỉu', price: '30.000đ' },
            ],
            tea: [
                { name: 'Trà đào', price: '35.000đ' },
                { name: 'Trà vải', price: '35.000đ' },
            ],
            juice: [
                { name: 'Sinh tố bơ', price: '45.000đ' },
                { name: 'Nước ép cam', price: '40.000đ' },
            ],
        },
        facilities: ['Wifi miễn phí', 'Máy lạnh', 'Chỗ để xe', 'Phòng riêng'],
        reviews: [
            {
                user: 'Minh Anh',
                rating: 5,
                comment: 'Quán đẹp, đồ uống ngon, nhân viên thân thiện',
                date: '15/03/2024',
            },
            // Thêm các review khác
        ],
        images: [
            // Thêm các ảnh khác của quán
        ],
    },
    {
        id: 2,
        name: 'IZY Coffee',
        address: '92 Hoàng Diệu 2, Linh Chiểu, TP. Thủ Đức',
        hours: '24/24',
        price: '30.000đ - 60.000đ',
        image: izycafe,
        description: 'Quán cafe phong cách hiện đại, phục vụ 24/7 với không gian thoáng mát.',
        menu: {
            coffee: [
                { name: 'Cà phê đen', price: '30.000đ' },
                { name: 'Cà phê sữa', price: '35.000đ' },
                { name: 'Cappuccino', price: '45.000đ' },
                { name: 'Latte', price: '45.000đ' },
            ],
            tea: [
                { name: 'Trà đào cam sả', price: '40.000đ' },
                { name: 'Trà sữa trân châu', price: '45.000đ' },
                { name: 'Trà chanh', price: '35.000đ' },
            ],
            juice: [
                { name: 'Sinh tố dâu', price: '45.000đ' },
                { name: 'Nước ép táo', price: '40.000đ' },
                { name: 'Sinh tố việt quất', price: '50.000đ' },
            ],
        },
        facilities: ['Wifi miễn phí', 'Máy lạnh', 'Phục vụ 24/7', 'Chỗ để xe rộng rãi'],
        reviews: [
            {
                user: 'Thanh Tùng',
                rating: 5,
                comment: 'Quán đẹp, phục vụ 24/7 rất tiện lợi',
                date: '2024-03-10',
            },
            {
                user: 'Mai Linh',
                rating: 4,
                comment: 'Đồ uống ngon, không gian thoáng mát',
                date: '2024-03-08',
            },
        ],
    },
    {
        id: 3,
        name: 'Cafe Lam',
        address: 'số 8, đường số 12, KP5, Thủ Đức, TP.HCM',
        hours: '07h00 - 23h00',
        price: '20.000đ - 65.000đ',
        image: cafelam,
        description: 'Không gian yên tĩnh, thích hợp cho việc học tập và làm việc.',
        menu: {
            coffee: [
                { name: 'Cà phê phin', price: '20.000đ' },
                { name: 'Cà phê sữa tươi', price: '30.000đ' },
                { name: 'Americano', price: '35.000đ' },
            ],
            tea: [
                { name: 'Trà đào', price: '35.000đ' },
                { name: 'Trà sen', price: '35.000đ' },
                { name: 'Trà gừng', price: '30.000đ' },
            ],
            juice: [
                { name: 'Sinh tố xoài', price: '40.000đ' },
                { name: 'Nước ép dứa', price: '35.000đ' },
            ],
        },
        facilities: ['Wifi miễn phí', 'Máy lạnh', 'Bàn học nhóm', 'Ổ cắm điện'],
        reviews: [
            {
                user: 'Hoàng Nam',
                rating: 5,
                comment: 'Địa điểm học bài lý tưởng',
                date: '2024-03-12',
            },
        ],
    },
    {
        id: 4,
        name: 'CAN Coffee & Workspace',
        address: '47 Hoàng Diệu 2, Linh Trung, TP. Thủ Đức',
        hours: '08h00 - 22h00',
        price: '29.000đ - 59.000đ',
        image: cancafe,
        description: 'Quán cafe ấm cúng với không gian xanh mát, phù hợp để học tập và làm việc.',
        menu: {
            coffee: [
                { name: 'Cà phê đen', price: '20.000đ' },
                { name: 'Cà phê sữa', price: '25.000đ' },
                { name: 'Bạc xỉu', price: '30.000đ' },
            ],
            tea: [
                { name: 'Trà đào', price: '35.000đ' },
                { name: 'Trà vải', price: '35.000đ' },
            ],
            juice: [
                { name: 'Sinh tố bơ', price: '45.000đ' },
                { name: 'Nước ép cam', price: '40.000đ' },
            ],
        },
        facilities: ['Wifi miễn phí', 'Máy lạnh', 'Chỗ để xe', 'Phòng riêng'],
        reviews: [
            {
                user: 'Minh Anh',
                rating: 5,
                comment: 'Quán đẹp, đồ uống ngon, nhân viên thân thiện',
                date: '15/03/2024',
            },
            // Thêm các review khác
        ],
        images: [
            // Thêm các ảnh khác của quán
        ],
    },
    {
        id: 5,
        name: 'Elmar Coffee',
        address: '9 Einstein, Bình Thọ, TP. Thủ Đức',
        hours: '06h00 - 22h00',
        price: '25.000đ – 50.000đ',
        image: elmarcoffe,
        description: 'Quán cafe ấm cúng với không gian xanh mát, phù hợp để học tập và làm việc.',
        menu: {
            coffee: [
                { name: 'Cà phê đen', price: '20.000đ' },
                { name: 'Cà phê sữa', price: '25.000đ' },
                { name: 'Bạc xỉu', price: '30.000đ' },
            ],
            tea: [
                { name: 'Trà đào', price: '35.000đ' },
                { name: 'Trà vải', price: '35.000đ' },
            ],
            juice: [
                { name: 'Sinh tố bơ', price: '45.000đ' },
                { name: 'Nước ép cam', price: '40.000đ' },
            ],
        },
        facilities: ['Wifi miễn phí', 'Máy lạnh', 'Chỗ để xe', 'Phòng riêng'],
        reviews: [
            {
                user: 'Minh Anh',
                rating: 5,
                comment: 'Quán đẹp, đồ uống ngon, nhân viên thân thiện',
                date: '15/03/2024',
            },
            // Thêm các review khác
        ],
        images: [
            // Thêm các ảnh khác của quán
        ],
    },
    {
        id: 6,
        name: 'Logan Station',
        address: 'số 2 đường 19A, An Phú, Quận 2, TP. Thủ Đức',
        hours: '06h00 - 22h00',
        price: '29.000đ - 139.000đ',
        image: loganstion,
        description: 'Quán cafe ấm cúng với không gian xanh mát, phù hợp để học tập và làm việc.',
        menu: {
            coffee: [
                { name: 'Cà phê đen', price: '20.000đ' },
                { name: 'Cà phê sữa', price: '25.000đ' },
                { name: 'Bạc xỉu', price: '30.000đ' },
            ],
            tea: [
                { name: 'Trà đào', price: '35.000đ' },
                { name: 'Trà vải', price: '35.000đ' },
            ],
            juice: [
                { name: 'Sinh tố bơ', price: '45.000đ' },
                { name: 'Nước ép cam', price: '40.000đ' },
            ],
        },
        facilities: ['Wifi miễn phí', 'Máy lạnh', 'Chỗ để xe', 'Phòng riêng'],
        reviews: [
            {
                user: 'Minh Anh',
                rating: 5,
                comment: 'Quán đẹp, đồ uống ngon, nhân viên thân thiện',
                date: '15/03/2024',
            },
            // Thêm các review khác
        ],
        images: [
            // Thêm các ảnh khác của quán
        ],
    },
    {
        id: 7,
        name: 'DOME saigon',
        address: '32 Bác Ái, Bình Thọ, TP. Thủ Đức',
        hours: '06h30 - 23h30',
        price: '20.000đ - 50.000đ',
        image: domesaigon,
        description: 'Quán cafe ấm cúng với không gian xanh mát, phù hợp để học tập và làm việc.',
        menu: {
            coffee: [
                { name: 'Cà phê đen', price: '20.000đ' },
                { name: 'Cà phê sữa', price: '25.000đ' },
                { name: 'Bạc xỉu', price: '30.000đ' },
            ],
            tea: [
                { name: 'Trà đào', price: '35.000đ' },
                { name: 'Trà vải', price: '35.000đ' },
            ],
            juice: [
                { name: 'Sinh tố bơ', price: '45.000đ' },
                { name: 'Nước ép cam', price: '40.000đ' },
            ],
        },
        facilities: ['Wifi miễn phí', 'Máy lạnh', 'Chỗ để xe', 'Phòng riêng'],
        reviews: [
            {
                user: 'Minh Anh',
                rating: 5,
                comment: 'Quán đẹp, đồ uống ngon, nhân viên thân thiện',
                date: '15/03/2024',
            },
            // Thêm các review khác
        ],
        images: [
            // Thêm các ảnh khác của quán
        ],
    },
    {
        id: 8,
        name: 'Góc Tịnh Yên',
        address: 'Số 131/41, đường số 6, Phường Linh Xuân, Thủ Đức',
        hours: '08h00 - 12h00 và 15h00 - 21h00',
        price: '30.000đ - 60.000đ',
        image: goctinhyen,
        description: 'Quán cafe ấm cúng với không gian xanh mát, phù hợp để học tập và làm việc.',
        menu: {
            coffee: [
                { name: 'Cà phê đen', price: '20.000đ' },
                { name: 'Cà phê sữa', price: '25.000đ' },
                { name: 'Bạc xỉu', price: '30.000đ' },
            ],
            tea: [
                { name: 'Trà đào', price: '35.000đ' },
                { name: 'Trà vải', price: '35.000đ' },
            ],
            juice: [
                { name: 'Sinh tố bơ', price: '45.000đ' },
                { name: 'Nước ép cam', price: '40.000đ' },
            ],
        },
        facilities: ['Wifi miễn phí', 'Máy lạnh', 'Chỗ để xe', 'Phòng riêng'],
        reviews: [
            {
                user: 'Minh Anh',
                rating: 5,
                comment: 'Quán đẹp, đồ uống ngon, nhân viên thân thiện',
                date: '15/03/2024',
            },
            // Thêm các review khác
        ],
        images: [
            // Thêm các ảnh khác của quán
        ],
    },
    {
        id: 9,
        name: 'Cafe Mẹ Ơi',
        address: '19 Hồng Đức, Phường Bình Thọ, Thành phố Thủ Đức',
        hours: '6h30 - 23h00',
        price: '30.000đ - 60.000đ',
        image: cafemeoi,
        description: 'Quán cafe ấm cúng với không gian xanh mát, phù hợp để học tập và làm việc.',
        menu: {
            coffee: [
                { name: 'Cà phê đen', price: '20.000đ' },
                { name: 'Cà phê sữa', price: '25.000đ' },
                { name: 'Bạc xỉu', price: '30.000đ' },
            ],
            tea: [
                { name: 'Trà đào', price: '35.000đ' },
                { name: 'Trà vải', price: '35.000đ' },
            ],
            juice: [
                { name: 'Sinh tố bơ', price: '45.000đ' },
                { name: 'Nước ép cam', price: '40.000đ' },
            ],
        },
        facilities: ['Wifi miễn phí', 'Máy lạnh', 'Chỗ để xe', 'Phòng riêng'],
        reviews: [
            {
                user: 'Minh Anh',
                rating: 5,
                comment: 'Quán đẹp, đồ uống ngon, nhân viên thân thiện',
                date: '15/03/2024',
            },
            // Thêm các review khác
        ],
        images: [
            // Thêm các ảnh khác của quán
        ],
    },
    {
        id: 10,
        name: 'Bamos Coffee',
        address: '22/6 Đường số 7, kp3, Linh Trung, Thủ Đức',
        hours: '24/7',
        price: '30.000đ - 60.000đ',
        image: bamoscofe,
        description: 'Quán cafe ấm cúng với không gian xanh mát, phù hợp để học tập và làm việc.',
        menu: {
            coffee: [
                { name: 'Cà phê đen', price: '20.000đ' },
                { name: 'Cà phê sữa', price: '25.000đ' },
                { name: 'Bạc xỉu', price: '30.000đ' },
            ],
            tea: [
                { name: 'Trà đào', price: '35.000đ' },
                { name: 'Trà vải', price: '35.000đ' },
            ],
            juice: [
                { name: 'Sinh tố bơ', price: '45.000đ' },
                { name: 'Nước ép cam', price: '40.000đ' },
            ],
        },
        facilities: ['Wifi miễn phí', 'Máy lạnh', 'Chỗ để xe', 'Phòng riêng'],
        reviews: [
            {
                user: 'Minh Anh',
                rating: 5,
                comment: 'Quán đẹp, đồ uống ngon, nhân viên thân thiện',
                date: '15/03/2024',
            },
            // Thêm các review khác
        ],
        images: [
            // Thêm các ảnh khác của quán
        ],
    },
    {
        id: 11,
        name: 'Cafe Ú Pao',
        address: '1190/06, Phạm Văn Đồng, Linh Đông, TP Thủ Đức',
        hours: '07h00 – 00h00',
        price: '15.000đ - 55.000đ',
        image: cafeupao,
        description: 'Quán cafe ấm cúng với không gian xanh mát, phù hợp để học tập và làm việc.',
        menu: {
            coffee: [
                { name: 'Cà phê đen', price: '20.000đ' },
                { name: 'Cà phê sữa', price: '25.000đ' },
                { name: 'Bạc xỉu', price: '30.000đ' },
            ],
            tea: [
                { name: 'Trà đào', price: '35.000đ' },
                { name: 'Trà vải', price: '35.000đ' },
            ],
            juice: [
                { name: 'Sinh tố bơ', price: '45.000đ' },
                { name: 'Nước ép cam', price: '40.000đ' },
            ],
        },
        facilities: ['Wifi miễn phí', 'Máy lạnh', 'Chỗ để xe', 'Phòng riêng'],
        reviews: [
            {
                user: 'Minh Anh',
                rating: 5,
                comment: 'Quán đẹp, đồ uống ngon, nhân viên thân thiện',
                date: '15/03/2024',
            },
            // Thêm các review khác
        ],
        images: [
            // Thêm các ảnh khác của quán
        ],
    },
    {
        id: 12,
        name: 'Last Minute',
        address: '22 Dân Chủ, P, Thủ Đức, Thành phố Hồ Chí Minh',
        hours: '07h00 – 23h00',
        price: '20.000đ – 80.000đ',
        image: cafelastminute,
        isNew: true,
        description: 'Quán cafe ấm cúng với không gian xanh mát, phù hợp để học tập và làm việc.',
        menu: {
            coffee: [
                { name: 'Cà phê đen', price: '20.000đ' },
                { name: 'Cà phê sữa', price: '25.000đ' },
                { name: 'Bạc xỉu', price: '30.000đ' },
            ],
            tea: [
                { name: 'Trà đào', price: '35.000đ' },
                { name: 'Trà vải', price: '35.000đ' },
            ],
            juice: [
                { name: 'Sinh tố bơ', price: '45.000đ' },
                { name: 'Nước ép cam', price: '40.000đ' },
            ],
        },
        facilities: ['Wifi miễn phí', 'Máy lạnh', 'Chỗ để xe', 'Phòng riêng'],
        reviews: [
            {
                user: 'Minh Anh',
                rating: 5,
                comment: 'Quán đẹp, đồ uống ngon, nhân viên thân thiện',
                date: '15/03/2024',
            },
            // Thêm các review khác
        ],
        images: [
            // Thêm các ảnh khác của quán
        ],
    },
];
