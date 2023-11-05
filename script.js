console.log('Welcome to Spotify')
//initilize the variable
let songIndex=0;
let audioElement=new Audio('song/0.mp3');
let masterPlay=document.getElementById('masterPlay')
let myProgressBar=document.getElementById('myProgressBar')
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName')
let songItems=Array.from(document.getElementsByClassName('songItem'))
let songs=[
   {songName: "Hukum", filepath:"song/0.mp3",coverpath:"covers/1.jpg"},
   {songName: "sapta sagaralu", filepath:"song/1.mp3",coverpath:"covers/2.jpg"},
   {songName: "kalavathi", filepath:"song/2.mp3",coverpath:"covers/3.jpg"},
   {songName: "lady luck lady luck", filepath:"song/3.mp3",coverpath:"covers/4.jpg"},
   {songName: "keeda kola", filepath:"song/4.mp3",coverpath:"covers/5.jpg"},
   {songName: "maa oori polimera", filepath:"song/5.mp3",coverpath:"covers/6.jpg"}


]

songItems.forEach((element,i)=>{
    
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

})
//let audioElement=new Audio('1.mp3');
//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity=1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity=0;
        

    }
})

//listen to events
audioElement.addEventListener('timeupdate',()=>{
    
    //update seekbar

    progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
    console.log(progress);
    myProgressBar.value=progress;

})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')

    

        
    })

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
      //  console.log(e.target);
      if(audioElement.paused || audioElement.currentTime<=0)
      {
    
        makeAllPlays();
        songIndex=parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.src=`song/${songIndex}.mp3`
        masterSongName.innerText=songs[songIndex].songName

        audioElement.currentTime=0
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
      }
      else
      {
        audioElement.pause();
        e.target.classList.remove('fa-pause-circle')
        e.target.classList.add('fa-play-circle')
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')

      }

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>5)
    {
        songIndex=0
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`song/${songIndex}.mp3`
    masterSongName.innerText=songs[songIndex].songName

    audioElement.currentTime=0
    audioElement.play()
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')

})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)
    {
        songIndex=0
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`song/${songIndex}.mp3`
    masterSongName.innerText=songs[songIndex].songName
    audioElement.currentTime=0
    audioElement.play()
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')

})