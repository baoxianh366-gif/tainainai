
import React from 'react';
import { Lesson, LessonStatus } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  onClick: (lesson: Lesson) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onClick }) => {
  const getStatusStyles = () => {
    switch (lesson.status) {
      case LessonStatus.COMPLETED:
        return "bg-green-50 border-green-200 opacity-80 grayscale-[0.5]";
      case LessonStatus.CURRENT:
        return "bg-white border-orange-300 shadow-xl ring-2 ring-orange-200 scale-105 z-10";
      case LessonStatus.LOCKED:
        return "bg-gray-100 border-gray-200 opacity-60 pointer-events-none";
      default:
        return "";
    }
  };

  const getCategoryColor = () => {
    switch (lesson.category) {
      case '基础': return 'bg-blue-100 text-blue-700';
      case '逻辑': return 'bg-purple-100 text-purple-700';
      case '实战': return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <div 
      onClick={() => lesson.status !== LessonStatus.LOCKED && onClick(lesson)}
      className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer ${getStatusStyles()}`}
    >
      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shadow-md">
        {lesson.day}
      </div>
      
      <div className="flex justify-between items-start mb-2 pl-4">
        <h3 className="text-xl font-bold text-gray-800 serif">{lesson.title}</h3>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor()}`}>
          {lesson.category}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 pl-4">{lesson.description}</p>
      
      <div className="mt-2 bg-yellow-50 p-3 rounded-xl border border-yellow-100">
        <p className="text-xs text-yellow-800 italic">
          <span className="font-bold">💡 妙喻：</span> {lesson.metaphor}
        </p>
      </div>

      {lesson.status === LessonStatus.COMPLETED && (
        <div className="absolute top-2 right-2">
          <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default LessonCard;
