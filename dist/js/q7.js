// 360 deg view
(function() {
    window.onload = init

    const autoPlayButton = document.querySelector('.play')
    const stopPlayButton = document.querySelector('.stop')
    const imageContainer =  document.querySelector('.threesixty_images')
    let car

    function init(){

        car = $('.threesixty').ThreeSixty({
            totalFrames: 36, // Total no. of image you have for 360 slider
            endFrame: 36, // end frame for the auto spin animation
            currentFrame: 1, // This the start frame for auto spin
            imgList: '.threesixty_images', // selector for image list
            progress: '.spinner', // selector to show the loading progress
            imagePath:'css/images/', // path of the image assets
            filePrefix: 'q7_', // file prefix if any
            ext: '.png', // extention for the assets
            height: 1000,
            width: 447,
            navigation: false,
            responsive: true
        })

        const previousFrame = () => car.previous()
        const nextFrame = () => car.next()
        const autoPlay = (playControler, stopControler) => {
            car.play()
            playControler.style.zIndex = '1'
            stopControler.style.zIndex = '22'
        }
        const stopPlay = (playControler, stopControler) => {
            car.stop()
            stopControler.style.zIndex = '1'
            playControler.style.zIndex = '22'
        }
        const grabbing = (element) => {
            element.classList.add('active')
        }
        const grabbingOut = (element) => {
            element.classList.contains('active') && element.classList.remove('active')
        }

        document.querySelector('.previous-frame').addEventListener('click', previousFrame)
        document.querySelector('.next-frame').addEventListener('click', nextFrame)
        autoPlayButton.addEventListener('click', () => {
            autoPlay(autoPlayButton, stopPlayButton)
        })
        stopPlayButton.addEventListener('click', () => {
            stopPlay(autoPlayButton, stopPlayButton)
        })
        imageContainer.addEventListener('mousedown', () => {
            grabbing(imageContainer)
        })
        imageContainer.addEventListener('mouseup', () => {
            grabbingOut(imageContainer)
        })
    }
}())


// Slider
// Slider
const fullWidthSlideChange = (element, number, counter) => {
    element.style.marginLeft = `${(-100) * (counter)}vw`
    number.innerText = counter + 1
}

const nextSlide = (element, items, number) => {
    const currentIndex = parseInt(number.innerText)
    const allSlides = items.length
    const newIndex = currentIndex === allSlides
        ? 1
        : currentIndex + 1

    fullWidthSlideChange(element, number, newIndex - 1)

    const previousItem = getCollectionElement(items, newIndex - 2) || items[allSlides - 1]
    const currentItem = getCollectionElement(items, newIndex - 1)
    toggleClass(previousItem, currentItem)
    setTimeout(startHeartBeat, 1)
}

const previousSlide = (element, items, number) => {
    const currentIndex = parseInt(number.innerText)
    const allSlides = items.length
    const newIndex = currentIndex === 1
        ? allSlides
        : currentIndex - 1
    const previousItem = getCollectionElement(items, currentIndex - 1) || items[0]
    const currentItem = getCollectionElement(items, newIndex - 1)

    fullWidthSlideChange(element, number, newIndex - 1)
    toggleClass(previousItem, currentItem)
    setTimeout(startHeartBeat, 1)
}

const bottomControls = (wrapper, pageNumber, items, index) => {
    const previousSlide = document.querySelector(`.${wrapper.classList.toString()}`)
    const currentItem = getCollectionElement(items, index)

    fullWidthSlideChange(wrapper, pageNumber, index)
    toggleClass(previousSlide, currentItem)
    setTimeout(startHeartBeat, 1)
}


// Handlers
const Header = document.querySelector('.Header.full-page')
const VideoBlock = document.querySelector('.Video-block.full-page')
const removeHideClass = () => {
    const hidden_item = document.querySelector('.hide')

    hidden_item && hidden_item.classList.remove('hide')
}

const hideActiveItem = () => {
    const active_item = document.querySelector('.active')
    const active_control = document.querySelector('.cls-2')

    active_item.classList.add('hide')
    active_item.classList.remove('active')
    active_control.classList.remove('cls-2')
}

// Animation for svg circles
const getCollectionElement = (element, index) => element[index]

const toggleClass = (previousElement, currentElement) => {
    const clickedSvg = document.querySelectorAll('.clicked')

    previousElement.classList.contains('current') && previousElement.classList.remove('current')
    currentElement.classList.add('current')
    clickedSvg &&
    clickedSvg.forEach(element => element.classList.remove('clicked'))
}

