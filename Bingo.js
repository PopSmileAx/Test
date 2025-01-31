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

  const selectList = document.getElementById('levelSelect');
  const option = selectList.value;

  // (1) XMLHttpRequestオブジェクトを作成
  const xhr = new XMLHttpRequest();
  let headerText = "";

  // (2) 取得するファイルの設定
  switch (option) {
    case "45":
      xhr.open('get', 'https://popsmileax.github.io/PopnRandBingo/Data/45Music.txt');
      headerText = "ポップンランダムお題ビンゴ（45）";
      break;
    case "46":
      xhr.open('get', 'https://popsmileax.github.io/PopnRandBingo/Data/46Music.txt');
      headerText = "ポップンランダムお題ビンゴ（46）";
      break;
    case "47":
      xhr.open('get', 'https://popsmileax.github.io/PopnRandBingo/Data/47Music.txt');
      headerText = "ポップンランダムお題ビンゴ（47）";
      break;
    case "48":
      xhr.open('get', 'https://popsmileax.github.io/PopnRandBingo/Data/48Music.txt');
      headerText = "ポップンランダムお題ビンゴ（48）";
      break;
    case "49":
      xhr.open('get', 'https://popsmileax.github.io/PopnRandBingo/Data/49Music.txt');
      headerText = "ポップンランダムお題ビンゴ（49）";
      break;
    case "50":
      xhr.open('get', 'https://popsmileax.github.io/PopnRandBingo/Data/50Music.txt');
      headerText = "ポップンランダムお題ビンゴ（50）";
      break;
    default:
      xhr.open('get', 'https://popsmileax.github.io/PopnRandBingo/Data/50Music.txt');
      headerText = "ポップンランダムお題ビンゴ（50）";
      break;
  }

  // (3) リクエスト（要求）を送信
  xhr.send();

  xhr.onreadystatechange = function () {

    // (4) 通信が正常に完了したか確認
    if (xhr.readyState === 4 && xhr.status === 200) {

      // (5) 取得したレスポンスをページに表示
      const file_area = document.getElementById('file_area');

      //改行ごとに配列化
      var arr = this.responseText.split('\n');
      var workArray = [];

      for (var i = 0, len = arr.length; i < 9; i++, len--) {
        rand = Math.floor(Math.random() * len); // 0～len-1の範囲の整数からランダムに値を取得
        workArray.push(arr.splice(rand, 1)[0]); // 配列のランダム値に対応するインデックスを得たうえで元々の配列から取り除く
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

        cell.innerText = workArray[index];
        index++;
      });
    }
  }
};

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

function yyyyMMddHHmmss() {
  const date =
    year +
    String(month).padStart(2, "0") +
    String(day).padStart(2, "0") +
    String(hour).padStart(2, "0") +
    String(min).padStart(2, "0") +
    String(sec).padStart(2, "0");
  return date;
};