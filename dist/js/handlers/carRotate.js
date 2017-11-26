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
