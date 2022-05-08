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
            console.log(data[data.length-1].username);
            username1.textContent = data[data.length-1].username;
            name1.textContent  = data[data.length-1].username;
            email.textContent = data[data.length-1].email;
            zipcode.textContent = data[data.length-1].zipcode;
            
        }).catch(error => {
            console.log(error)
        })
}

displayUsers();

