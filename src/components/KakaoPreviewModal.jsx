import React from 'react';

export default function KakaoPreviewModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const today = new Date();
  const dateStr = `${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* 모달 컨테이너 */}
      <div 
        className="relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="text-center mb-4">
          <span className="text-white text-lg font-bold">
            💌 매일 아침 8시, 이렇게 받아요!
          </span>
        </div>

        {/* 카카오톡 화면 */}
        <div className="bg-[#B2C7D9] rounded-2xl overflow-hidden shadow-2xl">
          
          {/* 카톡 상단 바 */}
          <div className="bg-[#3B1E1E] px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">오운완</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">오운완</p>
              <p className="text-gray-300 text-xs">알림톡</p>
            </div>
          </div>

          {/* 채팅 영역 */}
          <div className="p-4 space-y-3 min-h-[380px]">
            
            {/* 날짜 */}
            <div className="text-center">
              <span className="text-xs text-gray-600 bg-white/50 px-3 py-1 rounded-full">
                오늘 오전 8:00
              </span>
            </div>

            {/* 알림톡 메시지 */}
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex-shrink-0 flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">오운완</span>
              </div>
              
              <div className="flex-1">
                <p className="text-xs text-gray-700 mb-1">오운완</p>
                <div className="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm">
                  
                  <div className="space-y-3">
                    <p className="font-bold text-gray-900">
                      🌅 {dateStr} 오늘의 운세
                    </p>
                    
                    <div className="border-l-4 border-amber-400 pl-3 py-1">
                      <p className="text-sm text-gray-700 font-medium">
                        회원님의 오늘 운세예요!
                      </p>
                    </div>

                    {/* 운세 미리보기 */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span>💰</span>
                        <div>
                          <span className="font-bold text-gray-800">금전운</span>
                          <p className="text-gray-600 text-xs mt-0.5">
                            예상치 못한 수입이 생길 수 있어요
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <span>💕</span>
                        <div>
                          <span className="font-bold text-gray-800">애정운</span>
                          <p className="text-gray-600 text-xs mt-0.5">
                            소중한 사람과 깊은 대화를 나눠보세요
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <span>💼</span>
                        <div>
                          <span className="font-bold text-gray-800">직장운</span>
                          <p className="text-gray-600 text-xs mt-0.5">
                            동료와의 협업에서 좋은 성과가...
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-xs text-center pt-1">
                        ... 외 11가지 운세
                      </p>
                    </div>

                    {/* 행운 정보 */}
                    <div className="border-t border-gray-100 pt-3">
                      <p className="text-xs text-gray-500">
                        ⏰ 행운의 시간: <span className="text-amber-600 font-bold">오후 2~4시</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        🍀 행운의 색: <span className="text-amber-600 font-bold">노란색</span>
                      </p>
                    </div>

                    {/* 버튼 */}
                    <div className="bg-gray-50 -mx-4 -mb-4 mt-3 p-3 rounded-b-xl">
                      <div className="bg-amber-400 text-center py-2.5 rounded-lg">
                        <span className="text-gray-900 font-bold text-sm">
                          👉 전체 운세 자세히 보기
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">오전 8:00</p>
              </div>
            </div>

          </div>
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all"
        >
          닫기
        </button>

        {/* 안내 */}
        <p className="text-center text-white/70 text-xs mt-3">
          매일 아침 8시, 14가지 맞춤 운세를 카톡으로 받아보세요!
        </p>
      </div>
    </div>
  );
}