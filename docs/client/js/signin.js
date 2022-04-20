const username = document.getElementById('floatingInput')
const password = document.getElementById('floatingPassword')
const signin = document.getElementById('signin-btn')

const ls = window.localStorage;
const lsSet = (k, v) => ls.setItem(k, v);

signin.addEventListener('click', ()=>verify())

async function verify() {
    const id = username.value
    const pw = password.value
    await fetch(`/login?id=${id}&password=${pw}`, {
        method: 'GET'
    }).then(response => response.json())
    .then(data => {
        if (data.Status === 'Success') {
            alert(JSON.stringify(data.Status))
            location.href='html/home.html'
            lsSet('user', JSON.stringify( {'id': id} ))
        } else {
            alert(JSON.stringify(data))
        }
    }).catch(error => {
        console.log(error)
    })
}
