//请求服务器中的歌词文件
$(function () {

  let id = parseInt(location.search.match(/\bid=([^&]*)/)[1],10) 
  

  $.ajax({
    url: "https://mexb4utr.api.lncld.net/1.1/classes/Songs",
    type: 'GET',
    dataType: 'json',
    headers: {"X-LC-Id": "mexB4UtrT94NUV77jKbWjXrg-gzGzoHsz","X-LC-Key":"aUf02b02gVG8DiEeqC4YcGEP,master"},
  }).then(function (response) {
    let songs = response.results
    let song = songs.filter(s => s.id === id)[0]
    let {
      mp3,
      wp,
      name,
      singer,
      covoer,
      lyric
    } = song



    initPlayer.call(undefined, mp3, wp, covoer)
    initText(name, lyric)
    //添加音乐标题
  })


  function initText(name, lyric) {
    var h1 = $("<h1></h1>").text(`${name}`);
    $('.song-description').prepend(h1)
    parseLyric.call(undefined, lyric)
  }

  function initPlayer(mp3, wp, covoer, name) {
    //添加音乐图标和背景
    let covoerUrl = covoer
    $('.cover').attr('src', `${covoerUrl}`)
    $('.page').css('background-image', `url(${wp})`);
    let audio = document.createElement('audio')
    audio.src = mp3
    audio.oncanplay = function () {
      audio.play()
      $('.disc-containe').addClass('playing')
    }

    var $bodyButton = $('body')

    //监听用户点击，控制音乐暂停和播放
    var isPlaying = false

    $bodyButton.on('touchstart', function () {
      isPlaying ? play() : pause();
    });

    //暂停音乐播放，并且暂停的旋转
    function pause() {
      audio.pause()
      $('.disc-containe').removeClass('playing')
      isPlaying = true
    }

    //播放音乐，启动转盘
    function play() {
      audio.play()
      $('.disc-containe').addClass('playing')
      isPlaying = false
    }

    setInterval(() => {
      let seconds = audio.currentTime
      let munites = ~~(seconds / 60)
      let left = seconds - munites * 60
      let time = `${pad(munites)}:${pad(left)}`
      let $whichLine
      // console.log(time)
      let $lines = $('.lines > p')
      // console.log($lines)
      for (let i = 0; i < $lines.length; i++) {
        if ($lines.eq(i + 1).length !== 0 && $lines.eq(i).attr('data-tiem') < time && $lines.eq(i + 1).attr('data-tiem') > time) {
          $whichLine = $lines.eq(i)
          break
        }
      }
      if($whichLine){
        let top = $whichLine.offset().top
        let linesTop = $('.lines').offset().top
        let delta = top - linesTop
        $('.lines').css('transform',`translateY(-${delta}px)`)
        $whichLine.addClass('active').prev().removeClass('active')
      }
    }, 300);
  }

  function pad(number) {
    return number >= 10 ? number + ' ' : '0' + number
  }

  function parseLyric(lyric) {
    let array = lyric.split('\n')
    let regex = /^\[(.+)\](.*)/
    array = array.map(function (string) {
      let matches = string.match(regex)
     
      if (matches) {
        return {
          time: matches[1],
          words: matches[2]
        }
      }
    })
    
    let $lyric = $('.lyric')
    array.map(function (object) {
      if (!object) {
        return
      }
      let $p = $('<p/>')

      $p.attr('data-tiem', object.time).text(object.words)
      $p.appendTo($lyric.children('.lines'))

    })
  }
})