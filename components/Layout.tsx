
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  mainClassName?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNav, mainClassName = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'target', label: '目标', icon: 'track_changes', path: '/dashboard' },
    { id: 'recipes', label: '食谱', icon: 'menu_book', path: '/recipes' },
    { id: 'log', label: '打卡', icon: 'check_circle', path: '/log' },
    { id: 'my', label: '我的', icon: 'person', path: '/profile' },
  ];

  return (
    <div className="relative flex flex-col min-h-screen bg-background-light max-w-md mx-auto shadow-2xl overflow-x-hidden">
      <main className={`flex-1 flex flex-col ${hideNav ? '' : 'pb-14'} ${mainClassName}`}>
        {children}
      </main>

      {!hideNav && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 ios-blur border-t border-gray-100 px-6 pt-1.5 pb-2.5 flex justify-between items-center z-50">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-0.5 flex-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`}
              >
                <span className={`material-symbols-outlined text-[22px] ${isActive ? 'filled' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-[10px] font-bold tracking-tight leading-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default Layout;
