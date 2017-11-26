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
