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
