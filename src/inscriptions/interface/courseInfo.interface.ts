export interface CourseInfo {
  enrolledDate?: Date;
  progress: number;
  modules: number;
  completedModules: number;
  isFree?: boolean;
  isCompleted?: boolean;
  isInProgress?: boolean;
  isNotStarted?: boolean;
}
