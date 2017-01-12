describe('Tag', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should add elements to the DOM', function () {
    var image = getImageElement();
    var tags = [
      new Taggd.Tag({
        x: Math.random(),
        y: Math.random(),
      }, 'Hello World')
    ];

    var taggd = new Taggd(image, {}, tags);
    expect(tags[0].wrapperElement.parentElement).toEqual(taggd.wrapper);
    expect(tags[0].popupElement.parentElement).toEqual(tags[0].wrapperElement);
    expect(tags[0].buttonElement.parentElement).toEqual(tags[0].wrapperElement);
  });

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
    expect(tags[0].wrapperElement.style.left).toEqual('25%');
    expect(tags[0].wrapperElement.style.top).toEqual('75%');
  });

  it('should add custom attributes', function () {
    var image = getImageElement();
    var tags = [
      new Taggd.Tag(
        {
          x: Math.random(),
          y: Math.random(),
        },
        'Hello World',
        {
          'class': 'foo',
          'data-foo': 'bar',
        },
        { 'data-bar': 'foo' }
      )
    ];

    var taggd = new Taggd(image, {}, tags);
    expect(tags[0].buttonElement.getAttribute('data-foo')).toEqual('bar');
    expect(tags[0].popupElement.getAttribute('data-bar')).toEqual('foo');

    tags[0].setButtonAttributes({ class: 'bar' });
    expect(tags[0].buttonElement.getAttribute('class').split(/\s+/)).toContain('foo');
    expect(tags[0].buttonElement.getAttribute('class').split(/\s+/)).toContain('bar');
  });

  it('should trigger button change events', function (done) {
    var tag = new Taggd.Tag({
      x: Math.random(),
      y: Math.random(),
    }, 'Hello World');

    tag.on('taggd.tag.change', function (instance) {
      expect(instance).toEqual(tag);
    });

    tag.on('taggd.tag.changed', function (instance) {
      expect(instance).toEqual(tag);
      done();
    });

    tag.setButtonAttributes({
      'data-foo': 'bar',
    });
  });

  it('should trigger popup change events', function (done) {
    var tag = new Taggd.Tag({
      x: Math.random(),
      y: Math.random(),
    }, 'Hello World');

    var changeEventsTriggered = 0;
    var expectedChangeEvents = 6;

    tag.on('taggd.tag.change', function (instance) {
      changeEventsTriggered++;
      expect(instance).toEqual(tag);
    });

    tag.on('taggd.tag.changed', function (instance) {
      changeEventsTriggered++;
      expect(instance).toEqual(tag);

      if (changeEventsTriggered === expectedChangeEvents) {
        done();
      }
    });

    tag.setText('Foobar');
    tag.setPosition(0, 0);
    tag.setPopupAttributes({
      'data-foo': 'bar',
    });
  });

  it('should trigger show/hide events', function (done) {
    var tag = new Taggd.Tag({
      x: Math.random(),
      y: Math.random(),
    }, 'Hello World');

    tag.on('taggd.tag.show', function (instance) {
      expect(instance).toEqual(tag);
    });

    tag.on('taggd.tag.shown', function (instance) {
      expect(instance).toEqual(tag);
    });

    tag.on('taggd.tag.hide', function (instance) {
      expect(instance).toEqual(tag);
    });

    tag.on('taggd.tag.hidden', function (instance) {
      expect(instance).toEqual(tag);
      done();
    });

    tag.show();
    tag.hide();
  });
});
