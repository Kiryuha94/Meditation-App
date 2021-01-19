const selectTime = document.querySelectorAll('.select-time button'),
  sound = document.getElementById('sound'),
  statePlayer = document.getElementById('state'),
  time = document.getElementById('time'),
  mountain = document.getElementById('mountain'),
  sea = document.getElementById('sea'),
  video = document.getElementById('video'),
  outline = document.querySelector('.moving-outline circle'),
  title = document.getElementById('title'),
  svgElement = document.getElementById('svg-element'),
  SECONDS_IN_MINUTE = 60,
  MEDIA_SRC = {
    sea: './video/Sea.mp4',
    mountain: './video/Trail.mp4',
    seaSound: './audio/sea.mp3',
    mountainSound: './audio/glade-wind-birds-trees.mp3',
  }

let duration,
  isActivePlayer = false,
  isChooseMood = false
const outlineLength = outline.getTotalLength()
outline.style.strokeDashoffset = outlineLength
outline.style.strokeDasharray = outlineLength
const addZero = (n) => (n < 10 ? `0${n}` : n)
const getFormattedTimeFromDuration = (duration) => {
  return `${addZero(duration / SECONDS_IN_MINUTE)}:${addZero(duration % SECONDS_IN_MINUTE)}`
}

document.addEventListener('DOMContentLoaded', () => {
  selectTime.forEach((min) => {
    min.addEventListener('click', () => {
      duration = min.getAttribute('data-time')
      time.innerText = getFormattedTimeFromDuration(duration)
    })
  })

const playMedia = () => {
  duration = 0
  svgElement.classList.remove('hidden')
    time.classList.remove('hidden')
    statePlayer.classList.remove('hidden')
    title.classList.add('hidden')
    statePlayer.classList.remove('pause')
    statePlayer.classList.add('play')
  }
  
  mountain.addEventListener('click', () => {
    video.setAttribute('src', MEDIA_SRC.mountain)
    sound.setAttribute('src', MEDIA_SRC.mountainSound)
    playMedia()
  })

  sea.addEventListener('click', () => {
    video.setAttribute('src', MEDIA_SRC.sea)
    sound.setAttribute('src', MEDIA_SRC.seaSound)
    playMedia()
  })

  statePlayer.addEventListener('click', () => {
    if (isActivePlayer) {
      video.pause()
      sound.pause()
      statePlayer.classList.remove('pause')
      statePlayer.classList.add('play')
      isActivePlayer = false
    } else if (!!duration) {
      video.play()
      sound.play()
      statePlayer.classList.remove('play')
      statePlayer.classList.add('pause')
      isActivePlayer = true
      sound.ontimeupdate()
    }
  })

  sound.ontimeupdate = () => {
    if (!isActivePlayer) return
    const soundCurrTime = sound.currentTime
    const timeLeft = duration - soundCurrTime
    const minutes = Math.floor(timeLeft / SECONDS_IN_MINUTE)
    const seconds = Math.floor(timeLeft % SECONDS_IN_MINUTE)
    time.innerText = `${addZero(minutes)}:${addZero(seconds)}`
    let namedLength = outlineLength - (soundCurrTime / duration) * outlineLength
    outline.style.strokeDashoffset = namedLength

    if (timeLeft < 1) {
      time.innerText = 'Please, choose time!'
      video.pause()
      sound.pause()
      statePlayer.classList.remove('pause')
      statePlayer.classList.add('play')
      outline.style.strokeDashoffset = outlineLength
      isActivePlayer = false
    }
  }
})
