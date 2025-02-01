function download() {
  var target = document.getElementById("target");
  var options = {
    type: "png",
    quality: 1
  };
  html2canvas(target, options).then(function (canvas) {
    var dataURL = canvas.toDataURL();
    var link = document.createElement("a");

    link.href = dataURL;
    link.download = "download_" + yyyyMMddHHmmss() + ".png";
    link.click();
  });
}

function makeRandom() {
  let headerText = "ポップンお題ビンゴ";
  let makeButton = document.getElementById('makeButton');
  makeButton.disabled = true;

  //選択されているレベルの判定
  let selectList = setCheckedLevel();

  //ファイル名取得
  let filePath = [];
  for (var selectIdx = 0; selectIdx < selectList.length; selectIdx++) {
    filePath.push(setFilePath(selectList[selectIdx]));
  }

  //曲名リスト取得
  let songArray = [];

  for (var selectIdx = 0; selectIdx < filePath.length; selectIdx++) {
    try {
      var xhr = new XMLHttpRequest();

      // 同期処理で外部ファイルを処理する
      xhr.open("GET", filePath[selectIdx], false);

      // リクエストを送る
      xhr.send(null);

      // 同期処理なのでresponseをこのタイミングで受け取れる
      var arr = xhr.responseText.split(/\r\n|\n|\r/);
      songArray = songArray.concat(arr);
    }
    // Ajax通信でエラーが起きた場合
    catch (e) {
    }

  }
  //曲名(配列1番目）ORジャンル名（配列0番目）
  let radio1Box = document.getElementById('radio1');
  let nameIndex = 1;
  if (!radio1Box.checked) {
    nameIndex = 0;
  }

  //曲決定
  var workArray = [];
  for (var i = 0, len = songArray.length; i < 9; i++, len--) {
    rand = Math.floor(Math.random() * len); // 0～len-1の範囲の整数からランダムに値を取得
    namesArrey = songArray.splice(rand, 1)[0].split('\t'); //TSVを分割

    //曲名[レベル.難易度]表示を作成
    dispString = namesArrey[nameIndex] + "\n" + "[" + namesArrey[2] + "," + namesArrey[3] + "]"
    workArray.push(dispString);  //表示用配列に格納
  }

  //ヘッダ決定
  let header = document.getElementById('tableHeader');
  header.innerHTML = headerText;

  //テーブルに曲名設定
  let table = document.getElementById('target');
  let cells = table.querySelectorAll('td');
  let index = 0;
  cells.forEach((cell) => {
    let songName = workArray[index];
    let songLength = countGrapheme(songName)

    cell.style.fontSize = setFontSize(songName, songLength);
    cell.style.height = "120px";
    cell.innerText = workArray[index];
    index++;
  });

  //作成ボタンを元に戻す
  makeButton.disabled = false;
};

//曲ファイル決定処理
function setFilePath(option) {
  switch (option) {
    case "42":
      return 'https://popsmileax.github.io/Test/Data/42Music.txt';
    case "43":
      return 'https://popsmileax.github.io/Test/Data/43Music.txt';
    case "44":
      return 'https://popsmileax.github.io/Test/Data/44Music.txt';
    case "45":
      return 'https://popsmileax.github.io/Test/Data/45Music.txt';
    case "46":
      return 'https://popsmileax.github.io/Test/Data/46Music.txt';
    case "47":
      return 'https://popsmileax.github.io/Test/Data/47Music.txt';
    case "48":
      return 'https://popsmileax.github.io/Test/Data/48Music.txt';
    case "49":
      return 'https://popsmileax.github.io/Test/Data/49Music.txt';
    case "50":
      return 'https://popsmileax.github.io/Test/Data/50Music.txt';
    default:
      return 'https://popsmileax.github.io/Test/Data/50Music.txt';
  }
}

//曲レベル確認
function setCheckedLevel() {
  let retItems = [];
  var CHKLIST = ['chk42', 'chk43', 'chk44','chk45', 'chk46', 'chk47', 'chk48', 'chk49', 'chk50'];

  //チェックボックス確認
  for (var chkIndex = 0; chkIndex < CHKLIST.length; chkIndex++) {
    let chkBoxItem = document.getElementById(CHKLIST[chkIndex]);
    if (chkBoxItem.checked) {
      retItems.push(chkBoxItem.value);
    }
  }

  //何も選択していない場合
  if (retItems.length == 0) {
    //強制的に50をやらせます
    retItems.push("50");
  }

  return retItems;
}



