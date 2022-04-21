const partyname = document.getElementById('basic-addon1');
const partyhost = document.getElementById('basic-addon1');
const partytheme = document.getElementById('basic-addon1');
const newdiv = document.createElement('div');
const songSuggest = document.getElementById('songList');
const submit = document.getElementById('submit');


const ls = window.localStorage;
const lsSet = (k, v) => ls.setItem(k, v);

submit.addEventListener('click', ()=>addSong());

async function addSong() {
    if (pw.length >= 8) {
        await fetch(`/user/register?id=${id}&password=${pw}`, {
            method: "POST"
        }).then(response => response.json())
        .then(data => {
            if (data.Status === 'Success') {
                console.log(JSON.stringify(data.Status))
                location.href='location.html'
                lsSet('user', JSON.stringify( {'id': id} ))
                const songchoice = document.createTextNode(JSON.stringify(data));
                await fetch(`https://api.spotify.com/v1/tracks/{id}`, {
                    method: "GET"
                }).then(data1 => {
                    if(data1 === songchoice.value){
                        newdiv.appendChild(songchoice);
                        document.body.insertBefore(newDiv, songSuggest);
                    }else{
                        alert('Song Does not Exist!')
                    }
                })

            } else {
                alert(JSON.stringify(data.Error))
            }
        }).catch(error => {
            console.log(error)
        })
    } else {
        alert('Song Does not Exist!')
    }
}
