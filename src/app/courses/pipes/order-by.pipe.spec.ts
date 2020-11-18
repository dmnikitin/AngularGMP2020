import { ICourse } from 'src/app/shared/models/course';
import { OrderByPipe } from './order-by.pipe';
import { mockCourses } from 'src/assets/mock-data';

describe('OrderByPipe', () => {
  const pipe: OrderByPipe = new OrderByPipe();

  it('should sort courses from oldest to newest', () => {
    const coursesSortedAscending: ICourse[] = mockCourses.sort((a,b) =>
      Date.parse(a.creationDate) - Date.parse(b.creationDate));

    expect(pipe.transform(mockCourses, true)).toEqual(coursesSortedAscending);
  });

  it('should sort courses from newest to oldest', () => {
    const coursesSortedDescending: ICourse[] = mockCourses.sort((a,b) =>
      Date.parse(b.creationDate) - Date.parse(a.creationDate));

    expect(pipe.transform(mockCourses, false)).toEqual(coursesSortedDescending);
  });

  it('should return undefined if no courses provided', () => {
    expect(pipe.transform(undefined, true)).toBeUndefined();
  });
});
