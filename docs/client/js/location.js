const ZipCode = document.getElementById('ZipCode')

const ls = window.localStorage;
const lsGet = (k) => ls.getItem(k);
const lsSet = (k, v) => ls.setItem(k, v);
// alert(JSON.parse(lsGet('user')).id)
console.log(ls)
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
    const id = JSON.parse(lsGet('username'))
    console.log(id)
    lsSet('zipcode', JSON.stringify(ZipCode.value))
    const zc = ZipCode.value
    await fetch(`/user/profile/zipcode/new?username=${id}&zipcode=${zc}`, {
        method: 'POST'
    }).then(response => response.json())
    .then(data => {
        if (data.Status === 'Success') {
            location.href = 'home.html'
        } else {
            alert(JSON.stringify(data))
        }
    }).catch(error => {
        console.log(error)
    })
}