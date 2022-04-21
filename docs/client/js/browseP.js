
const explore = document.getElementsByClassName("parties");

async function displayParties() {
    await fetch(`/home`, {
        method: 'GET'
    }).then(response => response.json())
        .then(data => {
            // console.log(data);
            const parties = data;
            // console.log(parties);
            const numElem = parties.length > 5 ? 5 : parties.length;
            for (let i = 0; i < numElem; ++i) {
                const li = document.createElement('li');
                const text = document.createTextNode(parties[i].name);
                li.appendChild(text);
                explore[0].appendChild(li)
            }
        }).catch(error => {
            console.log(error)
        })
}

displayParties(); 
