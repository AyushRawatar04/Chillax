let currFolder;
let songs=[];
let currentSong = new Audio();
let playBtn2=document.querySelector(".playbtn2");
let playPrev=document.querySelector(".playPrev");
let playNext=document.querySelector(".playNext");
let songInfo=document.querySelector(".playbarInfo");
let songTime=document.querySelector(".playbarTime");
let circle=document.querySelector(".circle");
let seekBar=document.querySelector(".seekbar");
let hamburger=document.querySelector(".hamburger");
let leftSide=document.querySelector(".left");
let cross=document.querySelector(".Xmark");

async function getSongs(folder) {
    let a = await fetch(`/songs/${folder}/list.json`);
    let response = await a.json();
    currFolder=folder;
    songs=response;
    let songUL = document.querySelector(".songcardBox ul");
    songUL.innerHTML="";
    for(let el of response){
        let songName=el.split("-")[0];
        let artist=el.split("-")[1];
        // console.log("songname=",songName);
        // console.log("artist=",artist);
        let li = document.createElement("li");
        li.innerHTML = `<img src="music.svg" class="invert" alt="">
                            <div class="info">
                                <div class="songName">${songName.replaceAll("%20"," ")}</div>
                                <div class="artistName">${artist.replaceAll("%20"," ")}</div>
                            </div>
                            <div class="playnow">
                                Play Now
                                <img src="playcard.svg" class="invert" alt="">
                            </div>`
        songUL.appendChild(li);
    }
    // for (let el of songs) {
    //     console.log(el);
    //     let li = document.createElement("li");
    //     el = el.split(currFolder)[1];
    //     let songName=el.split("-")[0];
    //     let artist=el.split("-")[1];
    //     console.log("songname=",songName);
    //     console.log("artist=",artist);
    //     li.innerHTML = `<img src="music.svg" class="invert" alt="">
    //                         <div class="info">
    //                             <div class="songName">${songName.replaceAll("%20"," ")}</div>
    //                             <div class="artistName">${artist.replaceAll("%20"," ")}</div>
    //                         </div>
    //                         <div class="playnow">
    //                             Play Now
    //                             <img src="playcard.svg" class="invert" alt="">
    //                         </div>`
    //     songUL.appendChild(li);
    // }

    let songList=document.querySelectorAll(".songcardBox li");
    songList.forEach((lisong)=>{
        lisong.addEventListener("click",()=>{
            // console.log(lisong);
            let songName=lisong.querySelector(".songName");
            let artist=lisong.querySelector(".artistName");
            // console.log(songName.innerHTML);
            // console.log(artist.innerHTML);
            playMusic(songName.innerHTML,artist.innerHTML);
        });
    });

}

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Pad with leading zeros if they are less than 10
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

const playMusic=(track,singer,pause=false)=>{
    // var audio=new Audio("/songs/"+track);
    // console.log(track);
    currentSong.src="/songs/"+currFolder+track+"-"+singer;
    if(!pause){
        currentSong.play();
        playBtn2.src="pause.svg";
    }
    songInfo.innerHTML=track+" - "+singer.split(".mpeg")[0];
    songTime.innerHTML="00:00 / 00:00"
}

async function displayAlbums(){
    let a = await fetch(`/songs/songs.json`);
    let folderList = await a.json();
    // folderList.forEach((e)=>{
    //     console.log(e);
    // })
    for(let folderName of folderList){
        let b = await fetch("/songs/"+folderName+"/info.json");
        let response = await b.json();
        let cardContainer=document.querySelector(".cardContainer");
        cardContainer.innerHTML=cardContainer.innerHTML+`<div data-folder=${folderName} class="card">
                    <div class="playimg">
                        <img src="/songs/${folderName}/cover.jpeg" alt="cover">
                        <div class="playbtn">
                            <img src="play.svg" alt="play">
                        </div>
                    </div>
                    <h3>${response.title}</h3>
                    <p>${response.description}</p>
                </div>`;
    }
}

async function main() {
    await getSongs("hindiSongs/");
    // console.log(songs);
    await displayAlbums();
    console.log("song[0]=",songs[0]); 
    // let iniSong=songs[0].split(currFolder)[1];
    let iniSong=songs[0];
    let sn=iniSong.split("-")[0].replaceAll("%20"," ");
    let an=iniSong.split("-")[1].replaceAll("%20"," ");
    // console.log(sn,an);
    playMusic(sn,an,true);
    
    currentSong.addEventListener("timeupdate",()=>{
        // console.log(currentSong.currentTime,currentSong.duration);
        songTime.innerHTML=secondsToMinutesSeconds(currentSong.currentTime)+" / "+secondsToMinutesSeconds(currentSong.duration);
        circle.style.left=(currentSong.currentTime/currentSong.duration)*99 + "%";
    })

    playBtn2.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play();
            playBtn2.src="pause.svg";
            
        }
        else{  
            currentSong.pause();
            playBtn2.src="play.svg";
        }
    });
    
    seekBar.addEventListener("click",(e)=>{
        // console.log(e.offsetX,e.target.getBoundingClientRect().width);
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*99;
        // console.log("percent=",percent);
        circle.style.left=percent + "%";
        currentSong.currentTime=(currentSong.duration*percent)/99;
    });
   
    
    hamburger.addEventListener("click",()=>{
        leftSide.style.left=0+"%";
    });
    cross.addEventListener("click",()=>{
        leftSide.style.left=-110+"%";
    })
    
    playPrev.addEventListener("click",()=>{
        console.log("play prev");
        let currentAudio=decodeURI(currentSong.src.split("/").slice(-1)[0]);
        let ind=songs.indexOf(currentAudio);
        
        if(ind-1>=0){
            let songToPlay=songs[ind-1];
            let sn=songToPlay.split("-")[0];
            let an=songToPlay.split("-")[1];
            console.log(sn,an);
            playMusic(sn,an);
        }
        
    });
    playNext.addEventListener("click",()=>{
        console.log("play next");
        // console.log(currentSong.src);
        currentAudio=decodeURI(currentSong.src.split("/").slice(-1)[0]);
        let ind=songs.indexOf(currentAudio);
        if(ind+1<songs.length){
            let songToPlay=songs[ind+1];
            let sn=songToPlay.split("-")[0];
            let an=songToPlay.split("-")[1];
            console.log(sn,an);
            playMusic(sn,an);
        }
    });

    let allCards=document.querySelectorAll(".card");
    for(card of allCards){
        card.addEventListener("click",async (item)=>{
            getSongs(item.currentTarget.dataset.folder+"/");
        });
    }

}
main();