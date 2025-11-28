import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Star, Heart, Briefcase, TrendingUp, Palette,
  AlertTriangle, ChevronRight, ArrowLeft, DollarSign, 
  Activity, Home, Users, Calendar
} from 'lucide-react';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};

  // 가짜 데이터 (나중에 GPT API로 교체)
  const reportData = {
    name: formData.name || "홍길동",
    date: "2025년 10월 21일",
    birthInfo: `${formData.birthYear}년 ${formData.birthMonth}월 ${formData.birthDay}일`,
    totalFortune: "오늘은 전반적으로 길한 기운이 흐르는 날입니다. 특히 오전 시간대에 좋은 소식이 들려올 가능성이 높으니 중요한 결정은 오전에 하시는 것이 좋습니다. 다만 서두르지 말고 신중하게 판단하세요.",
    loveLife: "연인이 있다면 오늘 따뜻한 대화를 나누기 좋은 날입니다. 솔직한 마음을 전하면 관계가 한층 깊어질 것입니다. 솔로라면 새로운 만남의 기회가 찾아올 수 있으니 주변 사람들과의 모임에 적극적으로 참여해보세요.",
    business: "업무나 사업에서 좋은 성과를 거둘 수 있는 날입니다. 평소 준비해온 프로젝트가 있다면 오늘 제안하기 좋은 타이밍입니다. 동료나 파트너와의 협력이 특히 중요하니 소통을 게을리하지 마세요.",
    money: "금전운이 상승하는 날입니다. 예상치 못한 소득이 생길 수 있으니 투자나 재테크에 관심을 가져보세요. 다만 충동구매는 자제하고 계획적인 소비를 하는 것이 좋습니다.",
    health: "전체적인 컨디션이 좋은 편입니다. 다만 과로는 금물이니 적절한 휴식을 취하세요. 가벼운 운동이나 스트레칭으로 몸을 풀어주면 더욱 상쾌한 하루를 보낼 수 있습니다.",
    luckyPlace: "카페나 도서관 같은 조용한 공간에서 좋은 기운을 받을 수 있습니다. 혼자만의 시간을 가지며 생각을 정리하기 좋은 장소입니다.",
    luckyNumbers: [7, 14, 23, 31, 38, 42, 45],
    luckyColor: "보라색",
    relationship: "오늘은 주변 사람들과의 관계가 원만한 날입니다. 평소 연락하지 못했던 지인에게 안부 전화를 하면 좋은 반응을 얻을 수 있습니다. 감사의 마음을 표현하기 좋은 날입니다.",
    risks: ["나뭇가지", "계단", "공"],
    summary: "오늘은 전체적으로 순조로운 하루가 될 것입니다. 긍정적인 마음가짐으로 하루를 시작하면 예상보다 더 좋은 결과를 얻을 수 있습니다. 작은 행운들이 모여 큰 행복을 만드는 날이니 주변의 소소한 기쁨들을 놓치지 마세요."
  };

  const handleSubscribe = () => {
    navigate('/payment');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 우주 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2000')`,
          filter: 'brightness(0.35) saturate(1.4)'
        }}
      ></div>

      {/* 어두운 오버레이 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/80 via-black/50 to-black/85"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-purple-950/60 to-pink-950/50"></div>

      {/* 성운 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-radial from-pink-500/50 via-purple-500/35 to-transparent blur-3xl"
          style={{mixBlendMode: 'screen'}}></div>
        <div className="absolute -top-40 -right-40 w-[900px] h-[900px] bg-gradient-radial from-cyan-400/40 via-blue-500/30 to-transparent blur-3xl"
          style={{mixBlendMode: 'screen'}}></div>
        <div className="absolute -bottom-40 -left-40 w-[1000px] h-[1000px] bg-gradient-radial from-fuchsia-500/45 via-purple-600/30 to-transparent blur-3xl"
          style={{mixBlendMode: 'screen'}}></div>
      </div>
      {/* 별들 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 0.5 + 'px',
              height: Math.random() * 3 + 0.5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's'
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-md">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={handleBack}
          className="mb-4 flex items-center text-purple-200 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>돌아가기</span>
        </button>

        {/* 헤더 */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <Sparkles className="w-8 h-8 text-yellow-200 mr-2 animate-pulse"
              style={{filter: 'drop-shadow(0 0 10px rgba(254, 243, 199, 0.9))'}} />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-100 via-yellow-200 to-amber-300 bg-clip-text text-transparent"
              style={{textShadow: '0 0 30px rgba(252, 211, 77, 0.6)'}}>
              ALL DAY 사주리포트
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-200 ml-2 animate-pulse"
              style={{filter: 'drop-shadow(0 0 10px rgba(254, 243, 199, 0.9))'}} />
          </div>
          <p className="text-purple-200 text-lg font-bold">{reportData.name} 님의 오늘 운세</p>
          <p className="text-purple-300 text-sm">{reportData.date}</p>
          <p className="text-purple-400 text-xs mt-1">{reportData.birthInfo}</p>
        </div>

        {/* 리포트 카드 */}
        <div className="bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/30 mb-6"
          style={{boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3)'}}>

          {/* 오늘의 총운 */}
          <div className="mb-6">
            <h3 className="text-yellow-200 font-bold text-lg mb-3 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" style={{filter: 'drop-shadow(0 0 8px rgba(252, 211, 77, 0.8))'}} />
              오늘의 총운
            </h3>
            <p className="text-white leading-relaxed text-sm">
              {reportData.totalFortune}
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent my-6"></div>

          {/* 오늘의 애정운 */}
          <div className="mb-6">
            <h3 className="text-pink-300 font-bold text-lg mb-3 flex items-center">
              <Heart className="w-5 h-5 mr-2" style={{filter: 'drop-shadow(0 0 8px rgba(244, 114, 182, 0.8))'}} />
              오늘의 애정운
            </h3>
            <p className="text-white leading-relaxed text-sm">
              {reportData.loveLife}
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent my-6"></div>

          {/* 오늘의 사업·거래운 */}
          <div className="mb-6">
            <h3 className="text-blue-300 font-bold text-lg mb-3 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" style={{filter: 'drop-shadow(0 0 8px rgba(147, 197, 253, 0.8))'}} />
              오늘의 사업·거래운
            </h3>
            <p className="text-white leading-relaxed text-sm">
              {reportData.business}
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent my-6"></div>

          {/* 오늘의 금전운 */}
          <div className="mb-6">
            <h3 className="text-green-300 font-bold text-lg mb-3 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" style={{filter: 'drop-shadow(0 0 8px rgba(134, 239, 172, 0.8))'}} />
              오늘의 금전운
            </h3>
            <p className="text-white leading-relaxed text-sm">
              {reportData.money}
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent my-6"></div>

          {/* 오늘의 건강운 */}
          <div className="mb-6">
            <h3 className="text-emerald-300 font-bold text-lg mb-3 flex items-center">
              <Activity className="w-5 h-5 mr-2" style={{filter: 'drop-shadow(0 0 8px rgba(110, 231, 183, 0.8))'}} />
              오늘의 건강운
            </h3>
            <p className="text-white leading-relaxed text-sm">
              {reportData.health}
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent my-6"></div>

          {/* 오늘의 대인관계운 */}
          <div className="mb-6">
            <h3 className="text-cyan-300 font-bold text-lg mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2" style={{filter: 'drop-shadow(0 0 8px rgba(103, 232, 249, 0.8))'}} />
              오늘의 대인관계운
            </h3>
            <p className="text-white leading-relaxed text-sm">
              {reportData.relationship}
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent my-6"></div>

          {/* 오늘의 행운의 장소 */}
          <div className="mb-6">
            <h3 className="text-orange-300 font-bold text-lg mb-3 flex items-center">
              <Home className="w-5 h-5 mr-2" style={{filter: 'drop-shadow(0 0 8px rgba(253, 186, 116, 0.8))'}} />
              오늘의 행운의 장소
            </h3>
            <p className="text-white leading-relaxed text-sm">
              {reportData.luckyPlace}
            </p>
          </div>

          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-300 to-transparent my-6"
            style={{boxShadow: '0 0 20px rgba(252, 211, 77, 0.6)'}}></div>
            {/* 오늘의 찰떡궁합 번호 */}
          <div className="mb-6">
            <h3 className="text-yellow-200 font-bold text-lg mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" style={{filter: 'drop-shadow(0 0 8px rgba(252, 211, 77, 0.8))'}} />
              오늘의 찰떡궁합 번호
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 justify-center">
                {reportData.luckyNumbers.slice(0, 3).map((num, idx) => (
                  <div
                    key={idx}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center font-bold text-purple-950 text-lg shadow-lg"
                    style={{boxShadow: '0 4px 20px rgba(251, 191, 36, 0.5)'}}
                  >
                    {num}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 justify-center">
                {reportData.luckyNumbers.slice(3, 7).map((num, idx) => (
                  <div
                    key={idx}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center font-bold text-purple-950 text-lg shadow-lg"
                    style={{boxShadow: '0 4px 20px rgba(251, 191, 36, 0.5)'}}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent my-6"></div>

          {/* 오늘의 퍼스널 컬러 */}
          <div className="mb-6">
            <h3 className="text-purple-300 font-bold text-lg mb-3 flex items-center">
              <Palette className="w-5 h-5 mr-2" style={{filter: 'drop-shadow(0 0 8px rgba(216, 180, 254, 0.8))'}} />
              오늘의 퍼스널 컬러
            </h3>
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg border-4 border-white/30"
                style={{boxShadow: '0 4px 20px rgba(168, 85, 247, 0.6)'}}></div>
              <span className="text-white font-bold text-xl">{reportData.luckyColor}</span>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent my-6"></div>

          {/* 오늘의 리스크 */}
          <div className="mb-6">
            <h3 className="text-red-300 font-bold text-lg mb-3 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" style={{filter: 'drop-shadow(0 0 8px rgba(252, 165, 165, 0.8))'}} />
              오늘의 리스크 ⚠️
            </h3>
            <div className="flex justify-center gap-3 flex-wrap">
              {reportData.risks.map((risk, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-red-500/20 border border-red-400/40 rounded-lg text-red-200 font-medium text-sm backdrop-blur-sm"
                >
                  {risk}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-300 to-transparent my-6"
            style={{boxShadow: '0 0 20px rgba(252, 211, 77, 0.6)'}}></div>

          {/* 오늘의 총평 */}
          <div className="mb-4 bg-gradient-to-br from-yellow-500/10 to-amber-500/5 rounded-2xl p-5 border border-yellow-400/20">
            <h3 className="text-yellow-200 font-bold text-xl mb-3 flex items-center justify-center">
              <Star className="w-6 h-6 mr-2" style={{filter: 'drop-shadow(0 0 10px rgba(254, 243, 199, 0.9))'}} />
              오늘의 총평
            </h3>
            <p className="text-white leading-relaxed text-sm text-center">
              {reportData.summary}
            </p>
          </div>
        </div>

        {/* 구독 안내 카드 */}
        <div className="bg-gradient-to-br from-amber-400/25 via-yellow-500/15 to-orange-500/10 backdrop-blur-2xl rounded-2xl p-6 border-2 border-yellow-300/40 mb-6"
          style={{boxShadow: '0 15px 50px rgba(251, 191, 36, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.3)'}}>
          <div className="text-center mb-4">
            <Star className="w-10 h-10 text-yellow-200 mx-auto mb-3 animate-pulse"
              style={{filter: 'drop-shadow(0 0 15px rgba(254, 243, 199, 0.9))'}} />
            <h3 className="text-yellow-100 font-bold text-xl mb-2">매일 이런 리포트를 받아보세요!</h3>
            <p className="text-white text-sm mb-1">월 9,900원으로 매일 아침 8시</p>
            <p className="text-purple-100 text-sm">카카오톡으로 당신의 운세를 전송해드려요</p>
          </div>

          <button
            onClick={handleSubscribe}
            className="w-full bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 text-purple-950 font-bold py-5 px-6 rounded-xl shadow-2xl hover:shadow-yellow-400/60 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            style={{boxShadow: '0 15px 50px rgba(251, 191, 36, 0.5)'}}
          >
            <Star className="w-5 h-5 mr-2" />
            <span>지금 바로 구독하기</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* 푸터 */}
        <div className="text-center text-purple-300 text-xs">
          <p>© 2025 ALL DAY 사주리포트. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}