var update = function () {
    currentTime = moment(new Date());

    $('.current').html(currentTime.format('hh:mm'));
  };
  
  $(function(){
    update();
    setInterval(update, 1000);
  });

const online = document.getElementById("online");
const image = document.createElement('img')

if(navigator.onLine){
  image.src= '../img/online.png'
  document.body.appendChild(image)
  document.querySelector('.servidor').appendChild(image)
}

window.addEventListener("online", function (){
    image.src= '../img/online.png'
  document.body.appendChild(image)
  document.querySelector('.servidor').appendChild(image)
})

window.addEventListener("offline", function (){
  image.src= '../img/offline.png'
  document.body.appendChild(image)
  document.querySelector('.servidor').appendChild(image)
})