// TODO: Merge toggleClass and toggleActive into 1 function
const toggleActive = (previousElement, currentElement) => {
    previousElement.classList.contains('active') && previousElement.classList.remove('active')
    currentElement.classList.add('active')
}

const makeVisible = (array) => {
    array.forEach((element) => element.classList.add('visible'))
}

const startHeartBeat = () => {
    const smallCircles = document.querySelectorAll('.current .cls-2')
    const bigCircles = document.querySelectorAll('.current .cls-3')
    const combined = [].concat(
        Array.prototype.slice.call(smallCircles),
        Array.prototype.slice.call(bigCircles)
    )
    makeVisible(combined)
}

// Smooth scroll to top

const easing = (progress) => progress < 0.5 ? 4 * progress * progress * progress : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1

function topScrolling(elementY, duration) {
    let startingY = window.pageYOffset
    let diff = elementY - startingY
    let start

    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp
        // Elapsed milliseconds since start of scrolling.
        let time = timestamp - start
        // Get percent of completion in range [0, 1].
        let percent = Math.min(easing(time / duration), 1)

        window.scrollTo(0, startingY + diff * percent)

        // Proceed with animation as long as we wanted it to.
        if (time < duration) {
            window.requestAnimationFrame(step)
        }
    })
}

function bottomScrolling(elementY, duration) {
    let startingY = window.pageYOffset
    let diff = startingY - elementY
    let start

    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp
        // Elapsed milliseconds since start of scrolling.
        let time = timestamp - start
        // Get percent of completion in range [0, 1].
        let percent = Math.min(easing(time / duration), 1)

        window.scrollTo(0, startingY - diff * percent)

        // Proceed with animation as long as we wanted it to.
        if (time < duration) {
            window.requestAnimationFrame(step)
        }
    })
}

const toggleActiveClass = (newElement, wrapper) => {
    const previousActiveElement = document.querySelector(`.${wrapper.classList.value} .active`)
    toggleActive(previousActiveElement, newElement)
}

document.addEventListener('DOMContentLoaded', () => {
    const fullPageBlocks = Array.prototype.slice.call(document.querySelectorAll('.full-page'))
    const events = ['wheel', 'scroll']
    const animationTime = 1000
    const minLimit = - 30
    const maxLimit = 30
    let freezer
    let flag = true

    const checkFlag = event => {
        if (flag) {
            move(event)

            flag = !flag

            setTimeout(() => {
                flag = !flag
            }, animationTime)
        }
    }


    const freezeEvents = event => {
        if (event.deltaY) {
            if (event.deltaY > maxLimit || event.deltaY < minLimit) checkFlag(event)
        } else {
            checkFlag(event)
        }
    }

    const addListeners = () => events.forEach(event => document.addEventListener(event, freezeEvents))

    const moveToNext = index => {
        fullPageBlocks[index + 1] && fullPageBlocks[index + 1].classList.add('current-page')
    }

    const moveToPrevious = (index) => {
        fullPageBlocks[index - 1] && fullPageBlocks[index - 1].classList.add('current-page')
    }

    const move = (event) => {
        const previousPage = document.querySelector('.full-page.previous-page');
        const currentPage = document.querySelector('.full-page.current-page');
        const index = fullPageBlocks.indexOf(currentPage);
        const clickedElements = document.querySelectorAll('.clicked')

        if (!Header.classList.contains('current-page')
        && (event.deltaY < 0 || event.keyCode === 38)) {
            previousPage && previousPage.classList.remove('previous-page');
            currentPage.classList.remove('current-page');
            currentPage.classList.add('previous-page');

            moveToPrevious(index)
            const elementPos = document.querySelector('.full-page.current-page').offsetTop
            clickedElements.length !== 0 && clickedElements.forEach(element => {
                element.classList.contains('clicked') && element.classList.remove('clicked')
            })
            topScrolling(elementPos, animationTime)
        }

        /*
        TODO: return if statement for last VideoBlock
        */
        if (!fullPageBlocks[fullPageBlocks.length-1].classList.contains('current-page') && (event.deltaY > 0 || event.keyCode === 40)) {
            previousPage && previousPage.classList.remove('previous-page');
            currentPage.classList.remove('current-page');
            currentPage.classList.add('previous-page');

            moveToNext(index)
            const elementPos = document.querySelector('.full-page.current-page').offsetTop
            clickedElements.length !== 0 && clickedElements.forEach(element => {
                element.classList.contains('clicked') && element.classList.remove('clicked')
            })
            bottomScrolling(elementPos, animationTime)
        }
    }

    fullPageBlocks[0].classList.add('current-page')
    addListeners()
})

