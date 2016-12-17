var express = require('express');
var _ = require('lodash');
var notifier = require('node-notifier');

var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

var bankJsonFilePath = __dirname + '/json/bank.json';
var bankJsonFile = JSON.parse(fs.readFileSync(bankJsonFilePath, 'utf8'));

var settingJsonPath = __dirname + '/json/setting.json';
var settingJson = JSON.parse(fs.readFileSync(settingJsonPath, 'utf8'));

var intervalForNotify = null;

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../'));


app.post('/addNewWord', function (req, res) {
  console.log('req.body', req.body);
  var data = req.body;
  if (data.ru && data.en) {
    bankJsonFile.data[_.size(bankJsonFile.data)] = {id: _.size(bankJsonFile.data), ru: data.ru, en: data.en};
    var json = JSON.stringify(bankJsonFile);
    fs.writeFile(bankJsonFilePath, json, 'utf8', function () {
      res.send({
        "success": true,
        "resultText": "Успешно сохранил!"
      });
    });
  } else {
    res.send({
      "success": false,
      "resultText": "Необходимо заполнить все поля!"
    });
  }
});


app.get('/getAllWords', function (req, res) {
  res.send(bankJsonFile.data);
});

app.get('/getMySettingsNotify', function (req, res) {
  res.send(settingJson);
});


app.post('/updateWord', function (req, res) {
  var word = req.body;
  bankJsonFile.data[word.id].en = word.en;
  bankJsonFile.data[word.id].ru = word.ru;
  var json = JSON.stringify(bankJsonFile);
  fs.writeFile(bankJsonFilePath, json, 'utf8', function () {
    res.send({
      "success": true,
      "resultText": "Успешно изменил!"
    });
  });
});

app.post('/removeWord', function (req, res) {
  var id = req.body.id;
  delete bankJsonFile.data[id];
  var json = JSON.stringify(bankJsonFile);
  fs.writeFile(bankJsonFilePath, json, 'utf8', function () {
    res.send({
      "success": true,
      "resultText": "Успешно удалил!"
    });
  });
});


app.post('/saveSettingForNotify', function (req, res) {
  settingJson.timeout = req.body.time;
  settingJson.title = req.body.title;
  console.log('req.body', req.body);
  var json = JSON.stringify(settingJson);
  fs.writeFile(settingJsonPath, json, 'utf8', function () {
    res.send({
      "success": true,
      "resultText": "Успешно сохранил настройки!"
    });
    updateSettingForNotify();
  });
});

function updateSettingForNotify() {
  setIntervalForNotify();
}

function showMeNotify() {
  var randomDataFromFile = bankJsonFile.data[_.random(0, _.size(bankJsonFile.data) - 1)];
  notifier.notify({
    title: randomDataFromFile.en + ' - ' + randomDataFromFile.ru,
    subtitle: bankJsonFile.name,
    message: ' ',
    timeout: 10
  });
}


function setIntervalForNotify() {
  clearInterval(intervalForNotify);
  intervalForNotify = setInterval(function () {
    showMeNotify();
  }, settingJson.timeout);
}
setIntervalForNotify();


app.listen(3000);