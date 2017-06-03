import { LPAppNg4Page } from './app.po';

describe('lp-app-ng4 App', () => {
  let page: LPAppNg4Page;

  beforeEach(() => {
    page = new LPAppNg4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