$(window).load(function(){
    $("html,body").animate({scrollTop: 0}, 1);
});


// Second block
const SecondBlock = document.querySelector('.Second-block')
const bodyColors = document.querySelector('.Second-block .body-color')
const wheels = document.querySelector('.Second-block .wheels')
const bodyColorControls = document.querySelectorAll('.Second-block .body-color__item')
const wheelsControls = document.querySelectorAll('.Second-block .wheels__item')
const secondBlockVideo = document.querySelector('.Second-block .video-container video')
const secondBlockInnerCircle = document.querySelector('.Second-block .video-container .inner-circle')

let secondBlockIndexes = {
    firstIndex: '1',
    secondIndex: '1'
}

let carModel = SecondBlock.classList.contains('e-tron') ? 'e-tron' : 'q7';

bodyColorControls[0].classList.add('active')
wheelsControls[0].classList.add('active')
secondBlockInnerCircle.classList.add('active')

bodyColorControls.forEach((element, index) => {
    element.addEventListener('click', () => {
        toggleActiveClass(element, bodyColors)
        secondBlockIndexes.firstIndex = index + 1
        secondBlockVideo.setAttribute('src', `videos/${carModel}_${secondBlockIndexes.firstIndex}${secondBlockIndexes.secondIndex}.mp4`)
        secondBlockVideo.setAttribute('poster', `css/images/${carModel}_second-block-${secondBlockIndexes.firstIndex}${secondBlockIndexes.secondIndex}.jpg`)
    })
})

wheelsControls.forEach((element, index) => {
    element.addEventListener('click', () => {
        toggleActiveClass(element, wheels)
        secondBlockIndexes.secondIndex = index + 1
        secondBlockVideo.setAttribute('src', `videos/${carModel}_${secondBlockIndexes.firstIndex}${secondBlockIndexes.secondIndex}.mp4`)
        secondBlockVideo.setAttribute('poster', `css/images/${carModel}_second-block-${secondBlockIndexes.firstIndex}${secondBlockIndexes.secondIndex}.jpg`)
    })
})

secondBlockInnerCircle.addEventListener('click', () => {
    secondBlockInnerCircle.classList.contains('active') ? (
        secondBlockVideo.play(),
        secondBlockInnerCircle.classList.remove('active')
    ) : (
        secondBlockVideo.pause(),
        secondBlockInnerCircle.classList.add('active')
    )
})

// Third Block
document.querySelector('.Third-block__slider')
    && document.querySelector('.Third-block__slider .first-slide').classList.add('current')
document.querySelector('.Fourth-block__slider')
    && document.querySelector('.Fourth-block__slider .first-slide').classList.add('current')
document.querySelector('.Fifth-block__slider')
    && document.querySelector('.Fifth-block__slider .first-slide').classList.add('current')
setTimeout(startHeartBeat, 1)

// Third-block

// Slider elements
const thirdBlockSlider = document.querySelector('.Third-block__slider')
const thirdBlockNext = document.querySelector('.Third-block__right-arrow')
const thirdBlockPrevious = document.querySelector('.Third-block__left-arrow')
const thirdBlockItems = document.querySelectorAll('.Third-block__slider .items')
const thirdBlockCircleSvg = document.querySelectorAll('.Third-block .new')
const thirdBlockScrolledText = document.querySelector('.Third-block .third-slide .text-container')
let thirdBlockPageNumber = document.querySelector('.Third-block__counter')

// Bottom vertical controls
const thirdBlockBottomControls = document.querySelectorAll('.Third-block__vertical-controls .item')

thirdBlockBottomControls.forEach((element, index) => {
    element.addEventListener('click', () => {
        bottomControls(thirdBlockSlider, thirdBlockPageNumber, thirdBlockItems, index)
    })
})

thirdBlockPrevious.addEventListener('click', () => {
    previousSlide(thirdBlockSlider, thirdBlockItems, thirdBlockPageNumber)
})

thirdBlockNext.addEventListener('click', () => {
    nextSlide(thirdBlockSlider, thirdBlockItems, thirdBlockPageNumber)
})

