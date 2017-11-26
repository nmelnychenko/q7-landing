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
