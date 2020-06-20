const homeSec = document.getElementById('home');
const smNav = document.getElementById('smal__nav');
const smNavMenu = document.getElementById('sm__nav__menu');
const aboutSec = document.getElementById('about');
const homeImg = document.getElementById('home__img');
const playVideo = document.getElementById('play__video');
const scrWraper = document.getElementById('scr__wrapper');
const mapWraper = document.getElementById('map__wrapper');
const openMap = document.getElementById('open__map');
const openMapSm = document.getElementById('open__map-small');
const navBall = document.getElementById('ball');
const audioLang = document.getElementById('audio');
const playerContainer = document.getElementById('player__container');
const navLink = document.querySelectorAll('.nav__link');
const inputLang = document.querySelectorAll('input');
const leftProd = document.getElementById('left_slider');
const rightProd = document.getElementById('right_slider');
const anchors = document.querySelectorAll('a[href^="#"]');
let currentLang = langRU;
let audioURL = './assets/media/ru.mp3';
let videoID = 'owvzQaJN1N8';
let scrolled;
let scrollSec;
let scrollPos;
let posTop;
let speedScroll = 70;


/* -=Smooth Scroll =- */
anchors.forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    scrolled = window.pageYOffset;
    const blockID = item.getAttribute('href').substr(1);
    scrollSec = document.getElementById(blockID);
    scrollPos = scrollSec.getBoundingClientRect().top;
    posTop = Math.round(scrollPos+scrolled);
    scrolled < posTop ? scrollUp() : scrollDown();
  })
})

function scrollUp() {
  if (scrolled < posTop) { 
    scrolled = scrolled + speedScroll;
    window.scrollTo(0, scrolled);
    requestAnimationFrame(scrollUp)
  } else {
      if(scrolled > posTop) {
        window.scrollTo(0, posTop);
      }
    }
}
function scrollDown() {
  if (scrolled > posTop) { 
    scrolled = scrolled - speedScroll;
    window.scrollTo(0, scrolled);
    requestAnimationFrame(scrollDown);
  } else {
      if(scrolled < posTop) {
        window.scrollTo(0,posTop);
      }
    } 
}

/* -=Show Hide Menu =- */
window.addEventListener('scroll', function() {
  let topAbout = aboutSec.getBoundingClientRect().top
  if (topAbout <= 50) {
    smNavMenu.style.transform = 'translateY(0)';
    smNav.style.background = 'rgba(0,0,0,.8)';
  } else {
    smNavMenu.style.transform = 'translateY(-60px)'
    smNav.style.background = 'none';
  }
})


/* -=Parallax =- */
function parallaxHeaderImg(event) {
  homeImg.style.transform = `translate(${event.clientX*5/100}px,calc(${-50}% + ${event.clientY*5/100}px))`;
}

window.addEventListener('scroll', () => {
  let value = window.scrollY;
  homeSec.style.top = value * .5 + 'px';
  homeSec.style.opacity = 1 - (value/(window.innerHeight -150));
})
document.addEventListener('mousemove', parallaxHeaderImg);

/* Create Slider */
function createSlider(base, slider) {
  let SlideHTML = '';
  base.forEach(function(elem) {
    SlideHTML += `<div class="products__group">
                    <div class="products__img">
                      <img class="products__discripts-img" src="${elem.url}" alt="${elem.alt}">
                    </div>
                    <div class="products__text text__white" id="${elem.id}">${elem.name}</div>
                  </div>`
  })
  slider.innerHTML = SlideHTML;
}
createSlider(prodLeft, leftProd)
createSlider(prodRight, rightProd)

/* Change Lang */
inputLang.forEach(function (item) {
  item.addEventListener('click', function () {
    if (item.id === 'ru') {
      currentLang = langRU;
      audioURL = './assets/media/ru.mp3';
      videoID = 'owvzQaJN1N8';
    } else {
      currentLang = langKZ;
      audioURL = 'assets/media/kz.mp3';
      videoID = '2vZYuD71DzU';
    }

    //Video
    playVideo.style.opacity = '1';
    playVideo.style.display = 'block';
    runVideo()

    //Audio
    audioLang.innerHTML = `<audio controls>
        <source src="${audioURL}" type="audio/mpeg">
        </audio>`

    //text
    currentLang.forEach(function (elem) {
      document.getElementById(`${elem.id}`).textContent = elem.text;
    })
  })
})

/* Rounded Menu */
navLink.forEach(function (item, index) {
  let angle;
  item.addEventListener('mouseover', function () {

    switch (index) {
      case 0:
        angle = -60;
        break;
      case 1:
        angle = -25;
        break;
      case 2:
        angle = 25;
        break;
      case 3:
        angle = 60;
        break;
    }
    ball.style.transform = 'translateX(-50%) rotate(' + angle + 'deg)'
  });
  item.addEventListener('mouseout', function () {
    angle = 0;
    ball.style.transform = 'translateX(-50%) rotate(' + angle + 'deg)'
  })
})

/* Slick Slider Pref*/
$('.slider').slick({
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 1000,
  slidesToShow: 1,
  arrows: false,
  //  fade: true,
});

/* Create Video*/
function runVideo() {
  playerContainer.innerHTML = '<div id="player"></div>';

  playVideo.addEventListener('click', function () {
    playVideo.style.opacity = '0';
    setTimeout(function () {
      playVideo.style.display = 'none'
    }, 500);
    createVideo()
  })
}
runVideo()

function createVideo() {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  onYouTubeIframeAPIReady()
}
var player = '';
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoID,
    events: {
      'onReady': onPlayerReady,
    }
  });
}

//Play Video
function onPlayerReady(event) {
  event.target.playVideo();
}

/* Create Map */
var map;
var mapPopUp = '<b>Маревен Фуд Тянь-Шань</b><br>050000,&nbsp;Республика&nbsp;Казахстан, г.&nbsp;Алматы,&nbsp;ул.&nbsp;Кунаева,&nbsp;д.77,<br>Бизнес&nbsp;центр&nbsp;«Parkview&nbsp;Office&nbsp;Tower», 6&nbsp;этаж,&nbsp;офис&nbsp;№13<br>+7&nbsp;(727)&nbsp;321-11-19'

function createMap() {
  DG.then(function () {
    map = DG.map('map', {
      center: [43.25806, 76.94946],
      fullscreenControl: false,
      zoom: 15
    });
    myIcon = DG.icon({
      iconUrl: 'assets/img/mareven_checkin.png',
      iconSize: [35, 35]
    });
    DG.marker([43.25806, 76.94946], {
        icon: myIcon
      }).addTo(map)
      .bindLabel('Маревен Фуд Тянь-Шань', {})
      .bindPopup(mapPopUp)
  });
}

/* Show Map */
function showMap(btn) {
  btn.onclick = function () {
    mapWraper.innerHTML = '<div class="map" id="map"><div class="cls__btn" id="cls__btn"></div></div>';
    createMap();
    mapWraper.style.transform = 'scale(1)';
    mapWraper.style.opacity = '1';
    document.getElementById('cls__btn').onclick = function () {
      mapWraper.style.transform = 'scale(0)';
      mapWraper.style.opacity = '0';
      setTimeout(function () {
        mapWraper.innerHTML = '';
      }, 500)
    }
  }
}
showMap(openMap);
showMap(openMapSm);
