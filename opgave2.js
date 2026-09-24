/* Byg en dynamisk indkøbsliste hvor brugere kan tilføje og fjerne varer samt sortere dem efter både pris og navn. Gem varerne i et array og udskriv den aktuelle liste på siden. Beregn og vis også den samlede pris dynamisk.*/

//Opretter vare class med parameter
class vare{
    constructor(navn, pris, antal){
        this.navn = navn, 
        this.pris = pris,
        this.antal = antal
}};

const indkøbsliste = document.querySelector("#indkøbsliste");
//Vi skal have et array som tager brugerens input og gemmer dem.
const varer = [];

//Vi skal have en funktion sådan at brugeren kan tilføje varer til listen.
//tilføjer en eventlistener som lytter efter tryk på knap input.
vareInput.addEventListener("submit", function(event){
    event.preventDefault();

    //querySelector til at fange felter i DOM.
    const navn = document.querySelector("#navn").value
    const pris = Number(document.querySelector("#pris").value);
    const antal = Number(document.querySelector("#antal").value);

    //Opretter en ny vare.
    const nyVare = new vare(navn, pris, antal);
    //ligger varen ind sidst i arrayet
    varer.push(nyVare);
    //kald funktionen.
    showIndkøbsliste();
});

//vi skal have en funktion som sorterer varerne efter navn og pris. og antal for good measure I guess.

//Sorterings funktion som kan sorterer efter navn, pris og antal i stiegende. 
//sort funktion tager parameteren input og tjekker om det er lig med navn, pris eller antal den skal sortere efter
function sort(input) {
    if (input === "navn") {
    varer.sort((i, j) => {
        if (i.navn < j.navn) {
            return -1;
        }

        if (i.navn > j.navn) {
            return 1;
        }
        return 0;
    });
    }
 //i faldende rækkefølge
    if(input ==="pris"){
        varer.sort((i, j) => j.pris - i.pris);
    }

    if(input ==="antal"){
        varer.sort((i, j) => j.antal - i.antal)
    }
    showIndkøbsliste();
}

//funktioner til at tilføje og fjerne varer
function deleteVare(i){
    varer.splice(i, 1);
    showIndkøbsliste();
}
//tager vare index og ligger en til antal parameteren og opdaterer indkøbdslisten
function addVare(i){
    varer[i].antal++;
    showIndkøbsliste();
}
//tager vare index og trækker en fra antal parameteren og opdaterer indkøbdslisten
function fjernVare(i){
    if(varer[i].antal > 0) {
        varer[i].antal--;
    };
    showIndkøbsliste();
}

//vi skal have en måde at indkøbslisten  og dens array elementer.
function showIndkøbsliste(){
    //siger essentielt clear html i dette tilfælde li og total prisen.
    indkøbsliste.innerHTML = "";

    //kører igennem varer array og laver et li for hvert element.
    for(let i = 0; i <varer.length; i++) {
        const li = document.createElement("li");

        li.textContent ="vare: " + varer[i].navn + " antal " + varer[i].antal + "  " + varer[i].pris + " kr"

        //Knap som kalder på addVare funktion
        const plusKnap = document.createElement("button");
        plusKnap.textContent = "+";
        plusKnap.addEventListener("click", function () {
            addVare(i);
        });
        //Knap som kalder på fjernVare funktion
        const minusKnap = document.createElement("button");
        minusKnap.textContent = "-";
        minusKnap.addEventListener("click", function () {
            fjernVare(i);
        });
        //Knap som kalder på deleteVare funktion
        const sletKnap = document.createElement("button");
        sletKnap.textContent = "Slet";
        sletKnap.addEventListener("click", function () {
            deleteVare(i);
        });

        li.appendChild(plusKnap);
        li.appendChild(minusKnap);
        li.appendChild(sletKnap);
        indkøbsliste.appendChild(li);
    }

    //vi skal have en funktion som beregner den totale pris af arrayet.
    const totalPris = varer.reduce((total, nuværendeVare) => {
        //
    return total + nuværendeVare.pris * nuværendeVare.antal;
    },0);

    const totalPrisContainer = document.createElement("div");
    totalPrisContainer.className = "totalPris";
    totalPrisContainer.textContent = "Total pris: " + totalPris.toFixed(2) + " kr."

    indkøbsliste.appendChild(totalPrisContainer);
}




