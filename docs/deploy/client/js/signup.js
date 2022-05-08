const username = document.getElementById('username')
const password = document.getElementById('password')
const signup = document.getElementById('signup-btn')

const ls = window.localStorage;
const lsSet = (k, v) => ls.setItem(k, v);
signup.addEventListener('submit', lsSet('user', JSON.stringify( {'id': document.getElementById('username').value} )));

// async function addUser() {
//     const id = username.value;
//     const pw = password.value;
//     if (pw.length >= 8) {
//         await fetch(`/user/register?id=${id}&password=${pw}`, {
//             method: "POST"
//         }).then(response => response.json())
//         .then(data => {
//             if (data.Status === 'Success') {
//                 console.log(JSON.stringify(data.Status))
//                 location.href='location.html'
//                 lsSet('user', JSON.stringify( {'id': id} ))
//             } else {
//                 alert(JSON.stringify(data.Error))
//             }
//         }).catch(error => {
//             console.log(error)
//         })
//     } else {
//         alert('Your password should contain at least 8 characters!')
//     }
// }
