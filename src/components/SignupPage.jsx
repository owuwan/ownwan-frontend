import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  
  // 입력 상태
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthHour, setBirthHour] = useState('');
  const [birthMinute, setBirthMinute] = useState('');
  const [gender, setGender] = useState('');
  
  // 에러 상태
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // 유효성 검사
    if (!birthYear || !birthMonth || !birthDay) {
      setError('생년월일을 모두 입력해주세요.');
      return;
    }
    
    if (!birthHour || !birthMinute) {
      setError('출생 시간을 모두 입력해주세요.');
      return;
    }
    
    if (!gender) {
      setError('성별을 선택해주세요.');
      return;
    }

    // 숫자 변환 및 범위 검사
    const year = parseInt(birthYear);
    const month = parseInt(birthMonth);
    const day = parseInt(birthDay);
    const hour = parseInt(birthHour);
    const minute = parseInt(birthMinute);

    if (year < 1900 || year > 2024) {
      setError('올바른 출생 연도를 입력해주세요. (1900-2024)');
      return;
    }

    if (month < 1 || month > 12) {
      setError('올바른 월을 입력해주세요. (1-12)');
      return;
    }

    if (day < 1 || day > 31) {
      setError('올바른 일을 입력해주세요. (1-31)');
      return;
    }

    if (hour < 0 || hour > 23) {
      setError('올바른 시간을 입력해주세요. (0-23)');
      return;
    }

    if (minute < 0 || minute > 59) {
      setError('올바른 분을 입력해주세요. (0-59)');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('로그인이 필요합니다.');
        setTimeout(() => navigate('/login'), 1500);
        return;
      }

      const backendUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000' 
        : `http://${window.location.hostname}:5000`;

      const response = await fetch(`${backendUrl}/api/profile/update-birth-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          birth_year: year,
          birth_month: month,
          birth_day: day,
          birth_hour: hour,
          birth_minute: minute,
          gender: gender
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '정보 저장 실패');
      }

      console.log('✅ 생년월일 정보 저장 성공!');
      
      // 메인페이지로 이동
      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (error) {
      console.error('❌ 생년월일 정보 저장 에러:', error);
      setError(error.message || '정보 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f5f7fa] via-[#e8eaf0] to-[#f0f2f8]" 
      style={{ fontFamily: 'Nanum Gothic, sans-serif' }}
    >
      {/* 육각형 패턴 배경 */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* 빛 효과 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
        {/* 헤더 */}
        <div className="text-center mb-8 bg-white rounded-3xl p-6 shadow-2xl border-4 border-gray-900">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl">📝</span>
            <h1 className="text-2xl font-bold text-gray-900">회원 정보 입력</h1>
          </div>
          <div className="w-12 h-0.5 bg-gray-900 mx-auto mb-3"></div>
          <p className="text-gray-600">정확한 사주 분석을 위해<br/>생년월일과 출생 시간을 입력해주세요</p>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-gray-900">
          
          {/* 생년월일 */}
          <div className="mb-8">
            <label className="block text-gray-900 text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🎂</span>
              생년월일
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <input
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  placeholder="1990"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-50 text-gray-900 text-center text-lg font-bold focus:border-gray-900 focus:ring-2 focus:ring-gray-900 transition-all"
                  min="1900"
                  max="2024"
                />
                <div className="text-center text-gray-600 text-sm mt-1">년</div>
              </div>
              <div>
                <input
                  type="number"
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  placeholder="6"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-50 text-gray-900 text-center text-lg font-bold focus:border-gray-900 focus:ring-2 focus:ring-gray-900 transition-all"
                  min="1"
                  max="12"
                />
                <div className="text-center text-gray-600 text-sm mt-1">월</div>
              </div>
              <div>
                <input
                  type="number"
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  placeholder="15"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-50 text-gray-900 text-center text-lg font-bold focus:border-gray-900 focus:ring-2 focus:ring-gray-900 transition-all"
                  min="1"
                  max="31"
                />
                <div className="text-center text-gray-600 text-sm mt-1">일</div>
              </div>
            </div>
          </div>

          {/* 출생 시간 */}
          <div className="mb-8">
            <label className="block text-gray-900 text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">⏰</span>
              출생 시간
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  value={birthHour}
                  onChange={(e) => setBirthHour(e.target.value)}
                  placeholder="14"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-50 text-gray-900 text-center text-lg font-bold focus:border-gray-900 focus:ring-2 focus:ring-gray-900 transition-all"
                  min="0"
                  max="23"
                />
                <div className="text-center text-gray-600 text-sm mt-1">시 (0-23)</div>
              </div>
              <div>
                <input
                  type="number"
                  value={birthMinute}
                  onChange={(e) => setBirthMinute(e.target.value)}
                  placeholder="30"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-50 text-gray-900 text-center text-lg font-bold focus:border-gray-900 focus:ring-2 focus:ring-gray-900 transition-all"
                  min="0"
                  max="59"
                />
                <div className="text-center text-gray-600 text-sm mt-1">분 (0-59)</div>
              </div>
            </div>
          </div>

          {/* 성별 선택 */}
          <div className="mb-8">
            <label className="block text-gray-900 text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">👤</span>
              성별
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setGender('남자')}
                className={`py-4 px-6 rounded-xl border-2 font-bold text-lg transition-all ${
                  gender === '남자'
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                    : 'bg-gray-50 text-gray-900 border-gray-300 hover:border-gray-900'
                }`}
              >
                남자
              </button>
              <button
                type="button"
                onClick={() => setGender('여자')}
                className={`py-4 px-6 rounded-xl border-2 font-bold text-lg transition-all ${
                  gender === '여자'
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                    : 'bg-gray-50 text-gray-900 border-gray-300 hover:border-gray-900'
                }`}
              >
                여자
              </button>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-500 rounded-xl p-4">
              <p className="text-red-700 text-center font-bold">{error}</p>
            </div>
          )}

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-gray-800 shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? '저장 중...' : '정보 저장하기'}
          </button>

          {/* 안내 문구 */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4 border-2 border-gray-300">
            <p className="text-gray-600 text-sm text-center">
              💡 출생 시간을 정확히 모르시나요?<br/>
              대략적인 시간대(오전/오후)만 입력해도 괜찮아요!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}