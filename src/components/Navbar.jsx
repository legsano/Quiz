import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/navbar.css';

import dotLogo from '../assets/dotlogo.png';
import profil from '../assets/profil.png';
import downarrow from '../assets/downarrow.png';

export default function Navbar({ username, disableLogout }) {
    const [isDropdownVisible, setDropdownVisible] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = () => {
        if (!disableLogout) {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('username');

            localStorage.removeItem('question');
            localStorage.removeItem('difficulty');
            localStorage.removeItem('time');

            localStorage.removeItem('score');
            localStorage.removeItem('amountquestion');

            localStorage.setItem('quizInProgress', 'false');
            navigate('/'); // Redirect to login or home page
        }
    };
    // Check if current path is '/login'
    const isLoginPage = location.pathname === '/';

    return (
        <nav className='navbar'>
            <div className='navBox'>
                <div className='navLogo'>
                    <img src={dotLogo} alt="dotlogo" />
                    <h2>Quiz</h2>
                </div>

                {!isLoginPage && (
                    <div className="accountNav">
                        <div className="profil">
                            <img src={profil} alt="profil" />
                            <p>{username}</p>
                        </div>

                        <div className={`dropdownArrow ${isDropdownVisible ? 'up' : ''}`} onClick={toggleDropdown}>
                            <img src={downarrow} alt="downarrow" />
                        </div>

                        <div className={`dropdownMenu ${isDropdownVisible ? 'visible' : ''}`}>
                            <div className='mobProfil'>
                                <img src={profil} alt="profil" />
                                <p>{username}</p>
                            </div>

                            <button onClick={handleLogout} disabled={disableLogout}>Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
