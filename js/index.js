/*  */
      

$(function(){
 $.get('./songs.json').then(function(response){
   console.log(response)
   let items  = response
   items.forEach((i)=>{
     let $li = $(`
     <li>
      <a href="./song.html?id=${i.id}">
      <h3>${i.name}</h3>
      <p>
        <svg class="sq" aria-hidden="true">
        <use xlink:href="#icon-wusunyinzhi"></use>
        </svg>
        吉克隽逸-GlobalCitizen世界公民
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

})