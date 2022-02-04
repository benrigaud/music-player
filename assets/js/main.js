// Player
const audio = document.querySelector('.song audio')
const allTracks = document.querySelectorAll('.track')
const tracklistLength = allTracks.length
const buttonPlay = document.querySelectorAll('.play-pause')
const buttonNext = document.querySelectorAll('.next')
const buttonPrev = document.querySelectorAll('.prev')
const buttonPlayIcon = document.querySelectorAll('.play-pause i')

const playButtonHandler = (e) => {
    e.preventDefault()
    
    if ( audio.paused ) {
        audio.play()
        buttonPlayIcon.forEach(btn => btn.classList.remove('fa-play'))
        buttonPlayIcon.forEach(btn => btn.classList.add('fa-pause'))
    } else {
        audio.pause()
        buttonPlayIcon.forEach(btn => btn.classList.add('fa-play'))
        buttonPlayIcon.forEach(btn => btn.classList.remove('fa-pause'))
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
    let songName = document.querySelector('.name')
    let artistName = document.querySelector('.artist')
    let songCover = document.querySelector('.cover')
    let songCoverShadow = document.querySelector('.cover-shadow')
    let songSource = document.querySelector('audio source')
    const theCover = document.querySelector('.song-cover')

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
    buttonPlayIcon.forEach(btn => btn.classList.remove('fa-play'))
    buttonPlayIcon.forEach(btn => btn.classList.add('fa-pause'))
    allTracks.forEach(e => e.classList.remove('active'))
    allTracks.forEach(e => {
        if(e.getAttribute('songId') === nextTrackId) {
            e.classList.add('active')
        }
    })
}

buttonPlay.forEach(btn => btn.addEventListener('click', playButtonHandler))
buttonNext.forEach(btn => btn.addEventListener('click', nextHandler))
buttonPrev.forEach(btn => btn.addEventListener('click', prevHandler))
allTracks.forEach(track => track.addEventListener('click', tracklistHandler))