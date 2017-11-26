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