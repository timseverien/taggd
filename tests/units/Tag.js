describe('Tag', function () {
  it('should throw for invalid position', function () {
    var text = '';

    expect(function () {
      new Taggd.Tag([], text);
    }).toThrow();

    expect(function () {
      new Taggd.Tag({}, text);
    }).toThrow();

    expect(function () {
      new Taggd.Tag({ x: 0, y: 0 }, text);
    }).not.toThrow();
  });

  it('should throw for invalid text', function () {
    var position = { x: 0, y: 0 };

    expect(function () {
      new Taggd.Tag(position, 2);
    }).toThrow();

    expect(function () {
      new Taggd.Tag(position, 'foo');
    }).not.toThrow();

    expect(function () {
      new Taggd.Tag(position, function () {
        return 'foo';
      });
    }).not.toThrow();
  });

  it('should throw for invalid button attributes', function () {
    var position = { x: 0, y: 0 };
    var text = 'foo';

    expect(function () {
      new Taggd.Tag(position, text, []);
    }).toThrow();

    expect(function () {
      new Taggd.Tag(position, text, {});
    }).not.toThrow();
  });

  it('should throw for invalid popup attributes', function () {
    var position = { x: 0, y: 0 };
    var text = 'foo';

    expect(function () {
      new Taggd.Tag(position, text, {}, []);
    }).toThrow();

    expect(function () {
      new Taggd.Tag(position, text, {}, {});
    }).not.toThrow();
  });
});

describe('Tag.show', function () {
  it('should return tag instance', function () {
    var tag = createTag();
    expect(tag.show()).toEqual(tag);
  });
});

describe('Tag.hide', function () {
  it('should return tag instance', function () {
    var tag = createTag();
    expect(tag.hide()).toEqual(tag);
  });
});

describe('Tag.setText', function () {
  it('should throw for invalid text', function () {
    var tag = createTag();

    expect(function () {
      tag.setText(2);
    }).toThrow();

    expect(function () {
      tag.setText('foo');
    }).not.toThrow();

    expect(function () {
      tag.setText(function () {
        return 'foo';
      });
    }).not.toThrow();
  });

  it('should return tag instance', function () {
    var tag = createTag();
    expect(tag.setText('foo')).toEqual(tag);
  });
});

describe('Tag.setPosition', function () {
  it('should throw for invalid text', function () {
    var tag = createTag();

    expect(function () {
      tag.setPosition([], 2);
    }).toThrow();

    expect(function () {
      tag.setPosition(1, []);
    }).toThrow();

    expect(function () {
      tag.setPosition('1', 2);
    }).not.toThrow();

    expect(function () {
      tag.setPosition(1, '2');
    }).not.toThrow();

    expect(function () {
      tag.setPosition(1, 2);
    }).not.toThrow();
  });

  it('should return tag instance', function () {
    var tag = createTag();
    expect(tag.setPosition(1, 2)).toEqual(tag);
  });
});

describe('Tag.setButtonAttributes', function () {
  it('should throw for invalid attributes', function () {
    var tag = createTag();

    expect(function () {
      tag.setButtonAttributes([]);
    }).toThrow();

    expect(function () {
      tag.setButtonAttributes({});
    }).not.toThrow();
  });

  it('should return tag instance', function () {
    var tag = createTag();
    expect(tag.setButtonAttributes({})).toEqual(tag);
  });
});

describe('Tag.setPopupAttributes', function () {
  it('should throw for invalid attributes', function () {
    var tag = createTag();

    expect(function () {
      tag.setPopupAttributes([]);
    }).toThrow();

    expect(function () {
      tag.setPopupAttributes({});
    }).not.toThrow();
  });

  it('should return tag instance', function () {
    var tag = createTag();
    expect(tag.setPopupAttributes({})).toEqual(tag);
  });
});

describe('Tag.enableControls', function () {
  it('should return tag instance', function () {
    var tag = createTag();
    expect(tag.enableControls()).toEqual(tag);
  });
});

describe('Tag.disableControls', function () {
  it('should return tag instance', function () {
    var tag = createTag();
    expect(tag.disableControls()).toEqual(tag);
  });
});

