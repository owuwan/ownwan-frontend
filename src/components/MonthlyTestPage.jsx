import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

export default function MonthlyTestPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // 폼 데이터
  const [formData, setFormData] = useState({
    name: '홍길동',
    birthYear: 1990,
    birthMonth: 5,
    birthDay: 15,
    birthHour: 12,
    gender: '남성',
    isLunar: false,
    targetYear: 2025,
    targetMonth: 11
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('📤 월간 운세 요청 시작...');
      
      const response = await fetch('https://ownwan-backend.onrender.com/api/monthly-saju', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('서버 응답 실패');
      }

      const data = await response.json();
      console.log('✅ 월간 운세 받음:', data);

      // 결과 페이지로 이동
      navigate('/monthly-result', { 
        state: { monthlyData: data }
      });

    } catch (error) {
      console.error('❌ 오류:', error);
      alert('월간 운세를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 로딩 화면
  if (loading) {
    return <LoadingScreen type="monthly" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            🗓️ 월간 운세 테스트
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 이름 */}
            <div>
              <label className="text-white text-sm mb-2 block">이름</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:border-purple-400"
              />
            </div>

            {/* 생년월일 */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-white text-sm mb-2 block">년</label>
                <input
                  type="number"
                  value={formData.birthYear}
                  onChange={(e) => setFormData({...formData, birthYear: parseInt(e.target.value)})}
                  className="w-full px-3 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">월</label>
                <input
                  type="number"
                  value={formData.birthMonth}
                  onChange={(e) => setFormData({...formData, birthMonth: parseInt(e.target.value)})}
                  className="w-full px-3 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-white text-sm mb-2 block">일</label>
                <input
                  type="number"
                  value={formData.birthDay}
                  onChange={(e) => setFormData({...formData, birthDay: parseInt(e.target.value)})}
                  className="w-full px-3 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none"
                />
              </div>
            </div>

            {/* 성별 */}
            <div>
              <label className="text-white text-sm mb-2 block">성별</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, gender: '남성'})}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                    formData.gender === '남성'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/20 text-white/60'
                  }`}
                >
                  남성
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, gender: '여성'})}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                    formData.gender === '여성'
                      ? 'bg-pink-500 text-white'
                      : 'bg-white/20 text-white/60'
                  }`}
                >
                  여성
                </button>
              </div>
            </div>

            {/* 조회 대상 년월 */}
            <div className="border-t border-white/20 pt-4 mt-4">
              <label className="text-white font-bold mb-3 block">📅 조회할 년월</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white text-sm mb-2 block">년도</label>
                  <input
                    type="number"
                    value={formData.targetYear}
                    onChange={(e) => setFormData({...formData, targetYear: parseInt(e.target.value)})}
                    className="w-full px-3 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">월</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={formData.targetMonth}
                    onChange={(e) => setFormData({...formData, targetMonth: parseInt(e.target.value)})}
                    className="w-full px-3 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? '운세 생성 중...' : '🔮 월간 운세 보기'}
            </button>
          </form>

          {/* 홈으로 버튼 */}
          <button
            onClick={() => navigate('/')}
            className="w-full bg-white/20 text-white py-3 rounded-xl font-medium mt-4 hover:bg-white/30 transition-all"
          >
            🏠 홈으로
          </button>
        </div>
      </div>
    </div>
  );
}