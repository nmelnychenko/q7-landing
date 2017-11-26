// Fourth-block

// Slider elements
const fourthBlockSlider = document.querySelector('.Fourth-block__slider')
const fourthBlockNext = document.querySelector('.Fourth-block__right-arrow')
const fourthBlockPrevious = document.querySelector('.Fourth-block__left-arrow')
const fourthBlockItems = document.querySelectorAll('.Fourth-block__slider .item')
let fourthBlockPageNumber = document.querySelector('.Fourth-block__counter')
const fourthBlockCircleSvg = document.querySelectorAll('.Fourth-block .new')

// Bottom vertical controls
const fourthBlockBottomControls = document.querySelectorAll('.Fourth-block__vertical-controls .item')
const fourthBlockControls = document.querySelector('.Fourth-block__controls')
const fourthBlockVerticalControls = document.querySelector('.Fourth-block__vertical-controls')

// 3D iframe
const showThreeDimensionView = document.querySelector('.show-preview')
const closeThreeDimensionView = document.querySelector('.close-preview')
const threeDimensionView = document.querySelector('.iframe-3d iframe')

// e-tron video-blocks
const fourthBlockInnerCircle = document.querySelectorAll('.Fourth-block.e-tron .video-container .inner-circle')
const fourthBlockPlayer = document.querySelectorAll('.Fourth-block.e-tron .video-container video')
const fourthBlockProgressPlayStatus = document.querySelectorAll('.Fourth-block.e-tron .progress__play-status')
const fourthBlockFullScreenButton = document.querySelectorAll('.Fourth-block.e-tron .full-screen')
const fourthBlockSeekBar = document.querySelectorAll('.Fourth-block.e-tron .progress__seekbar')

fourthBlockBottomControls.forEach((element, index) => {
    element.addEventListener('click', () => bottomControls(fourthBlockSlider, fourthBlockPageNumber, fourthBlockItems, index))
})

fourthBlockPrevious.addEventListener('click', () => previousSlide(fourthBlockSlider, fourthBlockItems, fourthBlockPageNumber)
)

fourthBlockNext.addEventListener('click', () => {
    nextSlide(fourthBlockSlider, fourthBlockItems, fourthBlockPageNumber)
})

fourthBlockCircleSvg && fourthBlockCircleSvg.forEach(element => {
    element.addEventListener('click', () => element.classList.add('clicked'))
})

showThreeDimensionView && showThreeDimensionView.addEventListener('click', ()=> {
    threeDimensionView.style.visibility = 'visible'
    showThreeDimensionView.style.zIndex = '1'
    closeThreeDimensionView.style.zIndex = '6'
    fourthBlockControls.style.zIndex = '-1'
    fourthBlockVerticalControls.style.zIndex = '-1'
})

closeThreeDimensionView && closeThreeDimensionView.addEventListener('click', ()=> {
    threeDimensionView.style.visibility = 'hidden'
    showThreeDimensionView.style.zIndex = '6'
    closeThreeDimensionView.style.zIndex = '-1'
    fourthBlockControls.style.zIndex = '99'
    fourthBlockVerticalControls.style.zIndex = '99'
})

// e-tron video
fourthBlockInnerCircle && fourthBlockInnerCircle.forEach(item => {
    item.classList.add('active')
})

fourthBlockInnerCircle && fourthBlockInnerCircle.forEach(item => {
    item.addEventListener('click', () => {
        const dataValue = item.dataset.slide
        const video = document.querySelector(`.Fourth-block.e-tron .video-container video[data-slide="${dataValue}"]`)
        const playStatus = document.querySelector(`.Fourth-block.e-tron .progress__play-status[data-slide="${dataValue}"]`)
        const playStatusPaused = document.querySelector(`.Fourth-block.e-tron .progress__play-status--pause[data-slide="${dataValue}"]`)
        const playStatusPlayed = document.querySelector(`.Fourth-block.e-tron .progress__play-status--play[data-slide="${dataValue}"]`)

        if (item.classList.contains('active')) {
            video.play()
            item.classList.remove('active')
            playStatus.classList.add('animated')
            playStatusPaused.beginElement()
        } else {
            video.pause()
            item.classList.add('active')
            playStatus.classList.contains('animated') && playStatus.classList.remove('animated')
            playStatusPlayed.beginElement()
        }
    })
})