thirdBlockCircleSvg && thirdBlockCircleSvg.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.add('clicked')
    })
})

const scrollEvents = ['wheel', 'scroll', 'keydown']

const addScroll = () => {
    document.body.style.overflow = 'auto';
}

const preventScroll = () => {
    document.body.style.overflow = 'hidden';
    thirdBlockScrolledText.addEventListener('mouseleave', () => {
        addScroll()
    })
}

thirdBlockScrolledText && scrollEvents.forEach(item => {
    thirdBlockScrolledText.addEventListener(item, (event) => {
        event.stopPropagation()
    })
})

thirdBlockScrolledText && thirdBlockScrolledText.addEventListener('mouseenter', preventScroll)


// Fourth Block
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
    element.addEventListener('click', () => {
        const closedElement = document.querySelector('.Fourth-block .new.clicked')
        const previousElement = document.querySelector('.Fourth-block .new.previous')
        previousElement && previousElement.classList.remove('previous')
        closedElement && closedElement.classList.add('previous')
        closedElement && closedElement.classList.remove('clicked')
        element.classList.add('clicked')
    })
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


// Fifth Block
// Slider elements
const fifthBlockSlider = document.querySelector('.Fifth-block__slider')
const fifthBlockNext = document.querySelector('.Fifth-block__right-arrow')
const fifthBlockPrevious = document.querySelector('.Fifth-block__left-arrow')
const fifthBlockItems = document.querySelectorAll('.Fifth-block__slider .item')
const fifthBlockCircleSvg = document.querySelectorAll('.Fifth-block .new')
let fifthBlockPageNumber = document.querySelector('.Fifth-block__counter')

// Bottom vertical controls
const fifthBlockBottomControls = document.querySelectorAll('.Fifth-block__vertical-controls .item')

fifthBlockBottomControls.forEach((element, index) => {
    element.addEventListener('click', () => bottomControls(fifthBlockSlider, fifthBlockPageNumber, fifthBlockItems, index))
})

fifthBlockPrevious.addEventListener('click', () => previousSlide(fifthBlockSlider, fifthBlockItems, fifthBlockPageNumber)
)

fifthBlockNext.addEventListener('click', () => nextSlide(fifthBlockSlider, fifthBlockItems, fifthBlockPageNumber))

fifthBlockCircleSvg.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.add('clicked')
    })
})


// Sixth Block
const testDriveBlock = document.querySelector('.Sixth-block') || document.querySelector('.Test-drive-block')
const testDriveButton = document.querySelector('.test-drive-button')
const testDriveForm = document.querySelector('.test-drive-form')
const closeForm = document.querySelector('.close-form')
const testDriveFormButton = document.querySelector('.test-drive-form .submit')
const q7testDriveForm = document.querySelector('.test-drive-form form')
const changePage = (previous, next, layer) => {
    testDriveBlock.classList.contains(previous) && testDriveBlock.classList.remove(previous)
    testDriveBlock.classList.add(next)
    testDriveForm.style.zIndex = `${layer}`
}

testDriveBlock.classList.add('page')

testDriveButton.addEventListener('click', () => {
    changePage('page', 'form', 2)
})

closeForm.addEventListener('click', () => {
    changePage('form', 'page', -1)
})

testDriveForm.addEventListener('keydown', (event) => {
    event.stopPropagation()
})

/*
    Important!
    Need change later (may cause problem with backend).
*/
q7testDriveForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const info = {
        name: q7testDriveForm.name.value,
        surname: q7testDriveForm.surname.value,
        gender: q7testDriveForm.gender.value,
        phone: q7testDriveForm.phone.value,
        email: q7testDriveForm.email.value
    }
})


// Video Block
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


// Footer
const Footer = document.querySelector('.Footer')
const anchorLink = document.querySelector('a[href="#test-drive"]')
const blockTestDrive = document.querySelector('#test-drive')
const topPoint = blockTestDrive.offsetTop

anchorLink.addEventListener('click', (e) => {
    e.preventDefault()
    topScrolling(topPoint, 700)
    VideoBlock.classList.contains('current-page') && VideoBlock.classList.remove('current-page')
    !VideoBlock.classList.contains('previous-page') && VideoBlock.classList.add('previous-page')
    !blockTestDrive.classList.contains('current-page') && blockTestDrive.classList.add('current-page')
    blockTestDrive.classList.contains('previous-page') && blockTestDrive.classList.remove('previous-page')
})

