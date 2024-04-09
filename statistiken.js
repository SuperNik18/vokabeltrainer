const neugelernteVokabeln = JSON.parse(localStorage.getItem('selectedVocab')) || [];
let Stufe1 = JSON.parse(localStorage.getItem('Stufe1')) || [];
const reguläreAbfrage = JSON.parse(localStorage.getItem('reguläreAbfrage')) || [];
let Stufe2 = JSON.parse(localStorage.getItem('Stufe2')) || [];
let Stufe3 = JSON.parse(localStorage.getItem('Stufe3')) || [];
let Stufe4 = JSON.parse(localStorage.getItem('Stufe4')) || [];
let Stufe5 = JSON.parse(localStorage.getItem('Stufe5')) || [];
let Stufe6 = JSON.parse(localStorage.getItem('Stufe6')) || [];
let StufeG = JSON.parse(localStorage.getItem('StufeG')) || [];
const orangenesRechteck = document.getElementById('orangenesRechteck');
const anzahlText = document.getElementById('anzahlText');
const orangenesRechteck2 = document.getElementById('orangenesRechteck2');
const anzahlText2 = document.getElementById('anzahlText2');
const gesamtVokabeln = 250;
// Um zu verfolgen, ob die Funktion aktualisiereStatistik2 bereits aufgerufen wurde
let aktualisiereStatistik2WurdeAufgerufen = localStorage.getItem('aktualisiereStatistik2WurdeAufgerufen') === 'true';

window.onload = function () {
    ladeStufe1();
    ladeStufe2();
    ladeStufe3();
    ladeStufe4();
    ladeStufe5();
    ladeStufe6();
    ladeStufeG();
    console.log(Stufe1); 
    console.log(Stufe2);
    console.log(Stufe3);
    console.log(Stufe4);
    console.log(Stufe5);
    console.log(Stufe6);
}


// Laden der Daten aus dem Local Storage und Aktualisierung der Anzeige für Stufe 1
function ladeStufe1() {
    Stufe1 = JSON.parse(localStorage.getItem('Stufe1')) || [];
    const verhältnis1 = Stufe1.length / gesamtVokabeln;
    const orangeneHöhe1 = verhältnis1 * 100;

    document.getElementById('anzahlText').textContent = Stufe1.length;
    document.getElementById('orangenesRechteck').style.height = `${orangeneHöhe1}%`;
}

// Laden der Daten aus dem Local Storage und Aktualisierung der Anzeige für Stufe 2
function ladeStufe2() {
    Stufe2 = JSON.parse(localStorage.getItem('Stufe2')) || [];
    const verhältnis2 = Stufe2.length / gesamtVokabeln;
    const orangeneHöhe2 = verhältnis2 * 100;

    document.getElementById('anzahlText2').textContent = Stufe2.length;
    document.getElementById('orangenesRechteck2').style.height = `${orangeneHöhe2}%`;
}
function ladeStufe3() {
    const verhältnis3 = Stufe3.length / gesamtVokabeln;
    const orangeneHöhe3 = verhältnis3 * 100;

    document.getElementById('anzahlText3').textContent = Stufe3.length;
    document.getElementById('orangenesRechteck3').style.height = `${orangeneHöhe3}%`;
}
function ladeStufe4() {
    const verhältnis4 = Stufe4.length / gesamtVokabeln;
    const orangeneHöhe4 = verhältnis4 * 100;

    document.getElementById('anzahlText4').textContent = Stufe4.length;
    document.getElementById('orangenesRechteck4').style.height = `${orangeneHöhe4}%`;
}

function ladeStufe5() {
    const verhältnis5 = Stufe5.length / gesamtVokabeln;
    const orangeneHöhe5 = verhältnis5 * 100;

    document.getElementById('anzahlText5').textContent = Stufe5.length;
    document.getElementById('orangenesRechteck5').style.height = `${orangeneHöhe5}%`;
}

function ladeStufe6() {
    const verhältnis6 = Stufe6.length / gesamtVokabeln;
    const orangeneHöhe6 = verhältnis6 * 100;

    document.getElementById('anzahlText6').textContent = Stufe6.length;
    document.getElementById('orangenesRechteck6').style.height = `${orangeneHöhe6}%`;
}

