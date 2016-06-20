describe('Initialization', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should wrap image', function() {
    var image = getImageElement();
    var taggd = new Taggd(image);

    expect(image.parentElement.classList.contains('taggd')).toEqual(true);
  });
});
