const partiesClass = document.getElementsByClassName("parties");
const sbar = document.getElementById("sbar");
const sbutton  =  document.getElementById("searchbar");

async function displayPartiesS() {
    await fetch(`/search?name=${sbar.value}`, {
        method: 'GET'
    }).then(response => response.json())
    .then(data => {
        document.getElementById("heading-search").textContent = "Parties that name '" + sbar.value + "'";
        partiesClass[0].innerHTML = "";
        // console.log(data);
        const parties = data;
        // console.log(parties);
        const numElem = parties.length > 10 ? 10 : parties.length;
        for (let i = 0; i < parties.length; ++i) {
            if(parties[i].name === sbar.value){
                const li = document.createElement('li');
                const text = document.createTextNode(parties[i].name + " - " + parties[i].description);
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
