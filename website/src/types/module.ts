export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  icon: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  moduleId: string;
  title: string;
  order: number;
  lessonContent: string;
  summaryContent: string;
  duration: number;
  imageUrl?: string;
  isActive?: boolean;
  isCompleted?: boolean;
}

export interface Lesson {
  id: string;
  chapterId: string;
  content: string;
  images: string[];
  lastUpdated: Date;
  readTime: number;
}

export interface Summary {
  id: string;
  chapterId: string;
  content: string;
  keyPoints: string[];
  estimatedReadTime: number;
}