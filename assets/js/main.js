// Player
const audio = document.querySelector('.song audio')
const allTracks = document.querySelectorAll('.track')
const tracklistLength = allTracks.length
const buttonPlay = document.querySelector('.play-pause')
const buttonNext = document.querySelector('.next')
const buttonPrev = document.querySelector('.prev')
const buttonPlayIcon = document.querySelector('.play-pause i')

const playButtonHandler = (e) => {
    e.preventDefault()
    
    if ( audio.paused ) {
        audio.play()
        buttonPlayIcon.classList.remove('fa-play')
        buttonPlayIcon.classList.add('fa-pause')
    } else {
        audio.pause()
        buttonPlayIcon.classList.add('fa-play')
        buttonPlayIcon.classList.remove('fa-pause')
    }
}

const tracklistHandler = (e) => {
    e.preventDefault()
    const nextSongId = parseInt(e.currentTarget.getAttribute('songId'))
    playThis(nextSongId)
    allTracks.forEach(e => e.classList.remove('active'))
    e.currentTarget.classList.add('active')
}

const nextHandler = (e) => {
    const currentSongId = parseInt(document.querySelector('.song').getAttribute('song-id'))
    const nextSongId = currentSongId + 1
    if (nextSongId > tracklistLength){
        playThis(1)
    } else{
        playThis(nextSongId)
    }
}

const prevHandler = (e) => {
    const currentSongId = parseInt(document.querySelector('.song').getAttribute('song-id'))
    const prevSongId = currentSongId - 1
    if (prevSongId === 0){
        playThis(tracklistLength)
    } else{
        playThis(prevSongId)
    }
}

const playThis = (id) => {
    // get song elements
    const song = document.querySelector('.song')
    let songName = song.querySelector('.name')
    let artistName = song.querySelector('.artist')
    let songCover = song.querySelector('.cover')
    let songCoverShadow = song.querySelector('.cover-shadow')
    let songSource = song.querySelector('audio source')
    const theCover = song.querySelector('.song-cover')

    // get track values
    const nextTrack = document.querySelector(`[songId="${id}"]`)
    const nextTrackId = nextTrack.getAttribute('songId')
    const nextTrackName = nextTrack.getAttribute('songName')
    const nextTrackArtist = nextTrack.getAttribute('songArtist')
    const nextTrackPath = nextTrack.getAttribute('songPath')
    const nextTrackCover = nextTrack.getAttribute('songCover')
    
    // update song elements
    song.setAttribute('song-id', nextTrackId)
    songName.innerHTML = nextTrackName
    artistName.innerHTML = nextTrackArtist
    songCover.src = nextTrackCover
    songCoverShadow.src = nextTrackCover
    songSource.src = nextTrackPath

    audio.load()
    audio.play()
    buttonPlayIcon.classList.remove('fa-play')
    buttonPlayIcon.classList.add('fa-pause')
    allTracks.forEach(e => e.classList.remove('active'))
    allTracks.forEach(e => {
        if(e.getAttribute('songId') === nextTrackId) {
            e.classList.add('active')
        }
    })
}

buttonPlay.addEventListener('click', playButtonHandler)
buttonNext.addEventListener('click', nextHandler)
buttonPrev.addEventListener('click', prevHandler)
allTracks.forEach(track => track.addEventListener('click', tracklistHandler))