import React, { useState } from 'react';
import { Smartphone, Calendar, ExternalLink } from 'lucide-react';

export default function KakaoAlimtalkTemplate() {
  const [selectedType, setSelectedType] = useState('daily');

  // 실제 알림톡 텍스트 템플릿
  const dailyTemplate = `✨ 환길동님의 ALL DAY 사주리포트
2025년 10월 16일

━━━━━━━━━━━━━━━━━━

🌟 오늘의 총평
오늘은 전반적으로 긍정적인 기운이 흐르는 날입니다. 특히 오전 시간대에 좋은 소식이 들려올 가능성이 높으며 중요한 결정은 오전에 하시는 것이 좋습니다. 긍정적인 마음가짐으로 하루를 시작하면 예상보다 더 좋은 결과를 얻을 수 있습니다.

━━━━━━━━━━━━━━━━━━

🎲 오늘의 행운번호
7, 14, 23, 31, 38, 42, 45

🎨 오늘의 행운 컬러
보라색

⚠️ 오늘의 주의사항
낙뢰가지, 계단, 곡

━━━━━━━━━━━━━━━━━━

💝 애정운, 사업운, 금전운, 건강운 등
오늘의 상세한 운세가 궁금하신가요?

👉 아래 버튼을 눌러 확인하세요!

[오늘의 상세 운세 보기]

━━━━━━━━━━━━━━━━━━

매일 아침 8시, 당신의 하루를 준비합니다 ✨
© ALL DAY 사주리포트`;

  const monthlyTemplate = `🗓️ 환길동님의 이번 달 사주리포트
2025년 10월

━━━━━━━━━━━━━━━━━━

🌟 이번 달 총운
이번 달은 새로운 시작을 준비하기 좋은 시기입니다. 특히 중순 이후로 좋은 기회가 찾아올 것이며 준비를 철저히 하세요. 인간관계에서도 좋은 인연을 만날 수 있는 달입니다. 그러나 당황하며 어려운 결정에 한 걸음 더 다가갈 수 있습니다.

━━━━━━━━━━━━━━━━━━

💫 이번 달 주요 포인트

✨ 행운의 날
10월 7일, 15일, 23일

💰 재물운 상승 시기
10월 중순 이후 (15일~25일)

🎲 애정운 상승 시기
10월 초순 (1일~10일)

⚠️ 주의할 날
10월 13일, 20일

━━━━━━━━━━━━━━━━━━

💝 이번 달 상세 운세가 궁금하신가요?

👉 아래 버튼을 눌러 확인하세요!

[이번 달 상세 운세 보기]

━━━━━━━━━━━━━━━━━━

행복한 한 달 되세요! 🗓️
© ALL DAY 사주리포트`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <Smartphone className="w-8 h-8 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">카카오톡 알림톡 템플릿</h1>
          </div>
          <p className="text-center text-gray-600 mb-6">
            실제 사용자에게 전송될 텍스트 템플릿입니다
          </p>

          {/* 탭 선택 */}
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedType('daily')}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
                selectedType === 'daily'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              📅 일일 리포트
            </button>
            <button
              onClick={() => setSelectedType('monthly')}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
                selectedType === 'monthly'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              🗓️ 월간 리포트
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 왼쪽: 카카오톡 미리보기 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <Smartphone className="w-5 h-5 mr-2 text-purple-600" />
              카카오톡 화면 미리보기
            </h2>
            
            {/* 카카오톡 스타일 컨테이너 */}
            <div className="bg-gradient-to-b from-yellow-50 to-white rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-300">
              {/* 카카오톡 헤더 */}
              <div className="bg-gradient-to-r from-yellow-400 to-amber-400 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-purple-900">ALL DAY 사주리포트</p>
                    <p className="text-xs text-purple-700">알림톡</p>
                  </div>
                </div>
                <Calendar className="w-5 h-5 text-purple-900" />
              </div>

              {/* 메시지 내용 */}
              <div className="bg-white p-5">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                  <pre className="text-xs text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
                    {selectedType === 'daily' ? dailyTemplate : monthlyTemplate}
                  </pre>
                  
                  {/* 버튼 (시뮬레이션) */}
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <button className="w-full bg-white border-2 border-purple-500 text-purple-600 font-bold py-3 px-4 rounded-lg hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      {selectedType === 'daily' ? '오늘의 상세 운세 보기' : '월간 상세 운세 보기'}
                    </button>
                  </div>
                </div>
                
                <p className="text-xs text-gray-400 text-center mt-3">
                  오전 8:00
                </p>
              </div>
            </div>
          </div>

          {/* 오른쪽: 시스템 구조 설명 */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              🔧 하이라이트 시스템 구조
            </h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">⚙️</span>
                데이터 플로우
              </h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                  <p className="text-sm font-bold text-blue-900 mb-1">1️⃣ 매일 아침 8시</p>
                  <p className="text-xs text-gray-700">
                    • GPT API로 오늘 운세 생성<br/>
                    • 총평만 DB에 저장 (경량)<br/>
                    • 카카오톡 알림톡 전송
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
                  <p className="text-sm font-bold text-green-900 mb-1">2️⃣ 사용자가 버튼 클릭</p>
                  <p className="text-xs text-gray-700">
                    • 앱페이지 열림<br/>
                    • 캐시 데이터 있으면 즉시 표시<br/>
                    • 없으면 GPT API 실시간 생성
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
                  <p className="text-sm font-bold text-purple-900 mb-1">3️⃣ 7일 후</p>
                  <p className="text-xs text-gray-700">
                    • 오래된 캐시 자동 삭제<br/>
                    • DB 용량 관리 (최적화)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <h3 className="font-bold text-gray-800 mb-3">💾 데이터 저장 구조</h3>
              
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <pre className="text-xs text-gray-700 font-mono">
{`daily_reports 테이블:
━━━━━━━━━━━━━━━━
- report_id
- user_id
- date (2025-10-16)
- summary (총평 텍스트)
- lucky_numbers (행운번호)
- lucky_color (행운 컬러)
- risks (주의사항)
- created_at
- expires_at (7일 후)

저장 용량:
1명 = ~500자 x 7일 = 3.5KB
1만명 = 35MB (매우 가벼움!)`}
                </pre>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-3">💝 알림톡 사양</h3>
              
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium">발신자명</span>
                  <span className="text-gray-600">ALL DAY 사주리포트</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium">전송시간</span>
                  <span className="text-gray-600">매일 오전 8:00</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium">문자수</span>
                  <span className="text-gray-600">약 400~600자</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium">버튼</span>
                  <span className="text-gray-600">웹링크 1개</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium">포함</span>
                  <span className="text-gray-600">이미지 텍스트 + 이모지</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">비용</span>
                  <span className="text-gray-600">건당 8~15원</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 중점 */}
        <div className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl shadow-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <span className="text-2xl mr-2">✨</span>
            하이라이트 방식의 장점
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="font-bold mb-2">💰 비용 효율</p>
              <p className="text-sm opacity-90">총평만 저장해서 DB 비용 최소화</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="font-bold mb-2">⚡ 빠른 속도</p>
              <p className="text-sm opacity-90">캐시 활용으로 즉시 로딩</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="font-bold mb-2">⚙️ 유스케이스</p>
              <p className="text-sm opacity-90">최근 7일 운세 확인 가능</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}