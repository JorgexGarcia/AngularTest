import { EuroPipe } from './euro.pipe';

describe('EuroPipe', () => {
  let pipe: EuroPipe;

  beforeEach(() => {
    pipe = new EuroPipe();
  });

  it('should transform a number to euro format', () => {
    const transformedValue = pipe.transform(1234.56);
    expect(transformedValue).toEqual('1234.56 €');
  });

  it('should transform a negative number to euro format', () => {
    const transformedValue = pipe.transform(-567.89);
    expect(transformedValue).toEqual('-567.89 €');
  });

  it('should transform zero to euro format', () => {
    const transformedValue = pipe.transform(0);
    expect(transformedValue).toEqual('0.00 €');
  });
});
