import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const navigate = useNavigate();

  // 입력 상태
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthHour, setBirthHour] = useState('');
  const [gender, setGender] = useState('');
  const [phone1, setPhone1] = useState('010');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');

  // 에러 상태
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 편집 모드 상태
  const [isEditing, setIsEditing] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // 🔥 성공 모달 상태
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 페이지 로드 시 기존 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 🔥 동적 백엔드 URL!
        const backendUrl = window.location.hostname === 'localhost'
          ? 'https://ownwan-backend.onrender.com'
          : `https://ownwan-backend.onrender.com`;

        const token = localStorage.getItem('access_token');
        const response = await fetch(`${backendUrl}/api/profile`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();

          if (data.birth) {
            setBirthYear(data.birth.year.toString());
            setBirthMonth(data.birth.month.toString());
            setBirthDay(data.birth.day.toString());
            setBirthHour(data.birth.hour.toString());
            setGender(data.gender || '');

            if (data.phone) {
              const phoneParts = data.phone.split('-');
              if (phoneParts.length === 3) {
                setPhone1(phoneParts[0]);
                setPhone2(phoneParts[1]);
                setPhone3(phoneParts[2]);
              }
            }

            setIsEditing(false);
            setIsSaved(true);
          }
        }
      } catch (error) {
        console.error('❌ 사용자 정보 불러오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);

  // 🚪 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      // 🔥 동적 백엔드 URL!
      const backendUrl = window.location.hostname === 'localhost'
        ? 'https://ownwan-backend.onrender.com'
        : `https://ownwan-backend.onrender.com`;

      // 🔥 백엔드 로그아웃 API 호출!
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${backendUrl}/api/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log('✅ 로그아웃 성공!');
        localStorage.removeItem('access_token');  // localStorage도 정리
        navigate('/login');
      } else {
        console.error('❌ 로그아웃 실패');
        // 실패해도 일단 로그인 페이지로
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      console.error('❌ 로그아웃 에러:', error);
      // 에러 나도 일단 로그인 페이지로
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  // 🔥 수정하기 버튼 핸들러 (수정!)
  const handleEdit = (e) => {
    e.preventDefault(); // 🔥 form submit 방지!
    setIsEditing(true);
    setError('');
  };

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 유효성 검사
    if (!birthYear || !birthMonth || !birthDay) {
      setError('생년월일을 모두 입력해주세요.');
      return;
    }

    if (!birthHour) {
      setError('출생 시간대를 선택해주세요.');
      return;
    }

    if (!gender) {
      setError('성별을 선택해주세요.');
      return;
    }

    if (!phone2 || !phone3) {
      setError('휴대폰번호를 모두 입력해주세요.');
      return;
    }

    const year = parseInt(birthYear);
    const month = parseInt(birthMonth);
    const day = parseInt(birthDay);
    const hour = parseInt(birthHour);
    const minute = 0;

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

    setIsSubmitting(true);

    try {

      const phoneNumber = `${phone1}-${phone2}-${phone3}`;

      const backendUrl = window.location.hostname === 'localhost'
        ? 'https://ownwan-backend.onrender.com'
        : `https://ownwan-backend.onrender.com`;

      const token = localStorage.getItem('access_token');
      const response = await fetch(`${backendUrl}/api/profile/update-birth-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          birth_year: year,
          birth_month: month,
          birth_day: day,
          birth_hour: hour,
          birth_minute: minute,
          gender: gender,
          phone: phoneNumber
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '정보 저장 실패');
      }

      console.log('✅ 생년월일 정보 저장 성공!');

      // 🔥 저장 성공 시
      setIsEditing(false);
      setIsSaved(true);
      setShowSuccessModal(true); // 🔥 커스텀 모달 표시

    } catch (error) {
      console.error('❌ 생년월일 정보 저장 에러:', error);
      setError(error.message || '정보 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f5f7fa] via-[#e8eaf0] to-[#f0f2f8] pb-20"
      style={{ fontFamily: 'Nanum Gothic, sans-serif' }}
    >
      {/* 🔥 성공 모달 */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setShowSuccessModal(false)}
        >
          {/* 배경 오버레이 */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* 모달 박스 */}
          <div
            className="relative bg-gradient-to-br from-[#f5f7fa] via-[#e8eaf0] to-[#f0f2f8] rounded-2xl border-4 border-gray-900 shadow-2xl max-w-sm w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 육각형 패턴 배경 */}
            <div
              className="absolute inset-0 opacity-[0.03] rounded-2xl"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            />

            <div className="relative z-10">
              {/* 아이콘 */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-3xl">✅</span>
                </div>
              </div>

              {/* 메시지 */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                저장 완료!
              </h3>
              <p className="text-gray-700 text-center mb-6">
                정보가 성공적으로 저장되었습니다.
              </p>

              {/* 확인 버튼 */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all border-2 border-gray-900 shadow-lg"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

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

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-2xl">
        {/* 헤더 */}
        <div className="text-center mb-4 bg-white rounded-2xl p-4 shadow-xl border-2 border-gray-900">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xl">👤</span>
            <h1 className="text-lg font-bold text-gray-900">마이페이지</h1>
          </div>
          <p className="text-gray-600 text-xs">
            정확한 사주 분석을 위해<br></br>생년월일과 출생 시간을 입력해주세요
          </p>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 shadow-xl border-2 border-gray-900 mb-4">

          {/* 생년월일 */}
          <div className="mb-5">
            <label className="block text-gray-900 text-sm font-bold mb-2 flex items-center gap-1">
              <span className="text-lg">🎂</span>
              생년월일
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-center text-sm font-bold focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all ${!isEditing ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'
                    }`}
                >
                  <option value="">년</option>
                  {Array.from({ length: 125 }, (_, i) => 2024 - i).map(year => (
                    <option key={year} value={year}>{year}년</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-center text-sm font-bold focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all ${!isEditing ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'
                    }`}
                >
                  <option value="">월</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <option key={month} value={month}>{month}월</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-center text-sm font-bold focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all ${!isEditing ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'
                    }`}
                >
                  <option value="">일</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>{day}일</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 출생 시간대 */}
          <div className="mb-5">
            <label className="block text-gray-900 text-sm font-bold mb-2 flex items-center gap-1">
              <span className="text-lg">⏰</span>
              출생 시간대
            </label>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <select
                  value={birthHour}
                  onChange={(e) => setBirthHour(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-center text-sm font-bold focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all ${!isEditing ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'
                    }`}
                >
                  <option value="">시간대를 선택하세요</option>
                  <option value="0">자시 子時 (23-01시)</option>
                  <option value="2">축시 丑時 (01-03시)</option>
                  <option value="4">인시 寅時 (03-05시)</option>
                  <option value="6">묘시 卯時 (05-07시)</option>
                  <option value="8">진시 辰時 (07-09시)</option>
                  <option value="10">사시 巳時 (09-11시)</option>
                  <option value="12">오시 午時 (11-13시)</option>
                  <option value="14">미시 未時 (13-15시)</option>
                  <option value="16">신시 申時 (15-17시)</option>
                  <option value="18">유시 酉時 (17-19시)</option>
                  <option value="20">술시 戌時 (19-21시)</option>
                  <option value="22">해시 亥時 (21-23시)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 성별 선택 */}
          <div className="mb-5">
            <label className="block text-gray-900 text-sm font-bold mb-2 flex items-center gap-1">
              <span className="text-lg">👤</span>
              성별
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => isEditing && setGender('남자')}
                disabled={!isEditing}
                className={`py-2 px-4 rounded-lg border font-bold text-sm transition-all ${gender === '남자'
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                  : !isEditing
                    ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
                    : 'bg-gray-50 text-gray-900 border-gray-300 hover:border-gray-900'
                  }`}
              >
                남자
              </button>
              <button
                type="button"
                onClick={() => isEditing && setGender('여자')}
                disabled={!isEditing}
                className={`py-2 px-4 rounded-lg border font-bold text-sm transition-all ${gender === '여자'
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                  : !isEditing
                    ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
                    : 'bg-gray-50 text-gray-900 border-gray-300 hover:border-gray-900'
                  }`}
              >
                여자
              </button>
            </div>
          </div>

          {/* 휴대폰번호 */}
          <div className="mb-5">
            <label className="block text-gray-900 text-sm font-bold mb-2 flex items-center gap-1">
              <span className="text-lg">📱</span>
              휴대폰번호
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <input
                  type="text"
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                  placeholder="010"
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-center text-sm font-bold focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all ${!isEditing ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'
                    }`}
                  maxLength="3"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  placeholder="1234"
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-center text-sm font-bold focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all ${!isEditing ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'
                    }`}
                  maxLength="4"
                />
              </div>
              <div>
                <input
                  type="number"
                  value={phone3}
                  onChange={(e) => setPhone3(e.target.value)}
                  placeholder="5678"
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-center text-sm font-bold focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all ${!isEditing ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-50'
                    }`}
                  maxLength="4"
                />
              </div>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-500 rounded-lg p-3">
              <p className="text-red-700 text-center font-bold text-xs">{error}</p>
            </div>
          )}

          {/* 버튼 */}
          {isEditing ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2.5 rounded-lg font-bold text-sm text-white transition-all ${isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-gray-800 shadow-md hover:shadow-lg'
                }`}
            >
              {isSubmitting ? '저장 중...' : '정보 저장하기'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEdit}
              className="w-full py-2.5 rounded-lg font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all"
            >
              수정하기
            </button>
          )}

          {/* 안내 문구 */}
          <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-300">
            <p className="text-gray-600 text-xs text-center">
              💡 출생 시간을 정확히 모르시나요?<br></br>대략적인 시간대만 선택해도 괜찮아요!
            </p>
          </div>
        </form>

        {/* 고객센터 섹션 */}
        <div className="mt-6 bg-white rounded-xl p-5 shadow-md border border-gray-200">
          <h3 className="text-gray-900 font-bold text-sm mb-4 flex items-center gap-2">
            <span className="text-lg">📞</span>
            고객센터
          </h3>
          <div className="space-y-3">
            <a href="mailto:support@ownwan.com" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <span className="text-lg">✉️</span>
                <span className="text-gray-800 font-medium text-sm">문의하기</span>
              </div>
              <span className="text-gray-400">→</span>
            </a>
            <a href="/refund" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <span className="text-lg">📋</span>
                <span className="text-gray-800 font-medium text-sm">환불정책</span>
              </div>
              <span className="text-gray-400">→</span>
            </a>
            <a href="/terms" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <span className="text-lg">📄</span>
                <span className="text-gray-800 font-medium text-sm">이용약관</span>
              </div>
              <span className="text-gray-400">→</span>
            </a>
            <a href="/privacy" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-3">
                <span className="text-lg">🔒</span>
                <span className="text-gray-800 font-medium text-sm">개인정보처리방침</span>
              </div>
              <span className="text-gray-400">→</span>
            </a>
          </div>
        </div>

        {/* 로그아웃 버튼 */}
        <button
          onClick={handleLogout}
          className="w-full py-2.5 rounded-lg font-bold text-sm bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg transition-all"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}