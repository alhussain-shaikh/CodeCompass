import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import LandingPage from "./LandingPage";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import { updateUsername } from "../store/store";
import {
  BrowserRouter as Router , Routes, Route
} from "react-router-dom";

import LogoutIcon from '@mui/icons-material/Logout';

const GITHUB_CLIENT_ID = "ac13de5979caa668c1f2";
const gitHubRedirectURL = "http://localhost:4000/api/auth/github";
const path = "/";



export const NavBar = () => {

  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState();

  const username = useSelector((state) => state.user.username);
  console.log("username is : ",username);

  const storeUpdate = (e) =>{
    dispatch(updateUsername(e.login))
  }

  useEffect(() => {
    (async function () {
      const usr = await axios
        .get(`http://localhost:4000/api/me`, {
          withCredentials: true,
        })
        .then((res) => res.data);
        storeUpdate(usr);
      setUser(usr);
    })();
   
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  const logoutUser = () => {
    dispatch(updateUsername(""))
    setUser("")
  }

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            {/* <img src={logo} alt="Logo" /> */}
            <h1 style={{color:"white"}}>CodeCompass</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
         
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link> */}
              <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Services</Nav.Link>
              <Nav.Link href="#analysis" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('analysis')} >Analysis</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="#"><img src={navIcon1} alt="" /></a>
                <a href="#"><img src={navIcon2} alt="" /></a>
                <a href="#"><img src={navIcon3} alt="" /></a>
              </div>

              {!user ? (
                <a href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`}>
                  <button className="vvd"><span>Login With GitHub</span></button>
                </a>
              ) : (
                <>
                <button className="vvd"><span>Welcome {user.login}</span></button>
                <button onClick={logoutUser}><LogoutIcon color="#fff" /></button>
                </>
              )}
              {/* <a href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`}>
                <button className="vvd"><span>Login With GitHub</span></button>
              </a> */}
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}
