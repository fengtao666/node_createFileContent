const path = require('path');
const fs = require('fs');

// 获取文件名
const getDirNames = path => {
  const files = fs.readdirSync(path);
  return files;
};

const dirName = path.join(__dirname);
console.log('dirName', dirName);

const filesArr = getDirNames(dirName);
console.log('files', filesArr);

let pageUrl = 'pages/aweme/qq/homepage/index';
let acIndex = './src/pages/aweme/qq/homepage/index.js';
let acEndTime = '2020-11-22 15:40:11';
let acRegion = ['CN'];

let acChannel = 'aweme';

let keyUrl = pageUrl;
let info = `{
  index:'${acIndex}',
  endTime: '${acEndTime}',
  region: ${JSON.stringify(acRegion)},
  channel: '${acChannel}',
},`;
// init时向input.js中添加活动信息
let acObj = `
    '${keyUrl}':${info}
`;
// 首次创建input.js时使用
let content = `module.exports = {${acObj}}`;

function updateFile(filePath) {
  // 读取文件内容
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.log('err', err);
      return;
    }
    console.log('源文件内容', data);
    data = data.substring(0, data.lastIndexOf('}')); // 去除尾部}
    let newData = `${data + acObj }}`;
    console.log('新内容+旧内容', newData);
    fs.writeFile(`${dirName}/input.js`, newData, function (err) {
      if (err) {
        return console.log('err', err);
      }
      console.log('内容添加成功');
    });
  });
}

if (filesArr.indexOf('input.js') > -1) {
  updateFile(`${dirName}/input.js`);
} else {
  fs.writeFile(`${dirName}/input.js`, content, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('文件创建成功');
  });
}
