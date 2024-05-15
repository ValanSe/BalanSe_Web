import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import valanse_logo from "./img/valanse_logo.png";
import { Link } from 'react-router-dom'; // Link 추가
import axios from 'axios'; // axios 추가
import SignUpmodel from "../modal/SignUpmodel";
import Cookies from 'js-cookie'; // js-cookie 패키지 import

const Header = () => {
    const [showSignUpModal, setShowSignUpModal] = useState(false); // 회원가입 모달의 표시 여부를 관리하는 상태
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리하는 상태
    const [stateToken, setStateToken] = useState(''); // 상태 토큰을 관리하는 상태
    const [accessToken, setAccessToken] = useState(''); // 액세스 토큰을 관리하는 상태

    useEffect(() => {
        // 쿠키에서 액세스 토큰 가져오기
        const accessTokenCookie = Cookies.get('access_token');
        // 액세스 토큰이 존재하는 경우 로그인 상태 설정
        setIsLoggedIn(accessTokenCookie ? true : false);

        // URL에서 상태 토큰 추출
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('stateToken');
        setStateToken(token);

        // 액세스 토큰 가져오기
        getAccessToken();
    }, []);

    // 액세스 토큰 가져오는 함수
    const getAccessToken = async () => {
        try {
            const response = await axios.post('http://54.180.170.88:8080/token/get', {}, {
                headers: {
                    'stateToken': stateToken
                }
            });
            if (response.status === 200) {
                setAccessToken(response.data.data);
            } else {
                throw new Error('Failed to get access token');
            }
        } catch (error) {
            console.error('Error getting access token:', error.message);
        }
    };

    // 로그아웃 함수
    const handleLogout = async () => {
        try {
            // 로그아웃 요청 보내기
            await axios.post('https://54.180.170.88:8080/token/logout');
            // 로그아웃 성공 시 쿠키 삭제 및 로그인 상태 변경
            Cookies.remove('access_token');
            setIsLoggedIn(false);
        } catch (error) {
            console.error('로그아웃 중 에러 발생:', error);
        }
    };

    // 로그인 모달을 열거나 닫는 함수
    const toggleSignUpModal = () => {
        setShowSignUpModal(!showSignUpModal);
    };

    return (
        <>
            <header>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            <img src={valanse_logo} alt="노이즈 로고" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav className="ml-auto">
                                {/* 로그인 또는 로그아웃 버튼 */}
                                {isLoggedIn ? (
                                    <Nav.Link>
                                        <Button variant="secondary" onClick={handleLogout}>로그아웃</Button>
                                    </Nav.Link>
                                ) : (
                                    <Nav.Link>
                                        <Button variant="secondary" onClick={toggleSignUpModal}>로그인</Button>
                                    </Nav.Link>
                                )}
                                {/* 로그인 모달 */}
                                <SignUpmodel show={showSignUpModal} onHide={toggleSignUpModal} />
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            {/* 상태 토큰 출력 */}
            {stateToken && (
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    <h3>State Token: {stateToken}</h3>
                </div>
            )}
            {/* 액세스 토큰 출력 */}
            {accessToken && (
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    <h3>Access Token: {accessToken}</h3>
                </div>
            )}
        </>
    );
};

export default Header;
