describe('Initialization', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should trigger init event', function (done) {
    var image = getImageElement();

    image.addEventListener('taggd.init', function (e) {
      expect(e.detail.taggd).toEqual(jasmine.any(Object));
      done();
    });

    new Taggd(image);
  });

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

  it('should trigger change events', function (done) {
    var image = getImageElement();
    var taggd = new Taggd(image);

    image.addEventListener('taggd.tag.add', function (e) {
      expect(e.detail.taggd).toEqual(taggd);
      expect(e.detail.taggd.getTags().length).toEqual(0);
    });

    image.addEventListener('taggd.tag.added', function (e) {
      expect(e.detail.taggd).toEqual(taggd);
      expect(e.detail.taggd.getTags().length).toEqual(1);
    });

    image.addEventListener('taggd.tag.delete', function (e) {
      expect(e.detail.taggd).toEqual(taggd);
      expect(e.detail.taggd.getTags().length).toEqual(1);
    });

    image.addEventListener('taggd.tag.deleted', function (e) {
      expect(e.detail.taggd).toEqual(taggd);
      expect(e.detail.taggd.getTags().length).toEqual(0);
      done();
    });

    taggd.addTag(new Taggd.Tag({
      x: .5,
      y: .5,
    }, 'Hello World'));

    taggd.deleteTag(0);
  });
});
