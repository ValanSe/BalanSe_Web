import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import valanse_logo from "./img/valanse_logo.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUpmodel from "../modal/SignUpmodel";
import Cookies from 'js-cookie';

const Header = () => {
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [stateToken, setStateToken] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // 새로고침 시에만 인터셉터 설정
        if (!window.performance.navigation.type) {
            const interceptor = axios.interceptors.request.use(
                config => {
                    const token = Cookies.get('access_token');
                    if (token) {
                        config.headers['Authorization'] = token;
                    }
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );
            return () => {
                axios.interceptors.request.eject(interceptor);
            };
        }
    }, []); // 한 번만 실행

    useEffect(() => {
        const accessTokenCookie = Cookies.get('access_token');
        setIsLoggedIn(accessTokenCookie ? true : false);

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('stateToken');
        setStateToken(token);

        if (token) {
            getAccessToken(token);
        }
    }, []);

    const getAccessToken = async (stateToken) => {
        try {
            const response = await axios.post('https://valanse.site/token/get', null, {
                headers: {
                    'stateToken': stateToken,
                    'Content-Type': 'application/json'
                }
            });
            const token = response.data.data;
            setAccessToken(token);
            Cookies.set('access_token', token);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error getting access token:', error.message);
        }
    };

    const handleLogout = async () => {
        try {
            Cookies.remove('access_token');
            setIsLoggedIn(false);
            setAccessToken('');
            setStateToken('');
            window.location.replace('https://valanse.vercel.app/');
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    const toggleSignUpModal = () => {
        setShowSignUpModal(!showSignUpModal);
    };

    const handleLogoClick = () => {
        window.location.href = 'https://valanse.vercel.app/';
    };

    return (
        <>
            <header>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand onClick={handleLogoClick}>
                            <img src={valanse_logo} alt="Valanse Logo" style={{ cursor: 'pointer' }} />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav className="ml-auto">
                                {isLoggedIn ? (
                                    <Nav.Link>
                                        <Button variant="secondary" onClick={handleLogout}>Logout</Button>
                                    </Nav.Link>
                                ) : (
                                    <Nav.Link>
                                        <Button variant="secondary" onClick={toggleSignUpModal}>Login</Button>
                                    </Nav.Link>
                                )}
                                <SignUpmodel show={showSignUpModal} onHide={toggleSignUpModal} />
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            {stateToken && (
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    <h3>State Token: {stateToken}</h3>
                </div>
            )}
            {accessToken ? (
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    <h3>액세스 토큰 가져오기 성공</h3>
                </div>
            ) : (
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    <h3>로그인 안한 상황</h3>
                </div>
            )}
        </>
    );
};

export default Header;
