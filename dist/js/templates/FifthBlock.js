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
