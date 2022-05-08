const partiesClass = document.getElementsByClassName("parties");
const sbar = document.getElementById("sbar");
const sbutton  =  document.getElementById("searchbar");

async function displayPartiesS() {
    await fetch(`/search`, {
        method: 'GET'
    }).then(response => response.json())
    .then(data => {
        // console.log(data);
        const parties = data;
        // console.log(parties);
        const numElem = parties.length > 5 ? 5 : parties.length;
        for (let i = 0; i < parties.length; ++i) {
            if(parties[i].name === sbar.value){
                const li = document.createElement('li');
                const text = document.createTextNode(parties[i].name);
                li.appendChild(text);
                partiesClass[0].appendChild(li)
            }
        }
    }).catch(error => {
        console.log(error)
    })
  
}
sbutton.addEventListener("click", displayPartiesS);
// sbutton.addEventListener("click", () => {console.log(sbar.value);});
