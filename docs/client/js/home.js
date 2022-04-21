const partiesClass = document.getElementsByClassName("parties");
let parties = undefined;

async function displayParties() {
    await fetch(`/home`, {
        method: 'GET'
    }).then(response => response.json())
        .then(data => {
            // console.log(data);
            parties = data;
            // console.log(parties);
            const numElem = parties.length > 5 ? 5 : parties.length;
            for (let i = 0; i < numElem; ++i) {
                const li = document.createElement('li');
                const text = document.createTextNode(parties[i].name);
                li.appendChild(text);
                partiesClass[0].appendChild(li)
            }
        }).catch(error => {
            console.log(error)
        })
}

displayParties();
// console.log(parties);

// partiesClass[0].textContent = parties[0].name;