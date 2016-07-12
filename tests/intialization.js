describe('Initialization', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should trigger init event', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);

    expect(taggd).toEqual(jasmine.any(Object));
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
    expect(taggd.wrapper.children.length).toEqual(3);
  });

  it('should trigger change events', function (done) {
    var image = getImageElement();
    var taggd = new Taggd(image);

    taggd.on('taggd.tag.add', function (instance) {
      expect(instance).toEqual(taggd);
      expect(instance.getTags().length).toEqual(0);
    });

    taggd.on('taggd.tag.added', function (instance) {
      expect(instance).toEqual(taggd);
      expect(instance.getTags().length).toEqual(1);
    });

    taggd.on('taggd.tag.delete', function (instance) {
      expect(instance).toEqual(taggd);
      expect(instance.getTags().length).toEqual(1);
    });

    taggd.on('taggd.tag.deleted', function (instance) {
      expect(instance).toEqual(taggd);
      expect(instance.getTags().length).toEqual(0);
      done();
    });

    taggd.addTag(new Taggd.Tag({
      x: .5,
      y: .5,
    }, 'Hello World'));

    taggd.deleteTag(0);
  });

  it('should cancel events', function (done) {
    var image = getImageElement();
    var taggd = new Taggd(image);

    taggd.on('taggd.tag.add', function (instance) {
      expect(instance).toEqual(taggd);
      expect(instance.getTags().length).toEqual(0);

      setTimeout(function () {
        done();
      }, 1000);

      return false;
    });

    taggd.on('taggd.tag.added', function () {
      done.fail('taggd.tag.added was called, even though taggd.tag.add was cancelled');
    });

    taggd.addTag(new Taggd.Tag({
      x: .5,
      y: .5,
    }, 'Hello World'));
  });
});
