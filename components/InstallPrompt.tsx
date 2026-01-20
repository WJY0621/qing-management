
import React, { useState, useEffect } from 'react';

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    const isInStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(isInStandalone);

    if (isInStandalone) return;

    // Handle Android/PC install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (isIOS) {
        // We can show the prompt immediately or wait for user interaction
        // For now, let's just set state so we can render a button that triggers the instruction
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    // Android / PC
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      // iOS or other browsers that don't support beforeinstallprompt
      // Check if it is iOS to show specific instructions
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIOS) {
        setShowIOSPrompt(true);
      } else {
        alert('请使用浏览器菜单中的“添加到主屏幕”或“安装应用”功能来下载。');
      }
    }
  };

  if (isStandalone) return null;
  if (!deferredPrompt && !(/iPad|iPhone|iPod/.test(navigator.userAgent))) return null;

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-700">
        <button
          onClick={handleInstallClick}
          className="bg-slate-900/90 backdrop-blur-md text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 active:scale-95 transition-all border border-white/10"
        >
          <div className="bg-white/20 p-1.5 rounded-full">
            <span className="material-symbols-outlined text-sm font-bold">download</span>
          </div>
          <div className="text-left">
            <p className="text-[10px] font-medium text-slate-300 leading-none mb-0.5">体验更好</p>
            <p className="text-[13px] font-bold leading-none">下载 App</p>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-sm">close</span>
        </button>
      </div>

      {/* iOS Guide Modal */}
      {showIOSPrompt && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowIOSPrompt(false)}>
          <div className="bg-white w-full max-w-sm mx-4 mb-4 sm:mb-0 rounded-[2rem] p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                 <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined filled text-2xl">ios_share</span>
                 </div>
                 <div>
                   <h3 className="text-lg font-black text-slate-900">安装到 iPhone</h3>
                   <p className="text-xs text-slate-500 font-bold">简单两步，即可拥有原生体验</p>
                 </div>
              </div>
              <button onClick={() => setShowIOSPrompt(false)} className="bg-slate-100 p-1 rounded-full text-slate-400 hover:bg-slate-200">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl">
                <span className="bg-white size-8 flex items-center justify-center rounded-full font-black text-slate-900 shadow-sm border border-slate-100">1</span>
                <p className="text-sm font-bold text-slate-600 flex-1">
                  点击浏览器底部的 <span className="inline-flex align-middle mx-1"><span className="material-symbols-outlined text-blue-500">ios_share</span></span> 分享按钮
                </p>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl">
                <span className="bg-white size-8 flex items-center justify-center rounded-full font-black text-slate-900 shadow-sm border border-slate-100">2</span>
                <p className="text-sm font-bold text-slate-600 flex-1">
                  向下滑动并选择 <span className="font-black text-slate-800">"添加到主屏幕"</span>
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
               <span className="material-symbols-outlined text-slate-300 animate-bounce">keyboard_arrow_down</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallPrompt;
