import './css/ProfileInfo.css';
import userPic from "./img/user.svg"
import { useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../firebase';

const ProfileInfo = () => {

  const UserUid =  localStorage.getItem('userId');

  const imageListRef = ref(storage, 'accontsPic/' + `User : ${UserUid}/`);
  const [imageList, setImageList] = useState([]);

  let UserPic = userPic;
  let UserName = localStorage.getItem('userName');
  let UserEmail = localStorage.getItem('userEmail');

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


  const clealocalstorage =()=>{
    localStorage.clear();
    window.location.reload();
  };


  return (
    <div className="ProfileInfo" id='ProfileInfo'>
      <div className='Info-container'>
        <img className='Profile-Pic' src={UserPic}></img>
        <div className='Info'>
          <p className='Info-Name'>{UserName}</p>
          <p className='Info-Email'>{UserEmail}</p>
        </div>
      </div>
      <div className='separator'></div>
      <button className="logout-btn" onClick={clealocalstorage}>LogOut</button>
    </div>
  )
}

export default ProfileInfo