
const username = document.getElementById('username');
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
            const user_data = date;
            username.textContent = user_data.id;
            name1.textContent  = user_data.id;
            zipcode.textContent = user_data.zipcode;
            
        }).catch(error => {
            console.log(error)
        })
}

displayUsers();





 