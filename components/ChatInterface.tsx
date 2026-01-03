
import React, { useState, useRef, useEffect } from 'react';
import { Lesson, ChatMessage } from '../types';
import { getAIGuidance } from '../services/gemini';

interface ChatInterfaceProps {
  lesson: Lesson;
  history: ChatMessage[];
  onUpdateHistory: (messages: ChatMessage[]) => void;
  onComplete: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ lesson, history, onUpdateHistory, onComplete }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial greeting if history is empty
  useEffect(() => {
    if (history.length === 0) {
      onUpdateHistory([
        { role: 'model', text: `太奶奶好！今天咱们学习第${lesson.day}天：${lesson.title}。${lesson.metaphor} 您对这个有什么想问的吗？或者我给您讲讲？` }
      ]);
    }
  }, []);

  // Auto-scroll on message change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, loading]);

  // Effect to handle AI response triggered by user messages in history
  useEffect(() => {
    const lastMessage = history[history.length - 1];
    if (lastMessage && lastMessage.role === 'user' && !loading) {
      const triggerAI = async () => {
        setLoading(true);
        try {
          // Pass the conversation history up to the current user question
          const prevHistory = history.slice(0, -1);
          const responseText = await getAIGuidance(lesson, lastMessage.text, prevHistory);
          
          onUpdateHistory([...history, { role: 'model', text: responseText }]);
        } catch (error) {
          console.error("AI response failed", error);
        } finally {
          setLoading(false);
        }
      };
      triggerAI();
    }
  }, [history]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    onUpdateHistory([...history, { role: 'user', text: userMsg }]);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-3xl shadow-inner border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-orange-50 p-4 border-b border-orange-100 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center text-2xl">
          👵
        </div>
        <div>
          <h4 className="font-bold text-gray-800">您的私人小助手</h4>
          <p className="text-xs text-orange-600">正在陪您学习：{lesson.title}</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#faf9f6]">
        {history.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-lg ${
              m.role === 'user' 
                ? 'bg-orange-500 text-white rounded-br-none' 
                : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 animate-pulse text-gray-400">
              正在思考怎么跟太奶奶解释...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="问问小助手..."
            className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-300 text-lg"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-orange-500 text-white px-6 rounded-2xl font-bold hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            发送
          </button>
        </div>
        <div className="mt-4 flex justify-between items-center">
            <p className="text-xs text-gray-400">小贴士：可以直接说“我不懂，再举个例子”</p>
            <button 
              onClick={onComplete}
              className="text-orange-600 font-bold hover:underline"
            >
              这节课学完了 ➔
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
