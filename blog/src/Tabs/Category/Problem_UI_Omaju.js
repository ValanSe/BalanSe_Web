import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ProblemUI() {
  const [quizDataList, setQuizDataList] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNoProblemDialog, setShowNoProblemDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get(
        'https://valanse.site/quiz-category/search?keyword=%EC%B6%95%EA%B5%AC'
      );
      const data = response.data.data;
      if (!data || data.length === 0) {
        setShowNoProblemDialog(true);
        return;
      }
      setQuizDataList(data);
    } catch (error) {
      console.error('Error fetching quiz data:', error.message);
      setShowNoProblemDialog(true);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowConfirmDialog(true);
  };

  const handleOptionLike = async () => {
    // Implement liking functionality
  };

  const handleOptionDislike = async () => {
    // Implement disliking functionality
  };

  const handleNext = () => {
    const nextIndex = currentQuizIndex + 1;
    if (nextIndex < quizDataList.length) {
      setCurrentQuizIndex(nextIndex);
    } else {
      setShowNoProblemDialog(true);
    }
  };

  const handlePrevious = () => {
    const previousIndex = currentQuizIndex - 1;
    if (previousIndex >= 0) {
      setCurrentQuizIndex(previousIndex);
    }
  };

  const handleCloseNoProblemDialog = () => {
    setShowNoProblemDialog(false);
  };

  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
  };

  const handleConfirmSelection = () => {
    handleNext();
  };

  const currentQuizData = quizDataList[currentQuizIndex];

  return (
    <Container maxWidth="lg">
      <Dialog
        open={showNoProblemDialog}
        onClose={handleCloseNoProblemDialog}
        aria-labelledby="no-problem-dialog-title"
        aria-describedby="no-problem-dialog-description"
      >
        <DialogTitle id="no-problem-dialog-title">문제가 없습니다.</DialogTitle>
        <DialogContent>
          <Typography variant="body1" id="no-problem-dialog-description">
            현재 문제가 더 이상 제공되지 않습니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNoProblemDialog} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">선택 확인</DialogTitle>
        <DialogContent>
          <Typography variant="body1" id="confirm-dialog-description">
            선택지: {selectedOption}. 정말 선택하시겠습니까?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            취소
          </Button>
          <Button onClick={handleConfirmSelection} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
      <Card sx={{ bgcolor: '#f5f5f5', borderRadius: '16px', mt: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} style={{ height: '30px' }} />
            <Grid item xs={12}>
              <Typography variant="h4" align="center">{currentQuizData ? currentQuizData.content : ''}</Typography>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <IconButton onClick={handleOptionLike}>
                <ThumbUpIcon color={'inherit'} /> {currentQuizData ? currentQuizData.likes : 0}
              </IconButton>
              <IconButton onClick={handleOptionDislike}>
                <ThumbDownIcon color={'inherit'} /> {currentQuizData ? currentQuizData.dislikes : 0}
              </IconButton>
            </Grid>
            <Grid item xs={6} textAlign="center">
              <Card onClick={() => handleOptionSelect('A')} sx={{ borderRadius: '16px' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="400"
                    image={currentQuizData ? currentQuizData.imageA : ''}
                    alt=""
                  />
                  <CardContent sx={{ height: '100px' }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {currentQuizData ? currentQuizData.descriptionA : ''}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6} textAlign="center">
              <Card onClick={() => handleOptionSelect('B')} sx={{ borderRadius: '16px' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="400"
                    image={currentQuizData ? currentQuizData.imageB : ''}
                    alt=""
                  />
                  <CardContent sx={{ height: '100px' }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {currentQuizData ? currentQuizData.descriptionB : ''}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handlePrevious}
                disabled={currentQuizIndex === 0}
                startIcon={<ArrowBackIcon />}
              >
                Previous
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Card>
    </Container>
  );
}

export default ProblemUI;
