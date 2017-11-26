// Header

// Wrapper
const header_slider = document.querySelector('.slider')

// Controls
const controls_collection = document.querySelectorAll('.control')

// Items
const items_collection = document.querySelectorAll('.car')

items_collection[0].classList.add('active')
controls_collection[0].classList.add('cls-2')

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

function handler(element, control, shift) {
    if (!control.classList.contains('cls-2')) {
        function changeSlide() {
            element.classList.add('active')
            control.classList.add('cls-2')
            header_slider.style.marginLeft = shift
        }

        removeHideClass()
        hideActiveItem()
        setTimeout(changeSlide, 900)
    }
}

controls_collection.forEach((current_control, index) => {
    current_control.addEventListener('click', () => {
        handler(items_collection[index], current_control, `${index*(-100)}vw`)
    })
})

function runAnimation() {
    const index = document.querySelector('.car.active').dataset.index

    handler(items_collection[index], controls_collection[index], `${index*(-100)}vw`)
}

setInterval(runAnimation, 8000)
