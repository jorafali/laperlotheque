import { D3HexbinPipe } from './d3-hexbin.pipe';

describe('D3HexbinPipe', () => {
  it('create an instance', () => {
    const pipe = new D3HexbinPipe();
    expect(pipe).toBeTruthy();
  });
});
