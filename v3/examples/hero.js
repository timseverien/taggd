var image = document.getElementById('example-hero');

var options = {};
var data = [
  Taggd.Tag.createFromObject({
    position: { x: 0.479, y: 0.36 },
    text: 'Huey'
  }),
  Taggd.Tag.createFromObject({
    position: { x: 0.53, y: 0.365 },
    text: 'Dewey'
  }),
  Taggd.Tag.createFromObject({
    position: { x: 0.566, y: 0.39 },
    text: 'Louie'
  }),
];

var taggd = new Taggd(image, options, data);
