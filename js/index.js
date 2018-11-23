/*  */

//动态生成推荐音乐
$(function () {
  $.get('./songs.json').then(function (response) {
    console.log(response)
    let items = response
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
        $li.text(response.content)
        $li.attr('data-downloader', 'yes')

      })
    } else if (index === 2) {
      $.get('./page3.json').then((response) => {
        $li.text(response.content)
        $li.attr('data-downloader', 'yes')

      })
    }
  })
})