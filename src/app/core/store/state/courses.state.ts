import { Course } from 'src/app/shared/models/course';

export interface CoursesState {
  courses: Course[];
  selectedCourse: Course;
}

export const initialCoursesState: CoursesState = {
  courses: [],
  selectedCourse: null
};
