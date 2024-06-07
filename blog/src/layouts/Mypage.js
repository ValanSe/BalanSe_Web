import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Table, TableContainer, TableHead, TableRow, TableCell, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from './Header';

const MyPage = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('https://valanse.site/quiz/user');
                setQuizzes(response.data.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };
        fetchQuizzes();
    }, []);

    const handleDelete = async (quizId) => {
        try {
            await axios.delete(`https://valanse.site/quiz/${quizId}`);
            setQuizzes(quizzes.filter(quiz => quiz.quizId !== quizId));
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    const handleEdit = (quizId) => {
        // 수정하기 버튼 클릭 시 수행할 작업
        console.log('Edit quiz:', quizId);
    };

    return (
        <>
            <Header />
            <div>
                <Typography variant="h4" gutterBottom>
                    마이 페이지 개발 중입니다...
                </Typography>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>퀴즈 목록</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>제목</TableCell>
                                        <TableCell>왼쪽 사진</TableCell>
                                        <TableCell>왼쪽 설명</TableCell>
                                        <TableCell>오른쪽 사진</TableCell>
                                        <TableCell>오른쪽 설명</TableCell>
                                        <TableCell>선호도</TableCell>
                                        <TableCell>조회수</TableCell>
                                        <TableCell>작업</TableCell>
                                    </TableRow>
                                </TableHead>
                                <tbody>
                                    {quizzes.map((quiz) => (
                                        <TableRow key={quiz.quizId}>
                                            <TableCell>{quiz.content}</TableCell>
                                            <TableCell>
                                                {quiz.imageA && (
                                                    <img src={quiz.imageA} alt="Option A" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                                                )}
                                            </TableCell>
                                            <TableCell>{quiz.descriptionA}</TableCell>
                                            <TableCell>
                                                {quiz.imageB && (
                                                    <img src={quiz.imageB} alt="Option B" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                                                )}
                                            </TableCell>
                                            <TableCell>{quiz.descriptionB}</TableCell>
                                            <TableCell>{quiz.preference}</TableCell>
                                            <TableCell>{quiz.view}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleEdit(quiz.quizId)}
                                                    style={{ marginRight: '8px' }}
                                                >
                                                    수정하기
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleDelete(quiz.quizId)}
                                                >
                                                    삭제하기
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </tbody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    );
};

export default MyPage;
