import { ShortNamePipe } from './shortName.pipe';

describe('ShortNamePipe', () => {
  let pipe: ShortNamePipe;

  beforeEach(() => {
    pipe = new ShortNamePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return initials for valid firstname and lastname', () => {
    const result = pipe.transform({ firstname: 'Anna', lastname: 'Kovács' });
    expect(result).toBe('AK');
  });

  it('should return only first initial if lastname is missing', () => {
    const result = pipe.transform({ firstname: 'Béla', lastname: '' });
    expect(result).toBe('B');
  });

  it('should return only last initial if firstname is missing', () => {
    const result = pipe.transform({ firstname: '', lastname: 'Szabó' });
    expect(result).toBe('S');
  });

  it('should return empty string if both firstname and lastname are missing', () => {
    const result = pipe.transform({ firstname: '', lastname: '' });
    expect(result).toBe('');
  });

  it('should return empty string if input is null', () => {
    // @ts-expect-error: testing null input
    const result = pipe.transform(null);
    expect(result).toBe('');
  });

  it('should return empty string if input is undefined', () => {
    // @ts-expect-error: testing undefined input
    const result = pipe.transform(undefined);
    expect(result).toBe('');
  });
});
