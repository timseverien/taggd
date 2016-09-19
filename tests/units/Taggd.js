describe('Taggd', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should throw for invalid image', function () {
    expect(function () {
      new Taggd({});
    }).toThrow();

    expect(function () {
      var image = getImageElement();
      new Taggd(image);
    }).not.toThrow();
  });

  it('should throw for invalid options', function () {
    var image = getImageElement();

    expect(function () {
      new Taggd(image, []);
    }).toThrow();

    expect(function () {
      new Taggd(image, {});
    }).not.toThrow();
  });

  it('should throw for invalid tags', function () {
    var image = getImageElement();
    var options = {};

    expect(function () {
      new Taggd(image, options, {});
    }).toThrow();

    expect(function () {
      new Taggd(image, options, []);
    }).not.toThrow();
  });

  it('should create wrapper', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);

    expect(taggd.wrapper).toEqual(jasmine.any(Object));
    expect(taggd.wrapper.tagName).toEqual('DIV');
    expect(taggd.wrapper.className).toEqual('taggd');
  });

  it('should set image', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);

    expect(taggd.image).toEqual(image);
  });

  it('should set options', function () {
    var image = getImageElement();
    var options = {
      show: 'foo',
      hide: 'bar',
    };
    var taggd = new Taggd(image, options);

    expect(taggd.options).toEqual(jasmine.objectContaining(options));
  });

  it('should set tags', function () {
    var image = getImageElement();
    var tags = [
      createTag(),
      createTag(),
    ];
    var taggd = new Taggd(image, {}, tags);

    expect(taggd.tags).toEqual(tags);
  });
});

describe('Taggd.setOptions', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should throw for invalid options', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);

    expect(function () {
      taggd.setOptions([]);
    }).toThrow();

    expect(function () {
      taggd.setOptions({});
    }).not.toThrow();
  });

  it('should set options', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);
    var options = {
      show: 'foo',
      hide: 'bar',
    };

    expect(taggd.options).toEqual(Taggd.DEFAULT_OPTIONS);

    taggd.setOptions(options);
    expect(taggd.options).toEqual(jasmine.objectContaining(options));
  });

  it('should return taggd instance', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);

    expect(taggd.setOptions({})).toEqual(taggd);
  });

  it('should overwrite individual options', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);

    expect(taggd.options).toEqual(Taggd.DEFAULT_OPTIONS);

    taggd.setOptions({
      show: 'foo',
    });

    expect(taggd.options.show).toEqual('foo');
    expect(taggd.options.hide).toEqual(Taggd.DEFAULT_OPTIONS.hide);
  });
});

describe('Taggd.addTag', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should throw for invalid tag', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);

    expect(function () {
      taggd.addTag([]);
    }).toThrow();

    expect(function () {
      taggd.addTag({});
    }).toThrow();

    expect(function () {
      taggd.addTag(createTag());
    }).not.toThrow();
  });

  it('should return taggd instance', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);

    expect(taggd.addTag(createTag())).toEqual(taggd);
  });

  it('should add tag', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);
    var tag = createTag();

    expect(taggd.tags.length).toEqual(0);

    taggd.addTag(tag);
    expect(taggd.tags.length).toEqual(1);
    expect(taggd.tags[0]).toEqual(tag);
  });
});

describe('Taggd.getTag', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should throw for invalid index', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);

    expect(function () {
      taggd.getTag('1');
    }).toThrow();

    expect(function () {
      taggd.getTag(0);
    }).not.toThrow();
  });

  it('should return tag', function () {
    var image = getImageElement();
    var tags = [
      createTag(),
      createTag(),
    ];
    var taggd = new Taggd(image, {}, tags);

    expect(taggd.getTag(0)).toEqual(tags[0]);
    expect(taggd.getTag(1)).toEqual(tags[1]);
  });
});

describe('Taggd.getTags', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should return an array of tags', function () {
    var image = getImageElement();
    var tags = [
      createTag(),
      createTag(),
    ];
    var taggd = new Taggd(image, {}, tags);

    expect(taggd.getTags()).toEqual(tags);
  });
});

describe('Taggd.deleteTag', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should throw for invalid index', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);

    expect(function () {
      taggd.deleteTag('1');
    }).toThrow();

    expect(function () {
      taggd.deleteTag(0);
    }).toThrow();

    taggd.addTag(createTag());

    expect(function () {
      taggd.deleteTag(0);
    }).not.toThrow();
  });

  it('should return taggd instance', function () {
    var image = getImageElement();
    var tags = [
      createTag(),
      createTag(),
    ];
    var taggd = new Taggd(image, {}, tags);

    expect(taggd.deleteTag(0)).toEqual(taggd);
  });

  it('delete tag', function () {
    var image = getImageElement();
    var tags = [
      createTag(),
      createTag(),
    ];
    var taggd = new Taggd(image, {}, tags);

    expect(taggd.tags.length).toEqual(2);

    var toBeDeletedTagIndex = 1;
    var toBeDeletedTag = tags[toBeDeletedTagIndex];

    taggd.deleteTag(toBeDeletedTagIndex);
    expect(taggd.tags.length).toEqual(1);
    expect(taggd.tags[0].text).not.toEqual(toBeDeletedTag.text);
  });
});

describe('Taggd.deleteTags', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should return taggd instance', function () {
    var image = getImageElement();
    var tags = [
      createTag(),
      createTag(),
    ];
    var taggd = new Taggd(image, {}, tags);

    expect(taggd.deleteTags()).toEqual(taggd);
  });

  it('should delete all tags', function () {
    var image = getImageElement();
    var tags = [
      createTag(),
      createTag(),
    ];
    var taggd = new Taggd(image, {}, tags);
    taggd.deleteTags();

    expect(taggd.getTags().length).toEqual(0);
  });
});

describe('Taggd.enableEditorMode', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should return taggd instance', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);

    expect(taggd.enableEditorMode()).toEqual(taggd);
  });
});

describe('Taggd.disableEditorMode', function () {
  beforeEach(createImage);
  afterEach(destroyBody);

  it('should return taggd instance', function () {
    var image = getImageElement();
    var taggd = new Taggd(image);

    expect(taggd.disableEditorMode()).toEqual(taggd);
  });
});
