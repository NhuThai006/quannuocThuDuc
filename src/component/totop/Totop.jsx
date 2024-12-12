import React from 'react';
// import './Totop.scss'
import imgtotop from '../../assets/images/totop.png';
function ToTop() {
    return (
        <div className="to-top" style={{ position: 'fixed', bottom: '30px', right: '25px', borderRadius: '10px' ,padding: '10px' ,backgroundColor: '#F59E0B'}}>
            <a class="totop" href="#">
                <img src={imgtotop} alt="" width={35} height={35} />
            </a>
        </div>
    );
}
// https://th.bing.com/th/id/OIP.yjiJHt98tQVKOzuuHmKPDAHaIe?w=820&h=938&rs=1&pid=ImgDetMain
// https://smallimg.pngkey.com/png/small/28-288975_blue-up-arrow-blue-up-arrow-transparent.png
export default ToTop;
