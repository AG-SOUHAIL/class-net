import "./home.css";
import Header from '../../compenents/Header';
import MobileHeader from '../../compenents/MobileHeader';
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProfileInfo from "../../compenents/ProfileInfo";


const Home = () => {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div>
        <Header/>
        <MobileHeader/>
        <ProfileInfo/>
    </div>
  )
}

export default Home