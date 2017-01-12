describe('Editor mode', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should render input and buttons for tags', function () {
    var image = getImageElement();
    var tags = [
      new Taggd.Tag({
        x: .5,
        y: .5,
      }, 'Hello World')
    ];

    var taggd = new Taggd(image, {}, tags);
    taggd.enableEditorMode();

    expect(tags[0].popupElement.children.length).toBe(3);
    expect(tags[0].inputLabelElement.value).toBe(tags[0].text);
  });

  it('should reinstate text after editor mode is disabled', function () {
    var image = getImageElement();
    var tags = [
      new Taggd.Tag({
        x: .5,
        y: .5,
      }, 'Hello World')
    ];

    var taggd = new Taggd(image, {}, tags);
    taggd.enableEditorMode();
    taggd.disableEditorMode();

    expect(tags[0].popupElement.innerHTML).toBe(tags[0].text);
  });

  it('should remove tag after pressing the delete button', function (done) {
    var image = getImageElement();
    var tags = [
      new Taggd.Tag({
        x: .5,
        y: .5,
      }, 'Hello World')
    ];

    var taggd = new Taggd(image, {}, tags);
    taggd.enableEditorMode();

    taggd.on('taggd.tag.deleted', function () {
      expect(tags[0].popupElement.parentElement).not.toBe(taggd.wrapper);
      done();
    });

    expect(tags[0].popupElement.parentElement).toBe(taggd.tags[0].wrapperElement);
    expect(tags[0].buttonElement.parentElement).toBe(taggd.tags[0].wrapperElement);
    expect(tags[0].wrapperElement.parentElement).toBe(taggd.wrapper);
    triggerEvent(tags[0].buttonDeleteElement, 'click');
  });
});
