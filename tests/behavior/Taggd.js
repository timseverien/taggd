describe('Taggd', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should initialize', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);

    expect(taggd).toEqual(jasmine.any(Object));
  });
});

describe('Taggd DOM', function () {
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
    expect(taggd.wrapper.children.length).toEqual(2);
  });
});

describe('Taggd events', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

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

    taggd.addTag(createTag());
    taggd.deleteTag(0);
  });

  it('should cancel events', function (done) {
    var image = getImageElement();
    var taggd = new Taggd(image);

    taggd.on('taggd.tag.add', function (instance) {
      expect(instance).toEqual(taggd);
      expect(instance.getTags().length).toEqual(0);
      shortDelay(done);

      return false;
    });

    taggd.on('taggd.tag.added', function () {
      done.fail('taggd.tag.added was called, even though taggd.tag.add was cancelled');
    });

    taggd.addTag(createTag());
  });
});

describe('Taggd UI', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should show image on hover', function (done) {
    var image = getImageElement();
    var tags = [
      new Taggd.Tag({
        x: .5,
        y: .5,
      }, 'Hello World')
    ];

    var taggd = new Taggd(image, {}, tags);

    expect(tags[0].popupElement.style.display).toBe('none');
    triggerEvent(tags[0].buttonElement, 'mouseenter');
    expect(tags[0].popupElement.style.display).not.toBe('none');
    triggerEvent(tags[0].buttonElement, 'mouseleave');

    window.setTimeout(function () {
      expect(tags[0].popupElement.style.display).toBe('none');
      done();
    }, taggd.options.hideDelay * 2);
  });
});
