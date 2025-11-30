import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

export default function NewYearResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);
  const [parsedFortune, setParsedFortune] = useState(null);

  useEffect(() => {
    const data = location.state?.resultData;
    
    if (!data) {
      alert('신년운세 데이터가 없습니다.');
      navigate('/');
      return;
    }

    setResultData(data);
    
    // GPT 운세 파싱
    if (data.gpt_fortune?.success) {
      const parsed = parseNewYearFortune(data.gpt_fortune.fortune);
      setParsedFortune(parsed);
    }
  }, [location, navigate]);

  // 신년운세 파싱 함수
  const parseNewYearFortune = (fortuneText) => {
    if (!fortuneText) return null;

    const sections = {
      totalFortune: "",
      monthlyFortune: "",
      love: "",
      money: "",
      career: "",
      health: "",
      luckyDirection: "",
      luckyNumbers: "",
      luckyColors: "",
      bestMonths: "",
      cautionMonths: "",
      yearlyAdvice: ""
    };

    const lines = fortuneText.split('\n');
    let currentSection = '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.match(/^1\.|2025년 총운:/i)) {
        currentSection = 'totalFortune';
        sections.totalFortune += trimmed.replace(/^1\.|2025년 총운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^2\.|월별 운세/i)) {
        currentSection = 'monthlyFortune';
        sections.monthlyFortune += trimmed.replace(/^2\.|월별 운세.*:/i, '').trim() + '\n';
      } else if (trimmed.match(/^3\.|애정운:/i)) {
        currentSection = 'love';
        sections.love += trimmed.replace(/^3\.|애정운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^4\.|재물운:/i)) {
        currentSection = 'money';
        sections.money += trimmed.replace(/^4\.|재물운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^5\.|직장.*사업운:/i)) {
        currentSection = 'career';
        sections.career += trimmed.replace(/^5\.|직장.*사업운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^6\.|건강운:/i)) {
        currentSection = 'health';
        sections.health += trimmed.replace(/^6\.|건강운:/i, '').trim() + ' ';
      } else if (trimmed.match(/^7\.|행운의 방향:/i)) {
        currentSection = 'luckyDirection';
        sections.luckyDirection += trimmed.replace(/^7\.|행운의 방향:/i, '').trim() + ' ';
      } else if (trimmed.match(/^8\.|행운의 숫자:/i)) {
        currentSection = 'luckyNumbers';
        sections.luckyNumbers += trimmed.replace(/^8\.|행운의 숫자:/i, '').trim() + ' ';
      } else if (trimmed.match(/^9\.|행운의 컬러:/i)) {
        currentSection = 'luckyColors';
        sections.luckyColors += trimmed.replace(/^9\.|행운의 컬러:/i, '').trim() + ' ';
      } else if (trimmed.match(/^10\.|대길월:/i)) {
        currentSection = 'bestMonths';
        sections.bestMonths += trimmed.replace(/^10\.|.*대길월.*:/i, '').trim() + ' ';
      } else if (trimmed.match(/^11\.|주의월:/i)) {
        currentSection = 'cautionMonths';
        sections.cautionMonths += trimmed.replace(/^11\.|.*주의월.*:/i, '').trim() + ' ';
      } else if (trimmed.match(/^12\.|종합 조언:/i)) {
        currentSection = 'yearlyAdvice';
        sections.yearlyAdvice += trimmed.replace(/^12\.|.*종합 조언.*:/i, '').trim() + ' ';
      } else if (currentSection === 'monthlyFortune' && trimmed.match(/^\d{1,2}월:/)) {
        sections.monthlyFortune += trimmed + '\n';
      } else if (currentSection) {
        sections[currentSection] += trimmed + ' ';
      }
    }

    return sections;
  };

  if (!resultData || !parsedFortune) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf0 50%, #f0f2f8 100%)'
      }}>
        <div className="text-gray-600 text-lg">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ 
      fontFamily: "'Nanum Gothic', 'Malgun Gothic', sans-serif",
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf0 50%, #f0f2f8 100%)'
    }}>
      {/* 육각형 패턴 배경 */}
      <div className="absolute inset-0 opacity-[0.21]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='173.2' viewBox='0 0 200 173.2' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000000' stroke-width='2'%3E%3Cpath d='M 50 0 L 100 0 L 125 43.3 L 100 86.6 L 50 86.6 L 25 43.3 Z' opacity='0.4'/%3E%3Cpath d='M 150 0 L 200 0 L 225 43.3 L 200 86.6 L 150 86.6 L 125 43.3 Z' opacity='0.3'/%3E%3Cpath d='M 0 86.6 L 50 86.6 L 75 130 L 50 173.2 L 0 173.2 L -25 130 Z' opacity='0.35'/%3E%3Cpath d='M 100 86.6 L 150 86.6 L 175 130 L 150 173.2 L 100 173.2 L 75 130 Z' opacity='0.4'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '200px 173.2px'
      }}></div>

      {/* 부드러운 빛 효과 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-indigo-200 rounded-full filter blur-3xl opacity-15"></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');
        
        * {
          font-family: 'Nanum Gothic', 'Malgun Gothic', sans-serif !important;
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        
        @keyframes pulseRing {
          0% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.7; }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
          animation-fill-mode: both;
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        
        {/* 헤더 - 오운완 말풍선 로고 */}
        <div className="text-center mb-8 animate-fadeIn bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900 relative overflow-hidden">
          
          {/* 배경 블러 장식 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100 to-transparent rounded-tr-full opacity-50"></div>
          
          <div className="relative z-10">
            
            {/* 오운완 말풍선 로고 */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative" style={{animation: 'wiggle 2s ease-in-out infinite'}}>
                {/* 펄스 링 */}
                <div className="absolute -inset-2 bg-amber-200 rounded-2xl" style={{animation: 'pulseRing 2s ease-in-out infinite'}}></div>
                
                {/* 메인 말풍선 */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl px-6 py-3 shadow-lg" style={{border: '3px solid #111827'}}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🐍</span>
                    <div className="text-gray-900 text-2xl tracking-tight" style={{fontWeight: 900}}>
                      2025 신년운세
                    </div>
                    <span className="text-lg" style={{animation: 'sparkle 1.5s ease-in-out infinite'}}>✨</span>
                  </div>
                </div>
                
                {/* 말풍선 꼬리 */}
                <div 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: '10px solid #111827'
                  }}
                ></div>
              </div>
            </div>
            
            {/* 서브 타이틀 */}
            <p className="text-gray-500 text-xs mb-4 tracking-wider">을사년 신년운세 리포트</p>
            
            {/* 사용자 정보 박스 */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-3 border border-gray-200">
              <p className="text-gray-800 text-lg font-bold">{resultData.name}님의 2025년 운세</p>
              <p className="text-gray-500 text-sm">{resultData.birth_date} | {resultData.gender}</p>
            </div>
            
            {/* 만세력 배지 */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full border-2 border-green-400">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-700 text-xs font-bold">🤖 실제 만세력을 통한 운세입니다.</span>
            </div>
            
          </div>
        </div>

        {/* 사주 팔자 카드 */}
        <div className="bg-white rounded-3xl border-2 border-gray-900 shadow-2xl animate-slideUp overflow-hidden mb-6 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📜</span> 사주 팔자
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: '년주', value: resultData.saju?.year },
              { label: '월주', value: resultData.saju?.month },
              { label: '일주', value: resultData.saju?.day },
              { label: '시주', value: resultData.saju?.hour }
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 text-center border border-amber-200">
                <div className="text-xs text-amber-600 font-medium mb-1">{item.label}</div>
                <div className="text-xl font-bold text-gray-800">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 2025년 총운 */}
        <div className="bg-white rounded-3xl border-2 border-gray-900 shadow-2xl animate-slideUp overflow-hidden mb-6 p-6" style={{animationDelay: '0.1s'}}>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🎯</span> 2025년 총운
          </h3>
          <p className="text-gray-700 leading-relaxed">{parsedFortune.totalFortune}</p>
        </div>

        {/* 월별 운세 */}
        <div className="bg-white rounded-3xl border-2 border-gray-900 shadow-2xl animate-slideUp overflow-hidden mb-6 p-6" style={{animationDelay: '0.15s'}}>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📅</span> 월별 운세
          </h3>
          <div className="space-y-2">
            {parsedFortune.monthlyFortune.split('\n').map((line, idx) => (
              line.trim() && (
                <div key={idx} className="text-gray-700 text-sm py-1 border-b border-gray-100 last:border-0">
                  {line}
                </div>
              )
            ))}
          </div>
        </div>

        {/* 운세 카드들 */}
        {[
          { emoji: '💕', title: '애정운', content: parsedFortune.love },
          { emoji: '💰', title: '재물운', content: parsedFortune.money },
          { emoji: '💼', title: '직장/사업운', content: parsedFortune.career },
          { emoji: '🏥', title: '건강운', content: parsedFortune.health }
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-3xl border-2 border-gray-900 shadow-2xl animate-slideUp overflow-hidden mb-6 p-6" style={{animationDelay: `${0.2 + idx * 0.05}s`}}>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>{item.emoji}</span> {item.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">{item.content}</p>
          </div>
        ))}

        {/* 행운 정보 3개 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { emoji: '🧭', label: '행운의 방향', value: parsedFortune.luckyDirection },
            { emoji: '🔢', label: '행운의 숫자', value: parsedFortune.luckyNumbers },
            { emoji: '🎨', label: '행운의 컬러', value: parsedFortune.luckyColors }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border-2 border-gray-900 shadow-xl p-4 text-center animate-slideUp" style={{animationDelay: `${0.4 + idx * 0.05}s`}}>
              <div className="text-2xl mb-2">{item.emoji}</div>
              <div className="text-xs text-gray-500 mb-1">{item.label}</div>
              <div className="text-sm font-bold text-gray-800">{item.value}</div>
            </div>
          ))}
        </div>

        {/* 대길월 & 주의월 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl border-2 border-green-500 shadow-xl p-4 animate-slideUp" style={{animationDelay: '0.55s'}}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">✨</span>
              <span className="font-bold text-green-600">대길월</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{parsedFortune.bestMonths}</p>
          </div>
          <div className="bg-white rounded-2xl border-2 border-red-400 shadow-xl p-4 animate-slideUp" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">⚠️</span>
              <span className="font-bold text-red-500">주의월</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{parsedFortune.cautionMonths}</p>
          </div>
        </div>

        {/* 종합 조언 */}
        <div className="bg-white rounded-3xl border-2 border-gray-900 shadow-2xl animate-slideUp overflow-hidden mb-6 p-6" style={{animationDelay: '0.65s'}}>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📝</span> 2025년 종합 조언
          </h3>
          <p className="text-gray-700 leading-relaxed">{parsedFortune.yearlyAdvice}</p>
        </div>

        {/* 홈으로 버튼 */}
        <button
          onClick={() => navigate('/')}
          className="w-full max-w-md mx-auto block bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <HomeIcon className="w-5 h-5" />
          홈으로 돌아가기
        </button>
        
        <div className="h-8"></div>
      </div>
    </div>
  );
}