describe('Interaction', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should show image on hover', function () {
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
    expect(tags[0].popupElement.style.display).toBe('none');
  });
});
