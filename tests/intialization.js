describe('Initialization', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should wrap image', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);

    expect(image.parentElement.classList.contains('taggd')).toEqual(true);
  });

  it('should add tag button and info element', function () {
    var image = getImageElement();
    var tags = [
      new Taggd.Tag({
        x: Math.random(),
        y: Math.random(),
      }, 'Hello World')
    ];

    var taggd = new Taggd(image, {}, tags);
    expect(image.parentElement.children.length).toEqual(3);
  });
});
