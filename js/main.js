'use strict';

{
  /**
   * 画像のパス
   * @type string[]
   */
  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ];

  /**
   * 現在、mainに表示されている画像の番号
   * @type number
   */
  let currentIndex = 0;

  /**
   * main のエレメント
   * @type HTMLElement
   */
  const mainImage = document.getElementById('main');
  // main 領域に現在の画像(= 0番目の画像)をセットする
  mainImage.src = images[currentIndex];

  // サムネイルの生成
  images.forEach((image, index) => {
    // img 要素を生成する
    const img = document.createElement('img');
    img.src = image;

    // li 要素を生成する
    const li = document.createElement('li');
    
    // li 要素に現在表示されていることを示すクラスを指定する
    if(index === currentIndex) {
      li.classList.add('current');
    }
    // li 要素をクリックすると、main 領域に画像を表示する
    li.addEventListener('click', () => {
      mainImage.src = image;
      // li 要素を全て取り出す
      const thumbnails = document.querySelectorAll('.thumbnails > li');
      // 現在のthumbnails要素から、currentクラスを削除する
      thumbnails[currentIndex].classList.remove('current');
      // currentIndex を新たなindexで更新
      currentIndex = index;
      // 現在のthumbnails要素にcurrentクラスを付与する
      thumbnails[currentIndex].classList.add('current');
    });

    // li 要素にimg要素を追加する
    li.appendChild(img);
    // ul 要素にli要素を追加する
    document.querySelector('.thumbnails').appendChild(li);
  });

  /**
   * ナビの次へのエレメント
   * @type HTMLElement
   */
  const next = document.getElementById('next');
  // 次へをクリックした場合の処理
  next.addEventListener('click', () => {
    // 現在のインデックスをインクリメント
    let target = currentIndex + 1;
    // 現在のインデックスが、画像の枚数より増えた場合、0に戻す
    if (target === images.length) {
      target = 0;
    }
    // li要素のtarget番目のクリック関数を呼び出す
    document.querySelectorAll('.thumbnails > li')[target].click();

  });

  /**
   * ナビの前へのエレメント
   * @type HTMLElement
   */
  const prev = document.getElementById('prev');
  // 前へをクリックした場合の処理
  prev.addEventListener('click', () => {
    // 現在のインデックスをデクリメント
    let target = currentIndex - 1;
    // 現在のインデックスが、0以下になった場合、imagesの最後の画像を指定
    if (target < 0) {
      target = images.length - 1;
    }
    // li要素のtarget番目のクリック関数を呼び出す
    document.querySelectorAll('.thumbnails > li')[target].click();

  });

  /**
   * タイムアウトのId
   * @type number
   */
  let timeoutId;

  /**
   * スライドショーの機能。1秒ごとに次の画像を表示する。
   * @return void
   */
  function playSlideshow() {
    timeoutId = setTimeout( () => {
      // 時間が来たら次の画像を表示
      next.click();
      playSlideshow();
    }, 1000 );
  }

  /**
   * スライドショーが実行中であればtrue
   * @type boolean
   */
  let isPlaying = false;

  /**
   * playボタンのエレメント
   * @type HTMLElement
   */
  const play = document.getElementById('play');
  // クリックされた時の処理
  play.addEventListener('click', () => {
    // スライドショー中でない場合
    if (isPlaying === false) {
      playSlideshow();
      // play の部分に pause を表示
      play.textContent = 'Pause';
    } else {
      // スライドショー中の場合
      // タイマーをクリア
      clearTimeout(timeoutId);
      // PauseボタンをPlayに表記を変更
      play.textContent = 'Play';
    }
    // スライドショーのフラグを反転させる
    isPlaying = !isPlaying;
  });
}