describe('Tag.setElementAttributes', function () {
  it('should throw for invalid attributes', function () {
    var element = document.createElement('div');

    expect(function () {
      Taggd.Tag.setElementAttributes(element, []);
    }).toThrow();

    expect(function () {
      Taggd.Tag.setElementAttributes(element, {});
    }).not.toThrow();
  });

  it('should return element', function () {
    var element = document.createElement('div');
    expect(Taggd.Tag.setElementAttributes(element, {})).toEqual(element);
  });

  it('should set attributes', function () {
    var element = document.createElement('div');

    expect(element.getAttribute('foo')).toBeNull();

    Taggd.Tag.setElementAttributes(element, {
      foo: 'bar',
    });
    expect(element.getAttribute('foo')).toEqual('bar');
  });

  it('should merge class attribute', function () {
    var element = document.createElement('div');

    Taggd.Tag.setElementAttributes(element, {
      class: 'foo',
    });
    expect(element.classList).toContain('foo');

    Taggd.Tag.setElementAttributes(element, {
      class: 'bar',
    });
    expect(element.classList).toContain('foo');
    expect(element.classList).toContain('bar');
  });
});

describe('Tag.getPositionStyle', function () {
  it('should throw for invalid position', function () {
    expect(function () {
      Taggd.Tag.getPositionStyle('foo', 'bar');
    }).toThrow();

    expect(function () {
      Taggd.Tag.getPositionStyle('1', '2');
    }).not.toThrow();

    expect(function () {
      Taggd.Tag.getPositionStyle(1, 2);
    }).not.toThrow();
  });

  it('should return valid style', function () {
    var style = Taggd.Tag.getPositionStyle(.25, .75);

    expect(style).toEqual({
      left: '25%',
      top: '75%',
    });
  });
});

describe('Tag.createFromObject', function () {
  it('should throw for invalid object', function () {
    var text = 'foo';
    var position = {
      x: .25,
      y: .75,
    };

    expect(function () {
      Taggd.Tag.createFromObject({});
    }).toThrow();

    expect(function () {
      Taggd.Tag.getPositionStyle({
        position: position,
      });
    }).toThrow();

    expect(function () {
      Taggd.Tag.createFromObject({
        position: position,
        text: text,
      });
    }).not.toThrow();

    expect(function () {
      Taggd.Tag.createFromObject({
        position: position,
        text: text,
        buttonAttributes: { 'foo': 'bar' },
        popupAttributes: { 'foo': 'bar' },
      });
    }).not.toThrow();
  });

  it('should initialize tag with properties', function () {
    var text = 'foo';
    var position = {
      x: .25,
      y: .75,
    };
    var positionStyle = Taggd.Tag.getPositionStyle(position.x, position.y);
    var buttonAttributes = { foo: 'bar' };
    var popupAttributes = { bar: 'foo' };
    var tag = Taggd.Tag.createFromObject({
      position: position,
      text: text,
      buttonAttributes: buttonAttributes,
      popupAttributes: popupAttributes,
    });

    expect(tag.wrapperElement.style.left).toEqual(positionStyle.left);
    expect(tag.wrapperElement.style.top).toEqual(positionStyle.top);
    expect(tag.text).toEqual(text);
    expect(tag.buttonElement.getAttribute('foo')).toEqual(buttonAttributes.foo);
    expect(tag.popupElement.getAttribute('bar')).toEqual(popupAttributes.bar);
  });
});

describe('Taggd.toJSON', function () {
  it('should output an object identical to what entered Tag.createFromObject', function () {
    var text = 'foo';
    var position = {
      x: .25,
      y: .75,
    };
    var positionStyle = Taggd.Tag.getPositionStyle(position.x, position.y);
    var buttonAttributes = { foo: 'bar' };
    var popupAttributes = { bar: 'foo' };
    var tagObject = {
      position: position,
      text: text,
      buttonAttributes: buttonAttributes,
      popupAttributes: popupAttributes,
    };
    var tag = Taggd.Tag.createFromObject(tagObject);

    expect(tag.toJSON()).toEqual(tagObject);
  });
});
