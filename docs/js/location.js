const ZipCode = document.getElementById('ZipCode')

document.getElementById('continue-btn').addEventListener('click', ()=> {
    return (ZipCode.value.length === 5) ? location.href='../html/home.html' : alert('Your zip code needs to be 5 digits.')
})

ZipCode.addEventListener('input', () => {
    if (ZipCode.value.length == 5) {
        ZipCode.style.color = 'green'
    }
    else {
        ZipCode.style.color = 'red'
    }
})