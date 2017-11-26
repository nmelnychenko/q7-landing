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
