import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const MyQuizzesPage = () => {
  const [recentQuizzes, setRecentQuizzes] = useState([{}, {}, {}]); // 초기 상태를 3개의 빈 객체로 설정

  // 서버에서 최근에 만들어진 퀴즈 데이터를 가져오는 함수
  const fetchRecentQuizzes = async () => {
    try {
      const accessToken = Cookies.get('access_token'); // 쿠키에서 액세스 토큰 가져오기
      const response = await axios.get('https://valanse.site/quiz/sort-by-created-at', {
        headers: {
          'Authorization': accessToken // 헤더에 액세스 토큰 추가
        }
      });
      // 최근에 만들어진 퀴즈 중에서 최신 3개만 선택하여 상태에 저장
      const recentQuizzesData = response.data.data.slice(0, 3);
      setRecentQuizzes(recentQuizzesData);
    } catch (error) {
      console.error('Error fetching recent quizzes:', error);
    }
  };

  // 컴포넌트가 마운트될 때 최근 퀴즈 데이터를 가져옴
  useEffect(() => {
    fetchRecentQuizzes();
  }, []);

  return (
    <div style={{ marginTop: '20px', color: 'white' }}>
      <h2 style={{ marginBottom: '10px', color: 'white', fontWeight: 'bold' }}>최근 작품</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* 상태에 저장된 최근 퀴즈 사진과 제목을 표시 */}
        {recentQuizzes.map((quiz, index) => (
          <div key={index} style={{ width: 'calc(33.33% - 20px)', margin: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', overflow: 'hidden' }}>
            {quiz.imageA ? (
              <img src={quiz.imageA} alt={quiz.content} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '250px', backgroundColor: '#ddd' }}></div> // 빈 사진
            )}
            <h3 style={{ marginTop: '10px', marginBottom: '5px', color: 'white' }}>{quiz.content || '로그인 하세요...'}</h3> {/* 데이터 없음 메시지 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyQuizzesPage;
