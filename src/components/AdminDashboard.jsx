import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Users, TrendingUp, Bell, CheckCircle, XCircle, Calendar, Smartphone, CreditCard, AlertTriangle, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin/login');
  };

  const todayStats = {
    totalRevenue: 347900,
    dailySubscription: 198000,
    monthlyFortune: 110000,
    lifetimeFortune: 39900,
    totalUsers: 1247,
    newUsers: 18,
    churnUsers: 3,
    activeSubscriptions: 234,
    monthlyPurchases: 45,
    lifetimePurchases: 89,
    gptApiCalls: 2891,
    dailyApiCalls: 2650,
    monthlyApiCalls: 241,
    alimtalkSuccess: 1244,
    alimtalkFail: 3
  };

  const monthlyStats = {
    totalRevenue: 10340000,
    dailyRevenue: 6930000,
    monthlyRevenue: 2200000,
    lifetimeRevenue: 1210000,
    newUsers: 432,
    avgUsageDays: 37,
    churnRate: 8.2,
    monthlyPurchaseCount: 200,
    monthlyPurchaseGrowth: 15.3
  };

  const dailyRevenueData = [
    { date: '10/27', daily: 178200, monthly: 88000, lifetime: 29900 },
    { date: '10/28', daily: 198000, monthly: 110000, lifetime: 0 },
    { date: '10/29', daily: 247500, monthly: 132000, lifetime: 59800 },
    { date: '10/30', daily: 178200, monthly: 66000, lifetime: 29900 },
    { date: '10/31', daily: 217800, monthly: 154000, lifetime: 0 },
    { date: '11/01', daily: 168300, monthly: 99000, lifetime: 29900 },
    { date: '11/02', daily: 198000, monthly: 110000, lifetime: 29900 }
  ];

  const userGrowthData = [
    { date: '10/27', total: 1189, new: 18, churn: 5 },
    { date: '10/28', total: 1202, new: 22, churn: 9 },
    { date: '10/29', total: 1215, new: 25, churn: 12 },
    { date: '10/30', total: 1228, new: 19, churn: 6 },
    { date: '10/31', total: 1241, new: 21, churn: 8 },
    { date: '11/01', total: 1235, new: 14, churn: 20 },
    { date: '11/02', total: 1247, new: 18, churn: 3 }
  ];

  const productRevenueData = [
    { name: '일일사주', value: 67, amount: 6930000, color: '#111827' },
    { name: '월간사주', value: 21, amount: 2200000, color: '#4b5563' },
    { name: '평생사주', value: 12, amount: 1210000, color: '#9ca3af' }
  ];

  const paymentMethodData = [
    { name: '카드', value: 63, color: '#111827' },
    { name: '카카오페이', value: 37, color: '#6b7280' }
  ];

  const recentPurchases = [
    { id: 1, name: '김*수', phone: '010-1234-****', plan: '일일사주', price: '9,900원', date: '2025-11-02 08:23', status: '활성' },
    { id: 2, name: '이*영', phone: '010-5678-****', plan: '월간사주', price: '11,000원', date: '2025-11-02 07:45', status: '완료' },
    { id: 3, name: '박*민', phone: '010-9012-****', plan: '일일사주', price: '9,900원', date: '2025-11-02 06:12', status: '활성' },
    { id: 4, name: '정*아', phone: '010-3456-****', plan: '평생사주', price: '29,900원', date: '2025-11-01 22:34', status: '완료' },
    { id: 5, name: '최*호', phone: '010-7890-****', plan: '월간사주', price: '11,000원', date: '2025-11-01 21:18', status: '완료' }
  ];

  return (
    <div 
      className="min-h-screen relative p-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #E5E7EB 0%, #F9FAFB 50%, #FFFFFF 100%)'
      }}
    >
      <svg 
        width="100" 
        height="87" 
        xmlns="http://www.w3.org/2000/svg" 
        className="absolute inset-0 w-full h-full opacity-10"
      >
        <defs>
          <pattern 
            id="hexagons-admin-dashboard" 
            width="100" 
            height="87" 
            patternUnits="userSpaceOnUse"
          >
            <path 
              d="M50 0 L93.3 25 L93.3 62 L50 87 L6.7 62 L6.7 25 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect 
          width="100%" 
          height="100%" 
          fill="url(#hexagons-admin-dashboard)" 
          className="text-gray-900"
        />
      </svg>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">관리자 대시보드</h1>
              <p className="text-gray-700">오운완 운영 현황</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedPeriod('today')}
                className={`px-6 py-3 rounded-2xl font-bold transition-all border-2 ${
                  selectedPeriod === 'today'
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}>
                오늘
              </button>
              <button
                onClick={() => setSelectedPeriod('month')}
                className={`px-6 py-3 rounded-2xl font-bold transition-all border-2 ${
                  selectedPeriod === 'month'
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}>
                이번 달
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 rounded-2xl font-bold bg-red-500 text-white hover:bg-red-600 transition-all flex items-center gap-2 border-2 border-red-500">
                <LogOut className="w-4 h-4" />
                로그아웃
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>2025년 11월 2일 오후 3:45 기준</span>
          </div>
        </div>

        {selectedPeriod === 'today' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <DollarSign className="w-6 h-6 text-gray-900" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {todayStats.totalRevenue.toLocaleString()}원
                </span>
              </div>
              <h3 className="text-gray-700 font-bold mb-2">오늘 매출</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>일일: {todayStats.dailySubscription.toLocaleString()}원</div>
                <div className="font-bold">월간: {todayStats.monthlyFortune.toLocaleString()}원 ⭐</div>
                <div>평생: {todayStats.lifetimeFortune.toLocaleString()}원</div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <Users className="w-6 h-6 text-gray-900" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {todayStats.activeSubscriptions}명
                </span>
              </div>
              <h3 className="text-gray-700 font-bold mb-2">활성 구독</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>일일사주: {todayStats.activeSubscriptions}명</div>
                <div className="font-bold">월간구매: {todayStats.monthlyPurchases}건 ⭐</div>
                <div>평생사주: {todayStats.lifetimePurchases}명</div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <TrendingUp className="w-6 h-6 text-gray-900" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">+{todayStats.newUsers}</div>
                  <div className="text-sm text-red-600">-{todayStats.churnUsers}</div>
                </div>
              </div>
              <h3 className="text-gray-700 font-bold mb-2">사용자 증감</h3>
              <div className="text-sm text-gray-600">
                전체: {todayStats.totalUsers.toLocaleString()}명
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <Smartphone className="w-6 h-6 text-gray-900" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{todayStats.gptApiCalls}</div>
                  <div className="text-xs text-gray-600">API 호출</div>
                </div>
              </div>
              <h3 className="text-gray-700 font-bold mb-2">GPT & 알림톡</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>일일: {todayStats.dailyApiCalls}회</div>
                <div className="font-bold">월간: {todayStats.monthlyApiCalls}회 ⭐</div>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{todayStats.alimtalkSuccess}</span>
                  <XCircle className="w-4 h-4 text-red-500 ml-2" />
                  <span>{todayStats.alimtalkFail}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <DollarSign className="w-6 h-6 text-gray-900" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {monthlyStats.totalRevenue.toLocaleString()}원
                </span>
              </div>
              <h3 className="text-gray-700 font-bold mb-2">이번 달 매출</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>일일: {monthlyStats.dailyRevenue.toLocaleString()}원</div>
                <div className="font-bold">월간: {monthlyStats.monthlyRevenue.toLocaleString()}원 ⭐</div>
                <div>평생: {monthlyStats.lifetimeRevenue.toLocaleString()}원</div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <Calendar className="w-6 h-6 text-gray-900" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {monthlyStats.monthlyPurchaseCount}건
                </span>
              </div>
              <h3 className="text-gray-700 font-bold mb-2">월간사주 구매 ⭐</h3>
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>전월 대비 +{monthlyStats.monthlyPurchaseGrowth}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <Users className="w-6 h-6 text-gray-900" />
                </div>
                <span className="text-2xl font-bold text-green-600">
                  +{monthlyStats.newUsers}명
                </span>
              </div>
              <h3 className="text-gray-700 font-bold mb-2">이번 달 신규</h3>
              <div className="text-sm text-gray-600">
                평균 이용: {monthlyStats.avgUsageDays}일
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-100 rounded-2xl">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-2xl font-bold text-red-600">
                  {monthlyStats.churnRate}%
                </span>
              </div>
              <h3 className="text-gray-700 font-bold mb-2">이탈률</h3>
              <div className="text-sm text-gray-600">
                개선 필요
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900">
            <h3 className="text-lg font-bold text-gray-900 mb-4">일별 매출 추이 (상품별)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="daily" name="일일사주" fill="#111827" />
                <Bar dataKey="monthly" name="월간사주" fill="#4b5563" />
                <Bar dataKey="lifetime" name="평생사주" fill="#9ca3af" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900">
            <h3 className="text-lg font-bold text-gray-900 mb-4">구독자 증감 추이</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="new" name="신규" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="churn" name="이탈" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="total" name="총 사용자" stroke="#111827" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900">
            <h3 className="text-lg font-bold text-gray-900 mb-4">상품별 매출 비율 (이번 달)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productRevenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value">
                  {productRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {productRevenueData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{item.amount.toLocaleString()}원</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900">
            <h3 className="text-lg font-bold text-gray-900 mb-4">결제 수단 비율</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value">
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-gray-900">
          <h3 className="text-lg font-bold text-gray-900 mb-4">최근 구매 내역</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">이름</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">전화번호</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">상품</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">금액</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">일시</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentPurchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{purchase.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{purchase.phone}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                        purchase.plan === '일일사주' ? 'bg-gray-900 text-white' :
                        purchase.plan === '월간사주' ? 'bg-gray-700 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {purchase.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">{purchase.price}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{purchase.date}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                        purchase.status === '활성' ? 'bg-green-100 text-green-800 border-2 border-green-800' : 'bg-blue-100 text-blue-800 border-2 border-blue-800'
                      }`}>
                        {purchase.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}