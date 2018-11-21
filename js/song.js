//请求服务器中的歌词文件
$(function () {



  let id = location.search.match(/\bid=([^&]*)/)[1]

  $.get('./songs.json').then(function (response) {
    let songs = response
    let song = songs.filter(s => s.id === id)[0]

    let {
      url
    } = song


    let audio = document.createElement('audio')
    audio.src = url


    audio.oncanplay = function () {
      audio.play()
      $('.disc-containe').addClass('playing')
    }


    var $bodyButton = $('body')

    //监听用户点击，控制音乐暂停和播放
    var isPlaying = false

    $bodyButton.on('click', function () {
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

  })

  $.get('/lyric.json').then(function (response) {
    let {
      lyric
    } = response
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
  })
})