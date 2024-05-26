import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import './notii.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NoticeWrite = () => {
    const [newNotice, setNewNotice] = useState('');
    const [newNoticeContent, setNewNoticeContent] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const navigate = useNavigate(); 

    const handleAddNotice = async () => {
        if (newNotice.trim() !== '' && newNoticeContent.trim() !== '') {
            const noticeRegisterDto = {
                title: newNotice,
                content: newNoticeContent,
            };

            try {
                const response = await fetch('http://valanse.site/notice/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                    body: JSON.stringify({ noticeRegisterDto }),
                });

                if (response.ok) {
                    setDialogMessage('공지사항이 성공적으로 등록되었습니다.');
                    setDialogOpen(true);
                } else {
                    setDialogMessage('공지사항 등록에 실패하였습니다.');
                    setDialogOpen(true);
                }
            } catch (error) {
                setDialogMessage('공지사항 등록 중 에러가 발생하였습니다.');
                setDialogOpen(true);
            }
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        if (dialogMessage === '공지사항이 성공적으로 등록되었습니다.') {
            navigate('/');
        }
    };

    return (
        <>
            <Header />
            <Container maxWidth="md" className="notii">
                <Typography variant="h4" className="notii-title2">
                    공지게시판
                </Typography>
                <Button variant="contained" className="button1_write" style={{ backgroundColor: 'white', boxShadow: 'none' }} onClick={() => navigate(-1)} >
                    <ArrowBackIcon style={{ color: 'black', fontSize: '24px' }} />
                    <span style={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>뒤로가기</span>
                </Button>
                <div className="textfield1">
                    <TextField
                        label="제목"
                        fullWidth
                        value={newNotice}
                        onChange={(e) => setNewNotice(e.target.value)}
                        variant="outlined"
                    />
                </div>
                <div className="textfield2">
                    <TextField
                        label="내용"
                        fullWidth
                        multiline
                        rows={12}
                        value={newNoticeContent}
                        onChange={(e) => setNewNoticeContent(e.target.value)}
                        variant="outlined"
                    />
                </div>
                <Button variant="contained" className="notii-button2" color="primary" onClick={handleAddNotice}>
                    작성
                </Button>
            </Container>
            <Footer />
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>공지사항 등록</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">확인</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NoticeWrite;
