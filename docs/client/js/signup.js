const username = document.getElementById('floatingInput')
const password = document.getElementById('floatingPassword')
const signup = document.getElementById('signup-btn')

const ls = window.localStorage;
const lsSet = (k, v) => ls.setItem(k, v);

signup.addEventListener('click', ()=>addUser());

async function addUser() {
    const id = username.value;
    const pw = password.value;
    await fetch(`/user/register?id=${id}&password=${pw}`, {
        method: "POST"
    }).then(response => response.json())
    .then(data => {
        if (data.Status === 'Success') {
            alert(JSON.stringify(data.Status))
            location.href='location.html'
            lsSet('user', JSON.stringify( {'id': id} ))
        } else {
            alert(JSON.stringify(data))
        }
    }).catch(error => {
        console.log(error)
    })
}
