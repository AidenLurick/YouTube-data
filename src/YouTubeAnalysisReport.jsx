import React, { useState } from 'react';
import youtube1 from './assets/youtube1.png'; // 图片路径
import youtube2 from './assets/youtube1.png'; // 图片路径
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ComposedChart, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Eye, MousePointer, Video, Calendar } from 'lucide-react';

const YouTubeAnalysisReport = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // 从分析结果中提取的数据
  const quarterlyData = [
    {
      quarter: '2024-Q3',
      quarterName: '2024年第3季度',
      videoCount: 34,
      totalViews: 102350,
      totalImpressions: 58827,
      avgCTR: 2.45,
      viewsPerVideo: 3010,
      impressionsPerVideo: 1730,
      viewsPerImpression: 173.98
    },
    {
      quarter: '2024-Q4',
      quarterName: '2024年第4季度',
      videoCount: 33,
      totalViews: 150024,
      totalImpressions: 29056,
      avgCTR: 2.62,
      viewsPerVideo: 4546,
      impressionsPerVideo: 880,
      viewsPerImpression: 516.33
    },
    {
      quarter: '2025-Q1',
      quarterName: '2025年第1季度',
      videoCount: 30,
      totalViews: 773236,
      totalImpressions: 48272,
      avgCTR: 3.36,
      viewsPerVideo: 25775,
      impressionsPerVideo: 1609,
      viewsPerImpression: 1601.83
    },
    {
      quarter: '2025-Q2',
      quarterName: '2025年第2季度',
      videoCount: 19,
      totalViews: 24510,
      totalImpressions: 14356,
      avgCTR: 5.61,
      viewsPerVideo: 1290,
      impressionsPerVideo: 756,
      viewsPerImpression: 170.73
    }
  ];

  // 计算环比增长
  const growthData = [
    {
      period: 'Q3→Q4 2024',
      viewsGrowth: 46.58,
      impressionsGrowth: -50.61,
      viewsChange: 47674,
      impressionsChange: -29771
    },
    {
      period: 'Q4 2024→Q1 2025',
      viewsGrowth: 415.41,
      impressionsGrowth: 66.13,
      viewsChange: 623212,
      impressionsChange: 19216
    },
    {
      period: 'Q1→Q2 2025',
      viewsGrowth: -96.83,
      impressionsGrowth: -70.26,
      viewsChange: -748726,
      impressionsChange: -33916
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const getGrowthIcon = (growth) => {
    return growth > 0 ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getGrowthColor = (growth) => {
    return growth > 0 ? 'text-green-600' : 'text-red-600';
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendValue }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <Icon className="w-5 h-5 text-blue-500" />
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      {subtitle && <div className="text-sm text-gray-600">{subtitle}</div>}
      {trend && (
        <div className="flex items-center mt-2">
          {getGrowthIcon(trendValue)}
          <span className={`ml-1 text-sm font-medium ${getGrowthColor(trendValue)}`}>
            {Math.abs(trendValue).toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">YouTube运营数据季度分析报告</h1>
        <p className="text-gray-600">入职至今的运营表现分析</p>
      </div>

      {/* 导航标签 */}
      <div className="mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', name: '总览', icon: Eye },
            { id: 'growth', name: '增长分析', icon: TrendingUp },
            { id: 'performance', name: '效果分析', icon: MousePointer }
          ].map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center px-3 py-2 border-b-2 font-medium text-sm ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {name}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* 关键指标卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="总视频数量"
              value="116"
              subtitle="2024年7月至今"
              icon={Video}
            />
            <StatCard
              title="总观看次数"
              value={formatNumber(1050120)}
              subtitle="累计播放量"
              icon={Eye}
            />
            <StatCard
              title="总展示次数"
              value={formatNumber(150511)}
              subtitle="累计曝光量"
              icon={MousePointer}
            />
            <StatCard
              title="平均点击率"
              value="3.51%"
              subtitle="整体转化率"
              icon={TrendingUp}
            />
          </div>

          {/* 季度趋势图 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">观看次数 vs 展示次数趋势</h2>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarterName" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [formatNumber(value), name]}
                  labelFormatter={(label) => `时期: ${label}`}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="totalViews" fill="#3B82F6" name="观看次数" />
                <Line yAxisId="right" type="monotone" dataKey="totalImpressions" stroke="#EF4444" strokeWidth={3} name="展示次数" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* 季度详细数据表格 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">各季度详细数据</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">季度</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">视频数量</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">总观看次数</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">总展示次数</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">平均点击率</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">单视频平均观看</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quarterlyData.map((quarter, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quarter.quarterName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quarter.videoCount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatNumber(quarter.totalViews)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatNumber(quarter.totalImpressions)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quarter.avgCTR}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatNumber(quarter.viewsPerVideo)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'growth' && (
        <div className="space-y-8">
          {/* 增长率图表 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">环比增长率分析</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
                />
                <Legend />
                <Bar dataKey="viewsGrowth" fill="#10B981" name="观看次数增长率" />
                <Bar dataKey="impressionsGrowth" fill="#F59E0B" name="展示次数增长率" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 增长分析卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {growthData.map((growth, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{growth.period}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">观看次数增长</span>
                    <div className="flex items-center">
                      {getGrowthIcon(growth.viewsGrowth)}
                      <span className={`ml-1 font-medium ${getGrowthColor(growth.viewsGrowth)}`}>
                        {growth.viewsGrowth.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">展示次数增长</span>
                    <div className="flex items-center">
                      {getGrowthIcon(growth.impressionsGrowth)}
                      <span className={`ml-1 font-medium ${getGrowthColor(growth.impressionsGrowth)}`}>
                        {growth.impressionsGrowth.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      观看变化: {growth.viewsChange > 0 ? '+' : ''}{formatNumber(growth.viewsChange)}
                    </div>
                    <div className="text-xs text-gray-500">
                      展示变化: {growth.impressionsChange > 0 ? '+' : ''}{formatNumber(growth.impressionsChange)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 关键发现 */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">关键发现</h3>
            <div className="space-y-2 text-blue-800">
              <p>• <strong>2025年Q1表现突出：</strong>观看次数相比2024年Q4增长了415.41%，达到77.3万次观看</p>
              <p>• <strong>点击率持续改善：</strong>从2024年Q3的2.45%提升到2025年Q2的5.61%</p>
              <p>• <strong>内容效率提升：</strong>单视频平均观看次数从3010增长至最高25775（2025年Q1）</p>
              <p>• <strong>2025年Q2调整期：</strong>观看次数有所下降</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-8">
          {/* 效率指标图表 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">单视频平均表现</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarterName" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [formatNumber(value), name]}
                />
                <Legend />
                <Line type="monotone" dataKey="viewsPerVideo" stroke="#8B5CF6" strokeWidth={3} name="单视频平均观看次数" />
                <Line type="monotone" dataKey="impressionsPerVideo" stroke="#06B6D4" strokeWidth={3} name="单视频平均展示次数" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 点击率趋势 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">点击率趋势变化</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarterName" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                />
                <Area type="monotone" dataKey="avgCTR" stroke="#F59E0B" fill="#FEF3C7" name="平均点击率" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 效果分析总结 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">效果分析总结</h3>
              <div className="space-y-2 text-green-800">
                <p>• 点击率稳步提升，从2.45%增长到5.61%</p>
                <p>• 2025年Q1单视频效果最佳，平均观看25.8K次</p>
                <p>• 内容质量持续优化，用户参与度提高</p>
                <p>• 展示转观看率大幅改善，最高达1601.83%</p>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* 报告总结 */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">报告总结</h2>
        <div className="prose text-gray-700">
          <p className="mb-4">
            <strong>整体表现：</strong>自入职以来，YouTube频道运营取得一些显著成效。从数据可以看出，
            内容质量和用户参与度都在稳步提升，特别是2025年Q1期间表现突出，2025年Q2期间因为公司新网站上线，大部分精力主要还是在网站方面。因为负责的内容太多，所以YouTube主要还是一些短视频，长视频没有太多的精力去运营。
          </p>
          <p className="mb-4">
            <strong>关键成就：</strong>
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>累计发布116个视频，总观看次数超过105万次</li>
            <li>点击率从2.45%提升至5.61%，提升幅度达129%</li>
            <li>单视频平均观看次数最高达到25,775次</li>
            <li>展示转观看效率大幅提升</li>
          </ul>
          <p>
            <strong>了解更多：</strong>对于数据或其他方面需要我提供的，可以添加我的联系方式，微信：qcg201 ， 邮箱：aidenlurick@gmail.com
          </p>
        </div>
      </div>
            {/* 展示图片 */}
            <div className="bg-white rounded-lg shadow-md  p-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">数据截图</h2>
              <div className="flex justify-between items-center">
                <div className="w-1/2 p-4">
                  <img src={youtube1} alt="youtube1" className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div className="w-1/2 p-4">
                  <img src={youtube2} alt="youtube2" className="w-full h-auto rounded-lg shadow-md" />
                </div>
              </div>
            </div>
    </div>
  );
};

export default YouTubeAnalysisReport;
