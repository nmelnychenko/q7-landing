const videoBlockPlayer = document.querySelector('.Video-block .video-container video')
const videoBlockInnerCircle = document.querySelector('.Video-block .video-container .inner-circle')
const progressPlayStatus = document.querySelector('.Video-block .progress__play-status')
const statusPlayed = document.querySelector('.Video-block .progress__play-status--play')
const statusPaused = document.querySelector('.Video-block .progress__play-status--pause')
const animationTo = document.querySelector('.Video-block .animation-to')
const animationFrom = document.querySelector('.Video-block .animation-from')
const fullScreenButton = document.querySelector('.Video-block .full-screen')
const videoBlockContainer = document.querySelector('.Video-block .video-container')
const seekBar = document.querySelector('.Video-block .progress__seekbar')
const videoProgress = document.querySelector('.Video-block .progress__seekbar div')
const videoProgressCircle = document.querySelector('.Video-block .progress__seekbar--circle')
const videoItemControler = document.querySelectorAll('.Video-block .video-slider__item')
const videoBlockRightArrow = document.querySelector('.Video-block .right-arrow')
const videoBlockLeftArrow = document.querySelector('.Video-block .left-arrow')
const videoBlockSlider = document.querySelector('.Video-block .bottom-line')

let Page = VideoBlock.classList.contains('sq7')
    ? 'sq7'
    : VideoBlock.classList.contains('e-tron')
        ? 'e-tron'
        : 'q7';

videoBlockInnerCircle.classList.add('active')
videoBlockLeftArrow.classList.add('disabled')

videoBlockInnerCircle.addEventListener('click', () => {
    if (videoBlockInnerCircle.classList.contains('active')) {
        videoBlockPlayer.play()
        videoBlockInnerCircle.classList.remove('active')
        progressPlayStatus.classList.add('animated')
        statusPaused.beginElement()
    } else {
        videoBlockPlayer.pause()
        videoBlockInnerCircle.classList.add('active')
        progressPlayStatus.classList.contains('animated') && progressPlayStatus.classList.remove('animated')
        statusPlayed.beginElement()
    }
})

fullScreenButton.addEventListener('click', () => {
    const delay = 300

    if (fullScreenButton.classList.contains('animated')) {
        fullScreenButton.classList.remove('animated')
        animationFrom.beginElement()
        setTimeout(() => {
            videoBlockContainer.classList.remove('full')
            document.body.removeAttribute('style')
        }, delay)
    } else {
        fullScreenButton.classList.add('animated')
        animationTo.beginElement()
        setTimeout(() => {
            videoBlockContainer.classList.add('full')
            document.body.style.overflow = 'hidden';
        }, delay)
    }
})

progressPlayStatus.addEventListener('click', () => {
    const delay = 300

    if (progressPlayStatus.classList.contains('animated')) {
        progressPlayStatus.classList.remove('animated')
        statusPlayed.beginElement()
        videoBlockInnerCircle.classList.add('active')
        setTimeout(() => { videoBlockPlayer.pause() }, delay)
    } else {
        progressPlayStatus.classList.add('animated')
        statusPaused.beginElement()
        videoBlockInnerCircle.classList.remove('active') && videoBlockInnerCircle.classList.remove('active')
        setTimeout(() => { videoBlockPlayer.play() }, delay)
    }
})

//As video progresses, seekBar moves forward
videoBlockPlayer.addEventListener('timeupdate', function updateProgress() {
    let value = `${(100 / videoBlockPlayer.duration) * videoBlockPlayer.currentTime}%`
    videoProgress.style.width = value
    videoProgressCircle.style.left = value

    if (videoProgress.style.width !== '100%') {
        requestAnimationFrame(updateProgress)
    }
});

//when video timebar clicked
seekBar.addEventListener('mousedown', function(e) {
    const position = e.pageX - seekBar.getBoundingClientRect().left
    let percentage = 100 * position / seekBar.offsetWidth;
    ( percentage > 100 ) && ( percentage = 100 );
    ( percentage < 0 ) && ( percentage = 0 );
    videoProgress.setAttribute('width', `${percentage}%`)
    videoBlockPlayer.currentTime = videoBlockPlayer.duration * percentage / 100
})

// changeVideo
videoItemControler.forEach((element, index) => {
    element.addEventListener('click', () => {
        videoBlockPlayer.src = `videos/${Page}-video-block${index + 1}.mp4`
        videoBlockPlayer.poster = `css/images/${Page}-video-block${index + 1}.jpg`
        if (!videoBlockInnerCircle.classList.contains('active')) {
            videoBlockInnerCircle.classList.add('active')
            progressPlayStatus.classList.remove('animated')
            statusPlayed.beginElement()
        }
    })
})

// slider
Page === 'q7' && videoBlockRightArrow.addEventListener('click', function moveBottomLineRight() {
    videoBlockSlider.classList.contains('left') && videoBlockSlider.classList.remove('left')
    videoBlockLeftArrow.classList.contains('disabled') && videoBlockLeftArrow.classList.remove('disabled')
    videoBlockSlider.classList.add('right')
    videoBlockRightArrow.classList.add('disabled')
})

Page === 'q7' && videoBlockLeftArrow.addEventListener('click', function moveBottomLineRight() {
    videoBlockSlider.classList.contains('right') && videoBlockSlider.classList.remove('right')
    videoBlockRightArrow.classList.contains('disabled') && videoBlockRightArrow.classList.remove('disabled')
    videoBlockSlider.classList.add('left')
    videoBlockLeftArrow.classList.add('disabled')
})
