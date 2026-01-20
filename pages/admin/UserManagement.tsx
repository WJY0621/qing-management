
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('updated_at', { ascending: false });

        if (error) throw error;
        setUsers(data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900">用户管理</h2>
          <p className="text-slate-500 font-medium mt-1">查看所有注册用户信息</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-600">
          共 {users.length} 位用户
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-bold">ID</th>
                <th className="px-6 py-4 font-bold">角色</th>
                <th className="px-6 py-4 font-bold">性别</th>
                <th className="px-6 py-4 font-bold">年龄</th>
                <th className="px-6 py-4 font-bold">身高/体重</th>
                <th className="px-6 py-4 font-bold">目标</th>
                <th className="px-6 py-4 font-bold text-right">最后更新</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-400">加载中...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-400">暂无用户数据（或无权限查看）</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-400 text-xs truncate max-w-[100px]" title={user.id}>
                      {user.id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-500'}`}>
                        {user.role || 'USER'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-700">
                      {user.gender === 'MALE' ? '男' : '女'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {user.age} 岁
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {user.height}cm / {user.weight}kg
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-xs font-bold border border-emerald-100">
                        {user.goal}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-400 font-mono text-xs">
                      {new Date(user.updated_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
