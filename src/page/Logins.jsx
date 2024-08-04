import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/logins.css';

import BouncingBalls from '../components/BouncingBalls';
import Navbar from '../components/Navbar';



export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const username = 'Legsano Muktilatin';
    const useEmail = 'legsano@gmail.com';
    const usePassword = '123';

    useEffect(() => {
        document.title = 'Login';
    }, []);

    const handleLogin = () => {
        if (!email && !password) {
            alert('Email and Password are required');
            return;
        }
        else if (!email) {
            alert('Email is required');
            return;
        }
        else if (!password) {
            alert('Password is required');
            return;
        }
        else if (email !== useEmail || password !== usePassword) {
            alert('Login is not valid');
            setEmail('');
            setPassword('');
        }
        else if (email == useEmail && password == usePassword) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('username', username);
            navigate('/dashboard');
        }
    };


    return (
        <div className='loginContainer'>
            <Navbar />
            <BouncingBalls />
            <div className="loginBox">
                <h2>Login</h2>

                <div className="inputBox">
                    <div>
                        <p>Email</p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />

                    </div>


                    <div>
                        <p>Password</p>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                </div>



                <button onClick={handleLogin}>Sign In</button>
                <p className='createAccount'>Don't have account ? <span>Sign Up</span></p>
            </div>

        </div>
    );
};

