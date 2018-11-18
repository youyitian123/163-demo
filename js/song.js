//请求服务器中的歌词文件
$(function () {
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

  let audio = document.createElement('audio')
  audio.src = 'http://dl.stream.qqmusic.qq.com/C400003w4Tn23jENMJ.m4a?guid=2017907331&vkey=1882C81683EFC9527CD5129A923DE406B3D921DF5B3B398909784F26118B867A677EFA45949032F6AD9A8FAA20FF01D75861925CDEC2B2E3&uin=0&fromtag=38'


  audio.oncanplay = function () {
    audio.play()
    $('.disc-containe').addClass('playing')
  }


  var $bodyButton = $('body')
  var $circleWp = $('.circleWp');
  var $cover = $('.cover')
  var cTransform
  var wpTransform

  //监听用户点击，控制音乐暂停和播放
  var isPlaying = false
  $bodyButton.on('click', function () {
    isPlaying ? play() : pause();
  });

  //暂停音乐播放，并且暂停的旋转
  function pause() {
    audio.pause()

    cTransform = $cover.css("transform")
    wpTransform = $circleWp.css("transform")
    uCircleDefault(cTransform, wpTransform)
    //


    $('.disc-containe').removeClass('playing')
    isPlaying = true
  }

  //设置转盘初始位置，防止转盘 "暂停->播放" 回到原点
  function uCircleDefault(cTransform, wpTransform) {
    if (wpTransform === 'none') {
      $circleWp.css({
        "transform": cTransform
      })
    } else {
      $circleWp.css({
        "transform": cTransform.concat(' ', wpTransform)
      })
    }
  }

  //播放音乐，启动转盘
  function play() {
    audio.play()
    $('.disc-containe').addClass('playing')
    isPlaying = false
  }
})