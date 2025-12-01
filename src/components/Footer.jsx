import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 px-4 pb-6">
      <div className="max-w-4xl mx-auto text-center text-[11px] leading-relaxed">
        
        {/* 상호 + 슬로건 */}
        <p className="text-white font-bold text-sm mb-1">
          오운완 | 오늘의 운세 완료!
        </p>
        <p className="text-gray-500 text-[10px] mb-3">
          Your Daily Fortune, Delivered Every Morning
        </p>

        {/* 사업자 정보 - 한 줄씩 */}
        <div className="text-gray-500 space-y-0.5">
          <p>
            상호 오운완 | 오늘의 운세 완료! ㅣ 대표 최하나 ㅣ 사업자등록번호 476-624-00353
          </p>
          <p>
            주소 경기도 김포시 양촌읍 누산봉성로53번길74 ㅣ 통신판매업신고번호 2016-인천서구-0890 ㅣ 고객센터 +82 2364-4656
          </p>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-700 my-3"></div>

        {/* 하단 링크 + 저작권 */}
        <p className="text-gray-600 mb-1">
          Terms of Service ㅣ Privacy Policy ㅣ Contact Us
        </p>
        <p className="text-gray-600">
          © 2025 OWNWAN. All Rights Reserved. ㅣ Powered by AI Fortune Technology
        </p>

      </div>
    </footer>
  );
}