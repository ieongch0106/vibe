
const username1 = document.getElementById('username');
const email = document.getElementById("email");
const name1 = document.getElementById("name");
const zipcode = document.getElementById("zipcode");
const ph1 = document.getElementById("PH1");
const ph2 = document.getElementById("PH2");
const ph3 = document.getElementById("PH3");
const ph4 = document.getElementById("PH4");
const USER_FILE = './database/user.json'

const ls = window.localStorage;
const lsGet = (k) => ls.getItem(k);

const lsSet = (k, v) => ls.setItem(k, v);

// signin.addEventListener('click', ()=>verify())

async function displayUsers() {
    await fetch(`/myinfo`, {
        method: 'GET'
    }).then(response => response.json())
        .then(data => {
            console.log(data[0].username);
            username1.textContent = data[0].username;
            name1.textContent  = data[0].username;
            email.textContent = data[0].email;
            zipcode.textContent = data[0].zipcode;
            
        }).catch(error => {
            console.log(error)
        })
}

displayUsers();





 