import { FilterPipe } from './filter.pipe';
import { mockCourses } from 'src/assets/mock-data';
import { ICourse } from './../models/course';

describe('FilterPipe', () => {
  const pipe: FilterPipe = new FilterPipe();
  let filteringValue: string;

  it('should sort courses from oldest to newest', () => {
    filteringValue = 'VIDEO COURSE';
    const filtered: ICourse[] = mockCourses.filter((item) =>
      item.title.includes(filteringValue.toLowerCase()));

    expect(pipe.transform(mockCourses, filteringValue)).toEqual(filtered);
  });

  it('should sort courses from newest to oldest', () => {
    filteringValue = '2';

    expect(pipe.transform(mockCourses, '2')).toEqual([mockCourses[1]]);
  });

  it('should return unfiltered courses if no filtering value provided', () => {
    expect(pipe.transform(mockCourses, '')).toEqual(mockCourses);
  });
});
