import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from './logo.ico';
import { gapi } from "gapi-script";
import { RiVideoAddLine } from 'react-icons/ri';
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiUserCircle } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { login } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "react-google-login";
import SearchBar from './SearchBar/SearchBar';
import Auth from '../../pages/Auth/Auth';

function Navbar({ toggleDrawer, setEditCreateChanelBtn, points }) {
  const [AuthBtn, setAuthBtn] = useState(false);
  const CurrentUser = useSelector(state => state.currentUserReducer);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    function start() {
      gapi.client.init({
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const dispatch = useDispatch();
  const onSuccess = (response) => {
    const email = response?.profileObj.email;
    dispatch(login({ email }));
  };
  const onFailure = (response) => {
    console.log("Failed", response);
  };

  return (
    <>
      <div className="container_navbar">
        <div className='Burger_Logo_Navbar'>
          <div className='burger' onClick={() => toggleDrawer()}>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <Link to="/" className="logo_div_Navbar">
            <img src={logo} alt="YouWatch Logo" />
            <p className="logo_title_navbar">YouWatch</p>
          </Link>
        </div>
        <SearchBar />
        <RiVideoAddLine
          size={22}
          className={"vid_bell_Navbar"}
          onClick={() => navigate('/VideoCall')} // Navigate to video call page
        />
        
        <IoMdNotificationsOutline size={22} className={"Notif_Navbar"} />
        <div className='apps_Box'>
          {Array(9).fill().map((_, index) => (
            <p key={index} className="appBox"></p>
          ))}
        </div>
        {CurrentUser && (
          <div className="points-box">
            P: <span id="points">{points}</span>
          </div>
        )}
        <div className='Auth_cont_Navbar'>
          {CurrentUser ? (
            <>
              <div className="Chanel_logo_App" onClick={() => setAuthBtn(true)}>
                <p className="fstChar_logo_App">
                  {CurrentUser?.result.name ? (
                    <>{CurrentUser?.result.name.charAt(0).toUpperCase()}</>
                  ) : (
                    <>{CurrentUser?.result.email.charAt(0).toUpperCase()}</>
                  )}
                </p>
              </div>
            </>
          ) : (
            <GoogleLogin
              clientId={"65207599879-ukv835c95eq9s78nkicloknbdjg1utbs.apps.googleusercontent.com"}
              onSuccess={onSuccess}
              onFailure={onFailure}
              render={(renderProps) => (
                <p onClick={renderProps.onClick} className="Auth_Btn">
                  <BiUserCircle size={22} />
                  <b>Sign in</b>
                </p>
              )}
            />
          )}
        </div>
      </div>
      {AuthBtn && (
        <Auth
          setEditCreateChanelBtn={setEditCreateChanelBtn}
          setAuthBtn={setAuthBtn}
          User={CurrentUser}
        />
      )}
    </>
  );
}

export default Navbar;
