
export enum LessonStatus {
  LOCKED = 'LOCKED',
  CURRENT = 'CURRENT',
  COMPLETED = 'COMPLETED'
}

export interface Lesson {
  id: number;
  day: number;
  title: string;
  description: string;
  category: '基础' | '逻辑' | '实战';
  status: LessonStatus;
  metaphor: string;
  // 新增字段
  longContent: string;   // 详细教学文本
  keyPoint: string;     // 核心金句
  hints: string[];      // 启发提问
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface UserState {
  currentDay: number;
  progress: number;
  completedLessons: number[];
  chatHistory: Record<number, ChatMessage[]>;
}
