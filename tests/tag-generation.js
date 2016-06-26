describe('Initialization', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should set correct text for popup element', function () {
    var image = getImageElement();
    var tags = [
      new Taggd.Tag({
        x: Math.random(),
        y: Math.random(),
      }, 'Hello World')
    ];

    var taggd = new Taggd(image, {}, tags);
    expect(tags[0].popupElement.innerHTML).toEqual('Hello World');
  });

  it('should set correct coordinates for popup element', function () {
    var image = getImageElement();
    var tags = [
      new Taggd.Tag({
        x: .25,
        y: .75,
      }, 'Hello World')
    ];

    var taggd = new Taggd(image, {}, tags);
    expect(tags[0].popupElement.style.left).toEqual('25%');
    expect(tags[0].popupElement.style.top).toEqual('75%');
  });
});
