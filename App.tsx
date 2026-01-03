
import React, { useState, useEffect } from 'react';
import { CURRICULUM } from './constants';
import { Lesson, LessonStatus, UserState } from './types';
import LessonCard from './components/LessonCard';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('grandma-quant-state');
    return saved ? JSON.parse(saved) : {
      currentDay: 1,
      progress: 0,
      completedLessons: []
    };
  });

  const [lessons, setLessons] = useState<Lesson[]>(() => {
    return CURRICULUM.map(lesson => {
      if (userState.completedLessons.includes(lesson.id)) {
        return { ...lesson, status: LessonStatus.COMPLETED };
      }
      if (lesson.day === userState.currentDay) {
        return { ...lesson, status: LessonStatus.CURRENT };
      }
      if (lesson.day < userState.currentDay) {
        return { ...lesson, status: LessonStatus.COMPLETED };
      }
      return { ...lesson, status: LessonStatus.LOCKED };
    });
  });

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    localStorage.setItem('grandma-quant-state', JSON.stringify(userState));
  }, [userState]);

  const handleLessonClick = (lesson: Lesson) => {
    setActiveLesson(lesson);
  };

  const handleLessonComplete = () => {
    if (!activeLesson) return;

    const nextDay = activeLesson.day + 1;
    const newCompleted = [...new Set([...userState.completedLessons, activeLesson.id])];
    
    setUserState({
      currentDay: nextDay,
      progress: Math.floor((newCompleted.length / CURRICULUM.length) * 100),
      completedLessons: newCompleted
    });

    setLessons(prev => prev.map(l => {
      if (l.id === activeLesson.id) return { ...l, status: LessonStatus.COMPLETED };
      if (l.day === nextDay) return { ...l, status: LessonStatus.CURRENT };
      return l;
    }));

    setActiveLesson(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Area */}
      <header className="bg-white border-b border-orange-100 pt-12 pb-8 px-6 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 serif mb-2">太奶奶的量化学院</h1>
            <p className="text-gray-500 text-lg italic">“活到老，学到老，科技投资我也行。”</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-3xl border border-orange-100 min-w-[200px]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-orange-800 font-bold">学习进度</span>
              <span className="text-orange-800 font-bold">{userState.progress}%</span>
            </div>
            <div className="w-full bg-orange-200 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-orange-500 h-full transition-all duration-1000" 
                style={{ width: `${userState.progress}%` }}
              />
            </div>
            <p className="text-xs text-orange-600 mt-2">已坚持学习 {userState.completedLessons.length} 天</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12">
        {!activeLesson ? (
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="bg-blue-500 w-2 h-8 rounded-full"></span>
                21天学习路线图
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {lessons.map(lesson => (
                  <LessonCard 
                    key={lesson.id} 
                    lesson={lesson} 
                    onClick={handleLessonClick} 
                  />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="animate-fade-in">
            <button 
              onClick={() => setActiveLesson(null)}
              className="mb-6 flex items-center text-gray-500 hover:text-orange-500 transition-colors font-medium"
            >
              ← 返回课程列表
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 sticky top-40">
                  <h2 className="text-2xl font-bold text-gray-800 serif mb-4">今日课题</h2>
                  <div className="text-4xl font-black text-orange-500 mb-2">DAY {activeLesson.day}</div>
                  <h3 className="text-xl font-bold text-gray-700 mb-4">{activeLesson.title}</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                      <p className="text-sm font-bold text-blue-800 mb-1">学习重点：</p>
                      <p className="text-sm text-blue-700">{activeLesson.description}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
                      <p className="text-sm font-bold text-yellow-800 mb-1">奶奶比喻：</p>
                      <p className="text-sm text-yellow-700">{activeLesson.metaphor}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <ChatInterface 
                  lesson={activeLesson} 
                  onComplete={handleLessonComplete} 
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Navigation (Mobile Sticky) */}
      {!activeLesson && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 md:hidden">
          <div className="flex justify-around items-center">
            <button className="flex flex-col items-center gap-1 text-orange-500">
              <span className="text-xl">📚</span>
              <span className="text-xs font-bold">学习</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400">
              <span className="text-xl">🏆</span>
              <span className="text-xs font-bold">成就</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400">
              <span className="text-xl">👤</span>
              <span className="text-xs font-bold">我的</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