fourthBlockFullScreenButton && fourthBlockFullScreenButton.forEach(item => {
    item.addEventListener('click', () => {
        const delay = 300
        const dataValue = item.dataset.slide
        const videoContainer = document.querySelector(`.Fourth-block.e-tron .video-container[data-slide="${dataValue}"]`)
        const animationFrom = document.querySelector(`.Fourth-block.e-tron .animation-from[data-slide="${dataValue}"]`)
        const animationTo = document.querySelector(`.Fourth-block.e-tron .animation-to[data-slide="${dataValue}"]`)

        if (item.classList.contains('animated')) {
            item.classList.remove('animated')
            animationFrom.beginElement()
            setTimeout(() => {
                videoContainer.classList.remove('full')
                document.body.removeAttribute('style')
            }, delay)
        } else {
            item.classList.add('animated')
            animationTo.beginElement()
            setTimeout(() => {
                videoContainer.classList.add('full')
                document.body.style.overflow = 'hidden';
            }, delay)
        }
    })
})


fourthBlockProgressPlayStatus && fourthBlockProgressPlayStatus.forEach(item => {
    item.addEventListener('click', () => {
        const delay = 300
        const dataValue = item.dataset.slide
        const video = document.querySelector(`.Fourth-block.e-tron .video-container video[data-slide="${dataValue}"]`)
        const innerCircle = document.querySelector(`.Fourth-block.e-tron .video-container .inner-circle[data-slide="${dataValue}"]`)
        const playedStatus = document.querySelector(`.Fourth-block.e-tron .progress__play-status--play[data-slide="${dataValue}"]`)
        const pausedStatus = document.querySelector(`.Fourth-block.e-tron .progress__play-status--pause[data-slide="${dataValue}"]`)

        if (item.classList.contains('animated')) {
            item.classList.remove('animated')
            playedStatus.beginElement()
            innerCircle.classList.add('active')
            setTimeout(() => { video.pause() }, delay)
        } else {
            item.classList.add('animated')
            pausedStatus.beginElement()
            innerCircle.classList.remove('active') && innerCircle.classList.remove('active')
            setTimeout(() => { video.play() }, delay)
        }
    })
})


//As video progresses, seekBar moves forward
fourthBlockPlayer && fourthBlockPlayer.forEach(item => {
    const dataValue = item.dataset.slide
    const progress = document.querySelector(`.Fourth-block.e-tron .progress__seekbar div[data-slide="${dataValue}"]`)
    const progressCircle = document.querySelector(`.Fourth-block.e-tron .progress__seekbar--circle[data-slide="${dataValue}"]`)

    item.addEventListener('timeupdate', function updateProgress() {
        let value = `${(100 / item.duration) * item.currentTime}%`

        progress.style.width = value
        progressCircle.style.left = value

        if (progress.style.width !== '100%') {
            requestAnimationFrame(updateProgress)
        }
    })
})

//when video timebar clicked
fourthBlockSeekBar && fourthBlockSeekBar.forEach(item => {
    const dataValue = item.dataset.slide
    const progress = document.querySelector(`.Fourth-block.e-tron .progress__seekbar div[data-slide="${dataValue}"]`)
    const video = document.querySelector(`.Fourth-block.e-tron .video-container video[data-slide="${dataValue}"]`)

    item.addEventListener('mousedown', function(e) {
        const position = e.pageX - item.getBoundingClientRect().left
        let percentage = 100 * position / item.offsetWidth;
        ( percentage > 100 ) && ( percentage = 100 );
        ( percentage < 0 ) && ( percentage = 0 );
        progress.setAttribute('width', `${percentage}%`)
        video.currentTime = video.duration * percentage / 100
    })
})
