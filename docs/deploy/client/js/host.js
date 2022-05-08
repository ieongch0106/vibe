const name = document.getElementById('name');
const zip = document.getElementById('zip');
const description = document.getElementById('description');

document.getElementById('submit-btn').addEventListener('click', () => addUser());

async function addUser() {
    const n = name.value;
    const z = zip.value;
    const d = description.value
    if (n !== "", z !== "", d !== "") {
        await fetch(`/user/host?name=${n}&zip=${z}&description=${d}`, {
            method: "POST"
        }).then(response => response.json())
            .then(data => {
                if (data.Status === 'Success') {
                    console.log(JSON.stringify(data.Status))
                    location.href = 'home.html'
                    lsSet('user', JSON.stringify({ 'id': id }))
                } else {
                    alert(JSON.stringify(data.Error))
                }
            }).catch(error => {
                console.log(error)
            })
    }
    else {
        alert("None of the fields can be empty.");
    }
}
