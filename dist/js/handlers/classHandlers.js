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
    const events = ['wheel', 'scroll', 'keydown']
    const animationTime = 1000
    let freezer
    let flag = true

    const freezeEvents = (event) => {
        event.preventDefault()
        if (flag) {
            move(event)
            flag = !flag
        }

        freezer && clearTimeout(freezer)

        freezer = setTimeout(() => {
            flag = !flag
        }, animationTime / 2)
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
