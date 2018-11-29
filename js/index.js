//动态生成推荐音乐
$(function () {
  $.ajax({
    url: "https://mexb4utr.api.lncld.net/1.1/classes/Songs",
    type: 'GET',
    dataType: 'json',
    headers: {
      "X-LC-Id": "mexB4UtrT94NUV77jKbWjXrg-gzGzoHsz",
      "X-LC-Key": "aUf02b02gVG8DiEeqC4YcGEP,master"
    },
  }).then(function (response) {
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
      $.get('./page3.json').then((response) => {
        // $li.text(response.content)
        $li.attr('data-downloader', 'yes')

      })
    }
  })

  //
  let timer = undefined
  var $searchList = $('#searchList')
  $('input#searchSong').on('input', function (e) {
    $searchList.empty()
    let $input = $(e.currentTarget)
    let value = $input.val().trim()
    // console.log(value)
    if (value === '') {
      return
    }
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(function () {
      search(value).then((result) => {
        timer = undefined
        if (result.length !== 0) {
          var array = result.map((r) => r.name)
          array.forEach((i) => {
            let $li = $(`<li>${i}</li>`)
            $li.appendTo('#searchList')
          })
        } else {
          let $li = $(`<li>暂无搜索结果</li>`)
          $li.appendTo('#searchList')
        }
      })
    }, 300)
  })



  function search(keyword) {
    return new Promise((resolve, reject) => {
      var database = [{
          "id": 1,
          "name": "盗将行"
        },
        {
          "id": 2,
          "name": "可不可以"
        },
        {
          "id": 3,
          "name": "光年之外"
        },
        {
          "id": 4,
          "name": "光辉岁月"
        }
      ]
      let result = database.filter(function (item) {
        return item.name.indexOf(keyword) >= 0
      })
      setTimeout(function () {
        resolve(result)
      }, ~~(Math.random() * 300 + 1000))
    })

  }
})
