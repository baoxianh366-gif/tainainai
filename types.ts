
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
  metaphor: string; // 用生活中的例子解释
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface UserState {
  currentDay: number;
  progress: number;
  completedLessons: number[];
}
