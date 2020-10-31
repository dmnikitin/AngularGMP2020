import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const pipe: DurationPipe = new DurationPipe();

  it('transforms "90" to "1h 30min"', () => {
    expect(pipe.transform(90)).toBe('1h 30min');
  });

  it('transforms "45" to "45min"', () => {
    expect(pipe.transform(45)).toBe('45min');
  });

  it('transforms "60" to "1h"', () => {
    expect(pipe.transform(60)).toBe('1h ');
  });
});
