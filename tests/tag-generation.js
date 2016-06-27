describe('Tag generation', function () {
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
    expect(tags[0].buttonElement.parentElement).toEqual(taggd.wrapper);
    expect(tags[0].popupElement.parentElement).toEqual(taggd.wrapper);
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
    expect(tags[0].popupElement.style.left).toEqual('25%');
    expect(tags[0].popupElement.style.top).toEqual('75%');
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
    expect(tags[0].buttonElement.getAttribute('class')).toEqual('foo bar');
  });
});
