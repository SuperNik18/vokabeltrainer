let Stufe1 = JSON.parse(localStorage.getItem('Stufe1')) || [];
let Stufe2 = JSON.parse(localStorage.getItem('Stufe2')) || [];
let Stufe3 = JSON.parse(localStorage.getItem('Stufe3')) || [];
let Stufe4 = JSON.parse(localStorage.getItem('Stufe4')) || [];
let Stufe5 = JSON.parse(localStorage.getItem('Stufe5')) || [];
let Stufe6 = JSON.parse(localStorage.getItem('Stufe6')) || [];
let StufeG = JSON.parse(localStorage.getItem('StufeG')) || [];

window.onload = function (){
    waehleHeutigeVokabeln();
}

function waehleHeutigeVokabeln(){
    let heutigeVokabeln = [];

    // Durchlaufen jeder Stufe und Filtern der Vokabeln basierend auf der Anzahl der Tage in der Stufe
    Stufe1.forEach(vokabel => {
        heutigeVokabeln.push(vokabel);
    });

    Stufe2.forEach(vokabel => {
        const eintragDatum = new Date(vokabel.eintragDatum);
        const tageInStufe = Math.floor((new Date() - eintragDatum) / (1000 * 60 * 60 * 24));
        if (tageInStufe >= 1) {
            heutigeVokabeln.push(vokabel);
        }
    });

    Stufe3.forEach(vokabel => {
        const eintragDatum = new Date(vokabel.eintragDatum);
        const tageInStufe = Math.floor((new Date() - eintragDatum) / (1000 * 60 * 60 * 24));
        if (tageInStufe >= 2) {
            heutigeVokabeln.push(vokabel);
        }
    });

    Stufe4.forEach(vokabel => {
        const eintragDatum = new Date(vokabel.eintragDatum);
        const tageInStufe = Math.floor((new Date() - eintragDatum) / (1000 * 60 * 60 * 24));
        if (tageInStufe >= 6) {
            heutigeVokabeln.push(vokabel);
        }
    });

    Stufe5.forEach(vokabel => {
        const eintragDatum = new Date(vokabel.eintragDatum);
        const tageInStufe = Math.floor((new Date() - eintragDatum) / (1000 * 60 * 60 * 24));
        if (tageInStufe >= 20) {
            heutigeVokabeln.push(vokabel);
        }
    });

    Stufe6.forEach(vokabel => {
        const eintragDatum = new Date(vokabel.eintragDatum);
        const tageInStufe = Math.floor((new Date() - eintragDatum) / (1000 * 60 * 60 * 24));
        if (tageInStufe >= 70) {
            heutigeVokabeln.push(vokabel);
        }
    });

    StufeG.forEach(vokabel => {
        const eintragDatum = new Date(vokabel.eintragDatum);
        const tageInStufe = Math.floor((new Date() - eintragDatum) / (1000 * 60 * 60 * 24));
        if (tageInStufe >= 70) {
            heutigeVokabeln.push(vokabel);
        }
    });

    // Auswahl von maximal 30 Vokabeln
    if (heutigeVokabeln.length > 30) {
        heutigeVokabeln = selectRandomVokabeln(heutigeVokabeln, 30);
    }

    // Speichern der heutigen Vokabeln in localStorage
    localStorage.setItem('heutigeVokabeln', JSON.stringify(heutigeVokabeln));

    // Aktualisierung der Anzahl der Vokabeln im Button und Deaktivierung, falls keine Vokabeln vorhanden sind
    const vokabelCountElement = document.getElementById('vokabelCount');
    const regulaereAbfrageBtn = document.getElementById('regulaereAbfrageBtn');

    if (heutigeVokabeln.length === 0) {
        vokabelCountElement.textContent = '0';
        regulaereAbfrageBtn.disabled = true;
        regulaereAbfrageBtn.style.backgroundColor = 'lightgrey';
    } else {
        vokabelCountElement.textContent = heutigeVokabeln.length;
        regulaereAbfrageBtn.disabled = false;
        regulaereAbfrageBtn.style.backgroundColor = 'orange';
    }

    console.log(heutigeVokabeln);
}

function selectRandomVokabeln(vokabeln, count) {
    const shuffled = vokabeln.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

