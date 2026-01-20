
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const StatCard: React.FC<{ title: string; value: string | number; icon: string; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
    <div className={`size-14 rounded-xl flex items-center justify-center text-white shadow-lg ${color}`}>
      <span className="material-symbols-outlined text-3xl">{icon}</span>
    </div>
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ users: 0, recipes: 0, logs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1. Users count
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // 2. Recipes count
        const { count: recipesCount } = await supabase
          .from('recipes')
          .select('*', { count: 'exact', head: true });

        // 3. Weight Logs count
        const { count: logsCount } = await supabase
          .from('weight_logs')
          .select('*', { count: 'exact', head: true });

        setStats({
          users: usersCount || 0,
          recipes: recipesCount || 0,
          logs: logsCount || 0
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-900">数据概览</h2>
        <p className="text-slate-500 font-medium mt-1">系统整体运行情况</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="注册用户" 
          value={loading ? '-' : stats.users} 
          icon="group" 
          color="bg-blue-500 shadow-blue-500/30" 
        />
        <StatCard 
          title="食谱总数" 
          value={loading ? '-' : stats.recipes} 
          icon="menu_book" 
          color="bg-emerald-500 shadow-emerald-500/30" 
        />
        <StatCard 
          title="打卡记录" 
          value={loading ? '-' : stats.logs} 
          icon="monitoring" 
          color="bg-violet-500 shadow-violet-500/30" 
        />
      </div>

      {/* Placeholder for charts or recent activity */}
      <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="bg-slate-50 p-4 rounded-full mb-4">
           <span className="material-symbols-outlined text-slate-300 text-4xl">bar_chart</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900">更多图表即将上线</h3>
        <p className="text-slate-400 max-w-sm mt-2">
          这里将展示用户增长趋势、活跃度分析等详细数据图表。
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
