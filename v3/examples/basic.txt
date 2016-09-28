var image = document.getElementById('example-basic');

var options = {};
var data = [
  Taggd.Tag.createFromObject({
    position: { x: 0.19, y: 0.4 },
    text: 'This is a tree',
  }),
  Taggd.Tag.createFromObject({
    position: { x: 0.5, y: 0.3 },
    text: 'Pretty sure this is also a tree',
  }),
  Taggd.Tag.createFromObject({
    position: { x: 0.775, y: 0.5 },
    text: 'Can you guess this one?',
  }),
];

var taggd = new Taggd(image, options, data);
