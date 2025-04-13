import { SalesStatusPipe } from '../../shared/pipes/sale-status.pipe';

describe('SalesStatusPipe', () => {
  let pipe: SalesStatusPipe;

  beforeEach(() => {
    pipe = new SalesStatusPipe();
  });

  it('should return "Felkapott" when salesCount is 200 or more', () => {
    expect(pipe.transform(200)).toBe('Felkapott');
    expect(pipe.transform(300)).toBe('Felkapott');
  });

  it('should return "Népszerű" when salesCount is between 50 and 199', () => {
    expect(pipe.transform(50)).toBe('Népszerű');
    expect(pipe.transform(150)).toBe('Népszerű');
  });

  it('should return "Keveset vásárolták" when salesCount is less than 50', () => {
    expect(pipe.transform(0)).toBe('Keveset vásárolták');
    expect(pipe.transform(49)).toBe('Keveset vásárolták');
  });
});