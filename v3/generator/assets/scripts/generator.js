function Generator(inputImageElement, outputImageElement, outputTags) {
  this.inputImageElement = inputImageElement;
  this.outputImageElement = outputImageElement;
  this.outputTags = outputTags;

  var generator = this;

  this.initializeInput(function (imageSource) {
    generator.updateImage(imageSource);
    generator.initializeTaggd();
  });
}

Generator.prototype.initializeInput = function (onChangeHandler) {
  function handleFile(file) {
    var reader = new FileReader;

    reader.addEventListener('load', function (e) {
      onChangeHandler(e.target.result);
    });

    reader.readAsDataURL(file);
  };

  var generator = this;

  this.inputImageElement.addEventListener('change', function () {
    handleFile(generator.inputImageElement.files[0]);
  });

  this.inputImageElement.parentElement.addEventListener('drop', function (e) {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  });
};

Generator.prototype.updateImage = function (imageSource) {
  this.outputImageElement.src = imageSource;
};

Generator.prototype.initializeTaggd = function () {
  this.taggd = new Taggd(this.outputImageElement, {
    show: 'click',
    hide: 'click',
  });

  this.taggd.enableEditorMode();
  this.taggd.on('taggd.tag.added', this.generate.bind(this));
};

Generator.prototype.generate = function () {
  this.outputTags.innerHTML = JSON.stringify(Generator.cleanTags(this.taggd.getTags()), null, '  ');
};

Generator.cleanTags = function(tags) {
  var precision = 5;
  var precisionMultiplier = Math.pow(10, precision);

  return tags.map(function (tag) {
    tag = tag.toJSON();

    return {
      position: {
        x: Math.round(tag.position.x * precisionMultiplier) / precisionMultiplier,
        y: Math.round(tag.position.y * precisionMultiplier) / precisionMultiplier,
      },
      text: tag.text,
    };
  });
};
