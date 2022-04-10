import { readFile, writeFile } from 'fs/promises';

const username = document.getElementById('floatingInput')
const password = document.getElementById('floatingPassword')
const signup = document.getElementById('signup-btn')

const JSONfile = '../database/user.json'

let user_data = [
    // { 
        //     'id': 'aaa@gmail.com'
        //     'password': '12345678'
        // }
    ]
    
signup.addEventListener('click', ()=>verify())

async function verify() {
    user_data = await readFile(JSONfile, { encoding: 'utf8' });
    const name = username.value
    const pw = password.value
    if (pw.length < 8) {
        alert('Password should contain at least 8 chacters')
    } else {
       return !userExist(name) ? addUser(name, pw) : alert('Username has already been taken')
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

//add user to 'user.json'
function addUser(username, password) {
    //add
    location.href='location.html'
}