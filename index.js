const selectTime = document.querySelectorAll('.select-time button'),
  sound = document.getElementById('sound'),
  statePlayer = document.getElementById('state'),
  time = document.getElementById('time'),
  mountain = document.getElementById('mountain'),
  sea = document.getElementById('sea'),
  video = document.getElementById('video'),
  outline = document.querySelector('.moving-outline circle'),
  title = document.getElementById('title'),
  svg = document.getElementById('svg'),
  MEDIA_SRC = {
  sea: './video/Sea.mp4',
  mountain: './video/Trail.mp4',
  seaSound: '././audio/sea.mp3',
  mountainSound: '././audio/glade-wind-birds-trees.mp3',
}

let duration,
  isActivePlayer = false,
  isChooseMood = false
const outlineLength = outline.getTotalLength()
outline.style.strokeDashoffset = outlineLength
outline.style.strokeDasharray = outlineLength
const addZero = (n) => (n < 10 ? `0${n}` : n)
const getFormattedTimeFromDuration = (duration) => {
  return `${addZero(duration / 60)}:${addZero(duration % 60)}`
}

document.addEventListener('DOMContentLoaded', () => {
  selectTime.forEach((min) => {
    min.addEventListener('click', () => {
      duration = min.getAttribute('data-time')
      time.innerText = getFormattedTimeFromDuration(duration)
    })
  })

  mountain.addEventListener('click', () => {
    svg.classList.remove('hidden')
    time.classList.remove('hidden')
    statePlayer.classList.remove('hidden')
    title.classList.add('hidden')
    video.setAttribute('src', MEDIA_SRC.mountain)
    sound.setAttribute('src', MEDIA_SRC.mountainSound)
    statePlayer.classList.remove('pause')
    statePlayer.classList.add('play')
  })

  sea.addEventListener('click', () => {
    svg.classList.remove('hidden')
    time.classList.remove('hidden')
    statePlayer.classList.remove('hidden')
    title.classList.add('hidden')
    video.setAttribute('src', MEDIA_SRC.sea)
    sound.setAttribute('src', MEDIA_SRC.seaSound)
    statePlayer.classList.remove('pause')
    statePlayer.classList.add('play')
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
    const minutes = Math.floor(timeLeft / 60)
    const seconds = Math.floor(timeLeft % 60)
    time.innerText = `${addZero(minutes)}:${addZero(seconds)}`
    let namedLength = outlineLength - (soundCurrTime / duration) * outlineLength
    outline.style.strokeDashoffset = namedLength

    if (timeLeft < 1) {
      time.innerText = '00:00'
      video.pause()
      sound.pause()
      statePlayer.classList.remove('pause')
      statePlayer.classList.add('play')
      outline.style.strokeDashoffset = outlineLength
      isActivePlayer = false
    }
  }
})
