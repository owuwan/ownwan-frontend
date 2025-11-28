import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Calendar, Clock, Phone, ChevronRight, Star } from 'lucide-react';

export default function MainPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    birthHour: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFreeTrial = () => {
    if (!formData.name || !formData.birthYear || !formData.birthMonth || !formData.birthDay) {
      alert('이름과 생년월일을 입력해주세요!');
      return;
    }
    navigate('/result', { state: { formData } });
  };

  const handleSubscribe = () => {
    navigate('/payment');
  };

  // 연도 옵션 생성 (1900~2025)
  const years = [];
  for (let i = 2025; i >= 1900; i--) {
    years.push(i);
  }

  // 월 옵션 생성 (1~12)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 일 옵션 생성 (1~31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2000')`,
          filter: 'brightness(0.35) saturate(1.4)'
        }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/80 via-black/50 to-black/85"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-purple-950/60 to-pink-950/50"></div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-radial from-pink-500/50 via-purple-500/35 to-transparent blur-3xl" style={{mixBlendMode: 'screen'}}></div>
        <div className="absolute -top-40 -right-40 w-[900px] h-[900px] bg-gradient-radial from-cyan-400/40 via-blue-500/30 to-transparent blur-3xl" style={{mixBlendMode: 'screen'}}></div>
        <div className="absolute -bottom-40 -left-40 w-[1000px] h-[1000px] bg-gradient-radial from-fuchsia-500/45 via-purple-600/30 to-transparent blur-3xl" style={{mixBlendMode: 'screen'}}></div>
        <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-gradient-radial from-orange-400/35 via-pink-500/25 to-transparent blur-3xl" style={{mixBlendMode: 'screen'}}></div>
        <div className="absolute top-20 -left-20 w-[800px] h-[800px] bg-gradient-radial from-purple-400/40 via-indigo-500/30 to-transparent blur-3xl" style={{mixBlendMode: 'screen'}}></div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div key={`big-${i}`} className="absolute rounded-full animate-star-twinkle"
            style={{
              width: Math.random() * 6 + 3 + 'px',
              height: Math.random() * 6 + 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              background: `radial-gradient(circle, ${Math.random() > 0.7 ? '#fef3c7' : Math.random() > 0.4 ? '#fde68a' : '#fbbf24'}, transparent)`,
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 3 + 2 + 's',
              boxShadow: `0 0 ${Math.random() * 20 + 10}px rgba(251, 191, 36, ${Math.random() * 0.6 + 0.4})`
            }}></div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div key={`small-${i}`} className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 0.5 + 'px',
              height: Math.random() * 2 + 0.5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's'
            }}></div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Star key={`star-icon-${i}`} className="absolute text-yellow-300 animate-pulse"
            style={{
              width: Math.random() * 20 + 10 + 'px',
              height: Math.random() * 20 + 10 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 4 + 's',
              opacity: Math.random() * 0.5 + 0.4,
              filter: `drop-shadow(0 0 ${Math.random() * 15 + 5}px rgba(252, 211, 77, 0.8))`
            }} />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Sparkles className="w-12 h-12 text-yellow-200 mr-3 animate-pulse" style={{filter: 'drop-shadow(0 0 15px rgba(254, 243, 199, 0.9))'}} />
              <div className="absolute inset-0 w-12 h-12 bg-yellow-300 opacity-40 rounded-full blur-xl animate-ping"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-100 via-yellow-200 to-amber-300 bg-clip-text text-transparent drop-shadow-2xl"
              style={{textShadow: '0 0 40px rgba(252, 211, 77, 0.6), 0 0 80px rgba(251, 191, 36, 0.4)', letterSpacing: '0.05em'}}>
              ALL DAY
            </h1>
            <div className="relative">
              <Sparkles className="w-12 h-12 text-yellow-200 ml-3 animate-pulse" style={{filter: 'drop-shadow(0 0 15px rgba(254, 243, 199, 0.9))'}} />
              <div className="absolute inset-0 w-12 h-12 bg-yellow-300 opacity-40 rounded-full blur-xl animate-ping"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-lg" style={{textShadow: '0 0 30px rgba(167, 139, 250, 0.8), 0 0 60px rgba(139, 92, 246, 0.5)'}}>사주리포트</h2>
          <p className="text-purple-100 text-lg font-medium drop-shadow-md">매일 아침 8시, 나만의 오늘사주가 도착해요</p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent rounded-full shadow-lg" style={{boxShadow: '0 0 20px rgba(252, 211, 77, 0.6)'}}></div>
          </div>
        </div>

        <button onClick={handleSubscribe}
          className="w-full bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 text-purple-950 font-bold py-6 px-6 rounded-2xl mb-8 shadow-2xl hover:shadow-yellow-400/60 transform hover:scale-105 transition-all duration-300 flex items-center justify-between relative overflow-hidden group"
          style={{boxShadow: '0 15px 50px rgba(251, 191, 36, 0.5), 0 0 60px rgba(251, 191, 36, 0.3)'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="text-lg relative z-10 flex items-center drop-shadow-lg">
            <Star className="w-6 h-6 mr-2 animate-spin" style={{animationDuration: '4s'}} />
            ALL DAY 사주리포트 구독하기
          </span>
          <ChevronRight className="w-7 h-7 relative z-10" />
        </button>

        <div className="bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/30 relative overflow-hidden"
          style={{boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 100px rgba(167, 139, 250, 0.2)'}}>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent shadow-lg" style={{boxShadow: '0 0 30px rgba(252, 211, 77, 0.8)'}}></div>
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-radial from-yellow-300/30 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-radial from-purple-400/30 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          <div className="mb-6 relative">
            <h2 className="text-white text-2xl font-bold mb-2 flex items-center drop-shadow-lg">
              <Sparkles className="w-7 h-7 mr-2 text-yellow-200" style={{filter: 'drop-shadow(0 0 10px rgba(252, 211, 77, 0.9))'}} />
              사주 정보 입력
            </h2>
            <div className="w-28 h-1 bg-gradient-to-r from-yellow-300 via-amber-400 to-transparent rounded-full" style={{boxShadow: '0 0 20px rgba(252, 211, 77, 0.6)'}}></div>
          </div>

          <div className="mb-5">
            <label className="text-white text-sm font-bold mb-2 block drop-shadow-md">이름</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="홍길동"
              className="w-full bg-white/15 text-black placeholder-purple-300 px-5 py-4 rounded-xl border-2 border-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition-all backdrop-blur-xl font-medium"
              style={{boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.4), 0 4px 20px rgba(0, 0, 0, 0.2)'}} />
          </div>

          <div className="mb-5">
            <label className="text-white text-sm font-bold mb-2 block flex items-center drop-shadow-md">
              <Calendar className="w-4 h-4 mr-1" />생년월일
            </label>
            <div className="grid grid-cols-3 gap-3">
              <select name="birthYear" value={formData.birthYear} onChange={handleInputChange}
                className="bg-white/15 text-black px-3 py-4 rounded-xl border-2 border-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition-all text-center font-bold backdrop-blur-xl"
                style={{boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.4), 0 4px 20px rgba(0, 0, 0, 0.2)'}}>
                <option value="" className="text-gray-800 bg-white">년도</option>
                {years.map(year => (
                  <option key={year} value={year} className="text-gray-800 bg-white">{year}</option>
                ))}
              </select>
              <select name="birthMonth" value={formData.birthMonth} onChange={handleInputChange}
                className="bg-white/15 text-black px-3 py-4 rounded-xl border-2 border-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition-all text-center font-bold backdrop-blur-xl"
                style={{boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.4), 0 4px 20px rgba(0, 0, 0, 0.2)'}}>
                <option value="" className="text-gray-800 bg-white">월</option>
                {months.map(month => (
                  <option key={month} value={month} className="text-gray-800 bg-white">{month}월</option>
                ))}
              </select>
              <select name="birthDay" value={formData.birthDay} onChange={handleInputChange}
                className="bg-white/15 text-black px-3 py-4 rounded-xl border-2 border-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition-all text-center font-bold backdrop-blur-xl"
                style={{boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.4), 0 4px 20px rgba(0, 0, 0, 0.2)'}}>
                <option value="" className="text-gray-800 bg-white">일</option>
                {days.map(day => (
                  <option key={day} value={day} className="text-gray-800 bg-white">{day}일</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-5">
            <label className="text-white text-sm font-bold mb-2 block flex items-center drop-shadow-md">
              <Clock className="w-4 h-4 mr-1" />태어난 시간 (선택)
            </label>
            <select name="birthHour" value={formData.birthHour} onChange={handleInputChange}
              className="w-full bg-white/15 text-black px-5 py-4 rounded-xl border-2 border-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition-all backdrop-blur-xl font-bold"
              style={{boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.4), 0 4px 20px rgba(0, 0, 0, 0.2)'}}>
              <option value="" className="text-gray-800 bg-white">모름/선택안함</option>
              <option value="23-01" className="text-gray-800 bg-white">자시 (23:00~01:00)</option>
              <option value="01-03" className="text-gray-800 bg-white">축시 (01:00~03:00)</option>
              <option value="03-05" className="text-gray-800 bg-white">인시 (03:00~05:00)</option>
              <option value="05-07" className="text-gray-800 bg-white">묘시 (05:00~07:00)</option>
              <option value="07-09" className="text-gray-800 bg-white">진시 (07:00~09:00)</option>
              <option value="09-11" className="text-gray-800 bg-white">사시 (09:00~11:00)</option>
              <option value="11-13" className="text-gray-800 bg-white">오시 (11:00~13:00)</option>
              <option value="13-15" className="text-gray-800 bg-white">미시 (13:00~15:00)</option>
              <option value="15-17" className="text-gray-800 bg-white">신시 (15:00~17:00)</option>
              <option value="17-19" className="text-gray-800 bg-white">유시 (17:00~19:00)</option>
              <option value="19-21" className="text-gray-800 bg-white">술시 (19:00~21:00)</option>
              <option value="21-23" className="text-gray-800 bg-white">해시 (21:00~23:00)</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="text-white text-sm font-bold mb-2 block flex items-center drop-shadow-md">
              <Phone className="w-4 h-4 mr-1" />휴대폰 번호 (카카오톡 전송용)
            </label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="010-1234-5678"
              className="w-full bg-white/15 text-black placeholder-purple-300 px-5 py-4 rounded-xl border-2 border-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 transition-all backdrop-blur-xl font-medium"
              style={{boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.4), 0 4px 20px rgba(0, 0, 0, 0.2)'}} />
          </div>

          <button onClick={handleFreeTrial}
            className="w-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-white font-bold py-5 px-6 rounded-xl shadow-2xl hover:shadow-purple-400/60 transform hover:scale-105 transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
            style={{boxShadow: '0 15px 50px rgba(168, 85, 247, 0.5), 0 0 60px rgba(217, 70, 239, 0.3)'}}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Sparkles className="w-6 h-6 mr-2 relative z-10" />
            <span className="relative z-10 drop-shadow-lg">1회 무료 체험하기</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gradient-to-br from-amber-400/25 via-yellow-500/15 to-orange-500/10 backdrop-blur-2xl rounded-2xl p-6 border-2 border-yellow-300/40 relative overflow-hidden"
            style={{boxShadow: '0 15px 50px rgba(251, 191, 36, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 80px rgba(251, 191, 36, 0.15)'}}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent pointer-events-none" style={{boxShadow: '0 0 30px rgba(252, 211, 77, 0.8)'}}></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-radial from-yellow-300/30 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            
            <p className="text-yellow-100 font-bold text-xl mb-3 flex items-center justify-center drop-shadow-lg">
              <Star className="w-6 h-6 mr-2" style={{filter: 'drop-shadow(0 0 12px rgba(254, 243, 199, 0.9))'}} />
              매일 카톡으로 받는 사주리포트
            </p>
            <p className="text-white text-base mb-4 font-medium drop-shadow-md">🤖 GPT운세봇으로 14가지 운세를 매일 오전 8시 전송!</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-purple-50 font-semibold">
              <div className="bg-white/15 rounded-lg py-2 backdrop-blur-xl border border-white/30 drop-shadow-lg" style={{boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.1)'}}>💫 총운</div>
              <div className="bg-white/15 rounded-lg py-2 backdrop-blur-xl border border-white/30 drop-shadow-lg" style={{boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.1)'}}>💕 애정운</div>
              <div className="bg-white/15 rounded-lg py-2 backdrop-blur-xl border border-white/30 drop-shadow-lg" style={{boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.1)'}}>💼 사업운</div>
              <div className="bg-white/15 rounded-lg py-2 backdrop-blur-xl border border-white/30 drop-shadow-lg" style={{boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.1)'}}>💰 금전운</div>
              <div className="bg-white/15 rounded-lg py-2 backdrop-blur-xl border border-white/30 drop-shadow-lg" style={{boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.1)'}}>💪 건강운</div>
              <div className="bg-white/15 rounded-lg py-2 backdrop-blur-xl border border-white/30 drop-shadow-lg" style={{boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.1)'}}>👥 대인관계운</div>
              <div className="bg-white/15 rounded-lg py-2 backdrop-blur-xl border border-white/30 drop-shadow-lg" style={{boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.1)'}}>👨‍👩‍👧‍👦 가족운</div>
              <div className="bg-white/15 rounded-lg py-2 backdrop-blur-xl border border-white/30 drop-shadow-lg" style={{boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.1)'}}>📚 학업운</div>
              <div className="bg-white/15 rounded-lg py-2 backdrop-blur-xl border border-white/30 drop-shadow-lg" style={{boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.1)'}}>🚗 여행운</div>
              <div className="bg-white/15 rounded-lg py-2 backdrop-blur-xl border border-white/30 drop-shadow-lg" style={{boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.1)'}}>🏡 부동산운</div>
              <div className="bg-white/15 rounded-lg py-2 backdrop-blur-xl border border-white/30 drop-shadow-lg" style={{boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.1)'}}>🏠 행운의 장소</div>
              <div className="bg-white/15 rounded-lg py-2 backdrop-blur-xl border border-white/30 drop-shadow-lg" style={{boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.1)'}}>🎲 행운의 숫자</div>
              <div className="bg-white/15 rounded-lg py-2 backdrop-blur-xl border border-white/30 drop-shadow-lg" style={{boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.1)'}}>🎨 행운의 색상</div>
              <div className="bg-white/15 rounded-lg py-2 backdrop-blur-xl border border-white/30 drop-shadow-lg" style={{boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.1)'}}>⚠️ 리스크</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-purple-200 text-xs drop-shadow-md">
          <p>© 2025 ALL DAY 사주리포트. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        @keyframes star-twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 25% { opacity: 0.8; transform: scale(1.3); } 50% { opacity: 1; transform: scale(1.5); } 75% { opacity: 0.6; transform: scale(1.2); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        .animate-star-twinkle { animation: star-twinkle 3s ease-in-out infinite; }
        .bg-gradient-radial { background: radial-gradient(circle, var(--tw-gradient-stops)); }
      `}</style>
    </div>
  );
}