function ladeStufeG() {
    const verhältnisG = StufeG.length / gesamtVokabeln;
    const orangeneHöheG = verhältnisG * 100;

    document.getElementById('anzahlTextG').textContent = StufeG.length;
    document.getElementById('orangenesRechteckG').style.height = `${orangeneHöheG}%`;
}
const referrer = document.referrer;
if (referrer.endsWith('vokabelabfrage.html') || referrer.endsWith('vokabelabfrageE.html')) {
    aktualisiereStatistik1();
}
if (referrer.endsWith('regulaereAbfrage.html') && aktualisiereStatistik2WurdeAufgerufen == false) {
    aktualisiereStatistik2();
    aktualisiereStatistik2WurdeAufgerufen = true;
    localStorage.setItem('aktualisiereStatistik2WurdeAufgerufen', aktualisiereStatistik2WurdeAufgerufen);
}
function aktualisiereStatistik1() {
    const neueVokabeln = neugelernteVokabeln.filter(vokabel => !Stufe1.find(entry => JSON.stringify(entry) === JSON.stringify(vokabel)));
    Stufe1 = Stufe1.concat(neueVokabeln);
    localStorage.setItem('Stufe1', JSON.stringify(Stufe1)); // Speichere die aktualisierte Stufe 1 im localStorage
}

function aktualisiereStatistik2() {
    const eintragDatum = new Date().toISOString().slice(0, 10);

    for (const wort of reguläreAbfrage) {
        if (findVokabelInArray(wort, Stufe1)) {
            Stufe2.push({ ...wort, eintragDatum }); // Eintragungsdatum setzen
            const index = Stufe1.findIndex(entry => JSON.stringify(entry) === JSON.stringify(wort));
            if (index !== -1) {
                Stufe1.splice(index, 1);
            }
        } else if (findVokabelInArray(wort, Stufe2)) {
            Stufe3.push({ ...wort, eintragDatum }); // Eintragungsdatum setzen
            const index = Stufe2.findIndex(entry => JSON.stringify(entry) === JSON.stringify(wort));
            if (index !== -1) {
                Stufe2.splice(index, 1);
            }
        } else if (findVokabelInArray(wort, Stufe3)) {
            Stufe4.push({ ...wort, eintragDatum }); // Eintragungsdatum setzen
            const index = Stufe3.findIndex(entry => JSON.stringify(entry) === JSON.stringify(wort));
            if (index !== -1) {
                Stufe3.splice(index, 1);
            }
        } else if (findVokabelInArray(wort, Stufe4)) {
            Stufe5.push({ ...wort, eintragDatum }); // Eintragungsdatum setzen
            const index = Stufe4.findIndex(entry => JSON.stringify(entry) === JSON.stringify(wort));
            if (index !== -1) {
                Stufe4.splice(index, 1);
            }
        } else if (findVokabelInArray(wort, Stufe5)) {
            Stufe6.push({ ...wort, eintragDatum }); // Eintragungsdatum setzen
            const index = Stufe5.findIndex(entry => JSON.stringify(entry) === JSON.stringify(wort));
            if (index !== -1) {
                Stufe5.splice(index, 1);
            }
        } else if (findVokabelInArray(wort, Stufe6)) {
            StufeG.push({ ...wort, eintragDatum }); // Eintragungsdatum setzen
            const index = Stufe6.findIndex(entry => JSON.stringify(entry) === JSON.stringify(wort));
            if (index !== -1) {
                Stufe6.splice(index, 1);
            }
        }
    }

    localStorage.setItem('Stufe1', JSON.stringify(Stufe1));
    localStorage.setItem('Stufe2', JSON.stringify(Stufe2));
    localStorage.setItem('Stufe3', JSON.stringify(Stufe3));
    localStorage.setItem('Stufe4', JSON.stringify(Stufe4)); 
    localStorage.setItem('Stufe5', JSON.stringify(Stufe5)); 
    localStorage.setItem('Stufe6', JSON.stringify(Stufe6)); 
    localStorage.setItem('StufeG', JSON.stringify(StufeG)); 
    localStorage.setItem('Stufe2Anzahl', Stufe2.length);
    console.log(Stufe2);
    ladeStufe1();
    ladeStufe2();
    ladeStufe3();
    ladeStufe4(); 
    ladeStufe5(); 
    ladeStufe6(); 
    ladeStufeG(); 
}


// Funktion zur Überprüfung, ob die Vokabel im Array vorhanden ist
function findVokabelInArray(vokabel, array) {
    return array.some(entry => JSON.stringify(entry) === JSON.stringify(vokabel));
}

//localStorage.clear();

