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
  audio.src = 'http://dl.stream.qqmusic.qq.com/C400003w4Tn23jENMJ.m4a?guid=7446688464&vkey=EE997F09EB602FA6DE01AB9006B9B217C948D114EF29467ED6502176082E3E1B496E93D559A0D3C6E053CF5ADF9F3D4EC2888559BA40F589&uin=0&fromtag=38'
  audio.oncanplay = function () {
    audio.play()
    $('.disc-containe').addClass('playing')

  }

  $('body').on('touchstart', function () {
    if (!audio.paused || audio.currentTim) {
      audio.pause()
      $('.disc-containe').removeClass('playing')

    } else {
      audio.play()
      $('.disc-containe').addClass('playing')
    }
  })

})