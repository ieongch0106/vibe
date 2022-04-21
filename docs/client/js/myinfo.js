
const username = document.getElementById('username');
const email = document.getElementById("email");
const name = document.getElementById("name");
const zipcode = document.getElementById("zipcode");
const ph1 = document.getElementById("PH1");
const ph2 = document.getElementById("PH2");
const ph3 = document.getElementById("PH3");
const ph4 = document.getElementById("PH4");
const USER_FILE = './database/user.json'

const ls = window.localStorage;
const lsGet = (k) => ls.getItem(k);

// async function showProfile(){
//     const id = JSON.parse(lsGet('user')).id;
//     //let arr = readUserFile();
//     // Create functions for reading from files.
    

// }





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
            console.log(JSON.stringify(data.Status))
            location.href='html/home.html'
            lsSet('user', JSON.stringify( {'id': id} ))
        } else {
            alert(JSON.stringify(data.Error))
        }
    }).catch(error => {
        console.log(error)
    })
}




 