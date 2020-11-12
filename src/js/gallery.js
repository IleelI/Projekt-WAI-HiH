import "../scss/gallery.scss";

import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/img3.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.jpg";
import img6 from "../assets/images/img6.jpg";
import img7 from "../assets/images/img7.jpg";
import img8 from "../assets/images/img8.jpg";

const daily_image = document.querySelector('.daily__image--wrapper img');
const images = [img1,img2,img3,img4,img5,img6,img7,img8];
const publicPath = './public/assets/images/';

window.onload = () => {
    console.log("Session storage:" + sessionStorage.getItem('daily image'));
    if (sessionStorage.getItem('daily image') === null) {
        const random_image_number = Math.floor((Math.random() * images.length) + 1);
        let random_image = publicPath + `img${random_image_number}.jpg`;
        console.log(random_image);
        daily_image.setAttribute('src',`${random_image}`);
        sessionStorage.setItem('daily image', random_image);
    }
    else if (sessionStorage.getItem('daily image') !== null) {
        daily_image.setAttribute('src',`${sessionStorage.getItem('daily image')}`);
    }
}