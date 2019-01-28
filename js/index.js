//动态生成推荐音乐
$(function () {
  const myUrl = "https://mexb4utr.api.lncld.net/1.1/classes/Songs"
  const myXLCId = "mexB4UtrT94NUV77jKbWjXrg-gzGzoHsz"
  const myXLCKey = "aUf02b02gVG8DiEeqC4YcGEP,master"


  //分页切换
  $('.siteNav').on('click', 'ol.tabItems>li', function (e) {
    let $li = $(e.currentTarget).addClass('active')
    $li.siblings().removeClass('active')

    let index = $li.index()
    $li.trigger('tabChange', index)

    $('.tabContent > li').eq(index).addClass('active').siblings().removeClass('active')
  })

  $('.siteNav').on('tabChange', function (e, index) {

    let $li = $('.tabContent>li').eq(index)

    if ($li.attr('data-downloader') === 'yes') {
      return
    }
    if (index === 1) {
      $.get('./page2.json').then((response) => {
        let items = response
        items.forEach((i, index) => {
          let $li = $(`
          <li>
            <a href="./song.html?id=${i.id}">
              <div class="num">${i.id}</div>
              <div class="sgfr f-bd">
                <h3>${i.name}</h3>
                <p><span>${i.singer}</span> - <span>${i.album}</span></p>
              </div>
            </a>
          </li>`)
          $('#hotList').append($li)
          if (index < 3) {
            $('.num').addClass('sgfl-cred')
          }
        })
        $li.attr('data-downloader', 'yes')
      })
    } else if (index === 2) {
      $li.attr('data-downloader', 'yes')
    }
  })

  page2hotList()
  page3SearchSong()



    /**
   * Page2 Ajax请求leanClound Api 生产热歌榜
   */
  function page2hotList() {
    let getheader = {
      "X-LC-Id": myXLCId,
      "X-LC-Key": myXLCKey
    }
    let getValue = null

    getLcJson(getheader, getValue).then(function (response) {
      let items = response.results
      items.forEach((i) => {
        let $li = $(`
     <li>
      <a href="./song.html?id=${i.id}">
      <h3>${i.name}</h3>
      <p>
        <svg class="sq" aria-hidden="true">
        <use xlink:href="#icon-wusunyinzhi"></use>
        </svg>
        ${i.singer} - ${i.album}
      </p>
      <svg class="play" aria-hidden="true">
      <use xlink:href="#icon-play"></use>
      </svg>
        </a>
      </li>
     `)
        $('#latelyMusic').append($li)
      })
      $('#latelyMusicLoading').remove()
    })
  }

    /**
   * Page3 Ajax请求leanClound Api 搜索歌曲
   */

  function page3SearchSong() {
    let timer = null
    $('input#searchSong').on('input', function (e) {
      let $input = $(e.currentTarget)
      let value = $input.val().trim()
      console.log(value)
      if (value === '') {
        $('#searchList').empty()
        return
      }
      if (timer) {
        window.clearTimeout(timer)
      }

      let getheader = {
        "X-LC-Id": myXLCId,
        "X-LC-Key": myXLCKey,
        "Content-Type": "UTF-8",
        "Content-Type": "application/x-www-form-urlencoded"
      }
      let getValue = {
        where: `{"name":"${value}"}`
      }
      timer = setTimeout(function () {
        getLcJson(getheader, getValue).then((response) => {
          let result = response.results
          console.log(result)
          $('#searchList').empty()
          timer = undefined
          if (result.length === 0) {
            let $li = $(`<li>暂无搜索结果</li>`)
            $li.appendTo('#searchList')
          } else {
            var array = result.map((r) => r.name)
            array.forEach((i) => {
              let $li = $(`<li>${i}</li>`)
              $li.appendTo('#searchList')
            })
          }
        })
      }, 300)
    })
  }

  /**
   * 发送ajax请求获取leancloud上的数据
   */
  function getLcJson(header, mydata) {
    var $ajax = $.ajax({
      url: myUrl,
      type: 'GET',
      dataType: 'json',
      headers: header,
      data: mydata
    })
    return $ajax
  }
})