// import { readFile, writeFile } from 'fs/promises';

const username = document.getElementById('floatingInput')
const password = document.getElementById('floatingPassword')
const signin = document.getElementById('signin-btn')

const JSONfile = '../database/user.json'

let user_data = [
    // { 
    //     'id': 'aaa',
    //     'password': '12345678'
    // }
]

signin.addEventListener('click', ()=>verify())


async function verify() {
    // user_data = await readFile(JSONfile, { encoding: 'utf8' });
    const name = username.value
    const pw = password.value
    if (userExist(name)) {
        return verifyPassword(name, pw) ? location.href='home.html' : alert('The password you entered is incorrect') 
    }
    else {
        alert('Username not found')
    }
}

function userExist(username) {
    for (const user of user_data) {
        if (user.id === username) {
            return true
        }
    }
    return false
}

function verifyPassword(username, password) {
    for (const user of user_data) {
        if (user.id === username) {
            return (user.password === password) ? true : false 
        }
    }
}