import { AlexandriaPage } from './app.po';

describe('alexandria App', function() {
  let page: AlexandriaPage;

  beforeEach(() => {
    page = new AlexandriaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
