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
    });

    // li 要素にimg要素を追加する
    li.appendChild(img);
    // ul 要素にli要素を追加する
    document.querySelector('.thumbnails').appendChild(li);
  });
}