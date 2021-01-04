import { Course } from 'src/app/shared/models/course';
import { ILanguage } from 'src/app/shared/models/language';

/* eslint-disable @typescript-eslint/no-inferrable-types */
export enum Colors {
  green = 'rgb(34, 139, 34)',
  blue = 'rgb(0, 0, 255)'
}

export const dayInMs: number = 86400000;
export const requiredDays: number = 14;

export const coursesUrl: string = 'http://localhost:3004/courses';
export const authUrl: string = 'http://localhost:3004/auth';
export const authorsUrl: string = 'http://localhost:3004/authors';

export const defaultCoursesCount: number = 9;

export const dataLanguages: ILanguage[] = [
  { id: 1, name: 'en', path: 'assets/images/usa.png' },
  { id: 2, name: 'ru', path: 'assets/images/ru.png' }
];

export const defaultCourse: Course = {
  id: 0,
  name: '',
  length: 0,
  date: '',
  isTopRated: false,
  description: '',
  authors: {
    id: '0',
    name: ''
  }
};
