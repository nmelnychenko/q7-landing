const secondBlockVideo = document.querySelector('.Test-drive-block .video-container video')
const secondBlockInnerCircle = document.querySelector('.Test-drive-block .video-container .inner-circle')

secondBlockInnerCircle.classList.add('active')

secondBlockInnerCircle.addEventListener('click', () => {
    secondBlockInnerCircle.classList.contains('active') ? (
        secondBlockVideo.play(),
        secondBlockInnerCircle.classList.remove('active')
    ) : (
        secondBlockVideo.pause(),
        secondBlockInnerCircle.classList.add('active')
    )
})
