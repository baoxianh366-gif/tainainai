
import React, { useState, useEffect } from 'react';
import { CURRICULUM } from './constants';
import { Lesson, LessonStatus, UserState, ChatMessage } from './types';
import LessonCard from './components/LessonCard';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('grandma-quant-state');
    return saved ? JSON.parse(saved) : {
      currentDay: 1,
      progress: 0,
      completedLessons: [],
      chatHistory: {}
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
  const [learningStep, setLearningStep] = useState<number>(0); // 0: Content, 1: KeyPoint & Hints, 2: Chat

  useEffect(() => {
    localStorage.setItem('grandma-quant-state', JSON.stringify(userState));
  }, [userState]);

  const handleLessonClick = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setLearningStep(0);
  };

  const handleUpdateHistory = (lessonId: number, messages: ChatMessage[]) => {
    setUserState(prev => ({
      ...prev,
      chatHistory: {
        ...prev.chatHistory,
        [lessonId]: messages
      }
    }));
  };

  const handleLessonComplete = () => {
    if (!activeLesson) return;
    const nextDay = activeLesson.day + 1;
    const newCompleted = [...new Set([...userState.completedLessons, activeLesson.id])];
    setUserState(prev => ({
      ...prev,
      currentDay: nextDay,
      progress: Math.floor((newCompleted.length / CURRICULUM.length) * 100),
      completedLessons: newCompleted
    }));
    setLessons(prev => prev.map(l => {
      if (l.id === activeLesson.id) return { ...l, status: LessonStatus.COMPLETED };
      if (l.day === nextDay) return { ...l, status: LessonStatus.CURRENT };
      return l;
    }));
    setActiveLesson(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startChatWithHint = (hint: string) => {
    setLearningStep(2);
    const lessonId = activeLesson!.id;
    const existingHistory = userState.chatHistory[lessonId] || [];
    // We add a synthetic user message to trigger AI
    handleUpdateHistory(lessonId, [
      ...existingHistory,
      { role: 'user', text: hint }
    ]);
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white border-b border-orange-100 pt-12 pb-8 px-6 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div onClick={() => setActiveLesson(null)} className="cursor-pointer">
            <h1 className="text-4xl font-bold text-gray-900 serif mb-2">太奶奶的量化学院</h1>
            <p className="text-gray-500 text-lg italic">“活到老，学到老，科技投资我也行。”</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-3xl border border-orange-100 min-w-[200px]">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-orange-800 font-bold">学习进度</span>
              <span className="text-orange-800 font-bold">{userState.progress}%</span>
            </div>
            <div className="w-full bg-orange-200 h-3 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full transition-all duration-1000" style={{ width: `${userState.progress}%` }} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-12">
        {!activeLesson ? (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="bg-orange-500 w-2 h-8 rounded-full"></span>
              21天学习路线
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {lessons.map(lesson => (
                <LessonCard key={lesson.id} lesson={lesson} onClick={handleLessonClick} />
              ))}
            </div>
          </section>
        ) : (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <button onClick={() => setActiveLesson(null)} className="mb-8 text-gray-500 hover:text-orange-600 transition-colors flex items-center gap-2 text-lg">
              <span>←</span> 没学够？回目录看看
            </button>

            {/* Step 1: Long Content Reading */}
            {learningStep === 0 && (
              <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-orange-50 space-y-8">
                <div className="text-orange-500 font-bold text-xl serif">第 {activeLesson.day} 天：{activeLesson.title}</div>
                <div className="prose prose-orange prose-lg max-w-none">
                  {activeLesson.longContent.split('\n').map((para, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed text-xl mb-4">
                      {para.trim()}
                    </p>
                  ))}
                </div>
                <button 
                  onClick={() => setLearningStep(1)}
                  className="w-full py-6 bg-orange-500 text-white rounded-2xl text-2xl font-bold shadow-lg hover:bg-orange-600 transition-transform active:scale-95"
                >
                  我读好了，看总结 ➔
                </button>
              </div>
            )}

            {/* Step 2: Key Point Card & Hints */}
            {learningStep === 1 && (
              <div className="space-y-10 animate-fade-in">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-4 right-6 text-6xl opacity-20">💡</div>
                  <h3 className="text-xl font-bold mb-6 opacity-90">太奶奶记事本</h3>
                  <p className="text-3xl font-bold leading-snug serif mb-4">
                    “{activeLesson.keyPoint}”
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">🧐</span> 想想看，您是不是想问：
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {activeLesson.hints.map((hint, idx) => (
                      <button
                        key={idx}
                        onClick={() => startChatWithHint(hint)}
                        className="p-5 text-left bg-white border-2 border-orange-100 rounded-2xl text-lg text-gray-700 hover:border-orange-500 hover:bg-orange-50 transition-all shadow-sm flex justify-between items-center"
                      >
                        {hint}
                        <span className="text-orange-400">➔</span>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setLearningStep(2)}
                    className="w-full py-5 border-2 border-dashed border-gray-300 text-gray-500 rounded-2xl text-xl font-medium hover:border-orange-300 hover:text-orange-400 transition-all mt-4"
                  >
                    我有自己的问题想问 💬
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Chat Interface */}
            {learningStep === 2 && (
              <div className="animate-fade-in">
                <ChatInterface 
                  lesson={activeLesson} 
                  history={userState.chatHistory[activeLesson.id] || []}
                  onUpdateHistory={(messages) => handleUpdateHistory(activeLesson.id, messages)}
                  onComplete={handleLessonComplete} 
                />
                <button 
                  onClick={() => setLearningStep(1)}
                  className="mt-6 text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 mx-auto"
                >
                  回过头看眼总结
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
