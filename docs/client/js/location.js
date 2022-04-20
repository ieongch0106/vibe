const ZipCode = document.getElementById('ZipCode')

const ls = window.localStorage;
const lsGet = (k) => ls.getItem(k);

document.getElementById('continue-btn').addEventListener('click', ()=> {
    return (ZipCode.value.length === 5) ? addZipCode() : alert('Your zip code needs to be 5 digits.')
})

ZipCode.addEventListener('input', () => {
    if (ZipCode.value.length == 5) {
        ZipCode.style.color = 'green'
    }
    else {
        ZipCode.style.color = 'red'
    }
})

async function addZipCode() {
    const id = JSON.parse(lsGet('user')).id
    const zc = ZipCode.value
    await fetch(`/user/profile/zipcode/new?id=${id}&zipcode=${zc}`, {
        method: 'POST'
    }).then(response => response.json())
    .then(data => {
        if (data.Status === 'Success') {
            console.log(JSON.stringify(data.Status))
            location.href = 'home.html'
        } else {
            alert(JSON.stringify(data))
        }
    }).catch(error => {
        console.log(error)
    })
}