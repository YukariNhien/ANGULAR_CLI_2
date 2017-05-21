import { YukariWebPage } from './app.po';

describe('yukari-web App', () => {
  let page: YukariWebPage;

  beforeEach(() => {
    page = new YukariWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
