import logo from './img/LightClassNetLogo.svg';
import './css/Header.css';
import userPic from "./img/user.svg"
import { useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../firebase';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Header = () => {

    const UserUid =  localStorage.getItem('userId');

    const imageListRef = ref(storage, 'accontsPic/' + `User : ${UserUid}/`);
    const [imageList, setImageList] = useState([]);

    let UserPic = userPic;

    useEffect(()=>{
        listAll(imageListRef).then((response)=>{
            console.log(response);
            response.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setImageList((prev)=>[...prev, url]);
                    localStorage.setItem('picurl', url)
                });
            });
        });
    }, []);

    localStorage.setItem("pic2", userPic)
    const Img = document.getElementsByClassName('Profile-Pic');

    if ("picurl" in localStorage) {
        UserPic = localStorage.getItem("picurl")
    }else if ("pic" in localStorage) {
        UserPic = localStorage.getItem('pic')
    }


    const Open = () => {
        const MobileLinks = document.getElementById('MobileLinks');
        MobileLinks.classList.toggle("open");
    };

    const visible = () => {
        const ProfileInfo = document.getElementById('ProfileInfo');
        ProfileInfo.classList.toggle("visible");
    };

    useEffect(() => {
        AOS.init();
      }, [])

      
    return (
        <div className='Header' id='Header' >
            <div className='MobileLinksShow' onClick={Open}>
                <svg width="42" height="42" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 18.005a2 2 0 0 0 4 0C8 16.902 7.1 16 6 16s-2 .902-2 2.005Z"></path>
                    <path d="M4 12.005a2 2 0 0 0 4 0C8 10.902 7.1 10 6 10s-2 .902-2 2.005Z"></path>
                    <path d="M4 6.005a2 2 0 0 0 4 0C8 4.902 7.1 4 6 4s-2 .902-2 2.005Z"></path>
                    <path d="M10 6.005a2 2 0 0 0 4 0C14 4.902 13.1 4 12 4s-2 .902-2 2.005Z"></path>
                    <path d="M10 12.005a2 2 0 0 0 4 0C14 10.902 13.1 10 12 10s-2 .902-2 2.005Z"></path>
                    <path d="M10 18.005a2 2 0 0 0 4 0C14 16.902 13.1 16 12 16s-2 .902-2 2.005Z"></path>
                    <path d="M16 12.005a2 2 0 0 0 4 0C20 10.902 19.1 10 18 10s-2 .902-2 2.005Z"></path>
                    <path d="M16 18.005a2 2 0 0 0 4 0C20 16.902 19.1 16 18 16s-2 .902-2 2.005Z"></path>
                    <path d="M16 6.005a2 2 0 0 0 4 0C20 4.902 19.1 4 18 4s-2 .902-2 2.005Z"></path>
                </svg>
            </div>
            <img  src={logo} className='headerLogo' />
            <div  className='Links'>
                <p>Home</p>
                <p>Math</p>
                <p>PC</p>
                <p>SVT</p>
            </div>

            <img onClick={visible} className='Profile-Pic' src={UserPic}></img>
        </div>
    )

}


export default Header
