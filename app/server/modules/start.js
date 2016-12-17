var notifier = require('node-notifier');
var _ = require('lodash');
var fs = require('fs');

var pathForFile = 'bank.json';
var file = JSON.parse(fs.readFileSync(pathForFile, 'utf8'));


// console.log('file', _.size(file.data));

function showMeNotify() {
  var randomDataFromFile = file.data[_.random(0, _.size(file.data) - 1)];
  notifier.notify({
    title: randomDataFromFile.en + ' - ' + randomDataFromFile.ru,
    subtitle: file.name,
    message: ' ',
    timeout: 10
  });

}
showMeNotify();