//フォントサイズ決定処理
function setFontSize(songName, songLength) {
  //らぶしゅがリミ対応
  if (songName.includes('かめりあ')) {
    return "60%";
  }
   else if (songLength > 54) {
    return "60%";
  }
  else if (songLength > 42) {
    return "70%";
  }
  else if (songLength > 35) {
    return "80%";
  }
  else if (songLength > 30) {
    return "90%";
  } 
  else {
    return "100%";
  }
}


//文字数カウント
function countGrapheme(string) {
  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  return [...segmenter.segment(string)].length;
}




function yyyyMMddHHmmss() {

  // クラスのインスタンス化
  const currentDate = new Date();
  // 年
  const year = currentDate.getFullYear();
  // 月
  const month = currentDate.getMonth() + 1;
  // 日
  const day = currentDate.getDate();
  // 時間
  const hour = currentDate.getHours();
  // 分
  const min = currentDate.getMinutes();
  // 秒
  const sec = currentDate.getSeconds();
  
  const date =
    year +
    String(month).padStart(2, "0") +
    String(day).padStart(2, "0") +
    String(hour).padStart(2, "0") +
    String(min).padStart(2, "0") +
    String(sec).padStart(2, "0");
  return date;
};


function makeSlot() {
  let makeButton = document.getElementById('makeButton');
  makeButton.disabled = true;

  //選択されているレベルの判定
  let selectList = setCheckedLevel();

  //ファイル名取得
  let filePath = [];
  for (var selectIdx = 0; selectIdx < selectList.length; selectIdx++) {
    filePath.push(setFilePath(selectList[selectIdx]));
  }

  //曲名リスト取得
  let songArray = [];

  for (var selectIdx = 0; selectIdx < filePath.length; selectIdx++) {
    try {
      var xhr = new XMLHttpRequest();

      // 同期処理で外部ファイルを処理する
      xhr.open("GET", filePath[selectIdx], false);

      // リクエストを送る
      xhr.send(null);

      // 同期処理なのでresponseをこのタイミングで受け取れる
      var arr = xhr.responseText.split(/\r\n|\n|\r/);
      songArray = songArray.concat(arr);
    }
    // Ajax通信でエラーが起きた場合
    catch (e) {
    }

  }
  //曲名(配列1番目）ORジャンル名（配列0番目）
  let radio1Box = document.getElementById('radio1');
  let nameIndex = 1;
  if (!radio1Box.checked) {
    nameIndex = 0;
  }

  //曲決定
  var workArray = [];
  for (var i = 0, len = songArray.length; i < 3; i++, len--) {
    rand = Math.floor(Math.random() * len); // 0～len-1の範囲の整数からランダムに値を取得
    namesArrey = songArray.splice(rand, 1)[0].split('\t'); //TSVを分割

    //曲名[レベル.難易度]表示を作成
    dispString = namesArrey[nameIndex] + "\n" + "[" + namesArrey[2] + "," + namesArrey[3] + "]"
    workArray.push(dispString);  //表示用配列に格納
  }

  //テーブルに曲名設定
  let table = document.getElementById('target');
  let cells = table.querySelectorAll('td');
  let index = 0;
  cells.forEach((cell) => {
    let songName = workArray[index];
    let songLength = countGrapheme(songName)

    cell.style.fontSize = setFontSizeSlot(songName, songLength);
    cell.style.height = "80px";
    cell.innerText = workArray[index];
    index++;
  });

  //作成ボタンを元に戻す
  makeButton.disabled = false;
};

//フォントサイズ決定処理
function setFontSizeSlot(songName, songLength) {
  //らぶしゅがリミ対応
  if (songName.includes('かめりあ')) {
    return "70%";
  }
   else if (songLength > 54) {
    return "70%";
  }
  else if (songLength > 43) {
    return "80%";
  }
  else if (songLength > 35) {
    return "90%";
  }
  else {
    return "100%";
  }
}
