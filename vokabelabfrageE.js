const selectedVocabelnE = JSON.parse(localStorage.getItem('selectedVocabelnE')) || [];
console.log('In selectedVokabelnE gespeichert:', selectedVocabelnE);
let currentQuestionIndex = 0;
let wrongAnswers = []; // Liste für falsch beantwortete Vokabeln
let skippedAnswers = []; // Liste für übersprungene Vokabeln
// Zähler für geübte Vokabeln und Gesamtzahl der Vokabeln
let practicedVocabCount = 0;
const totalVocabCount = selectedVocabelnE.length;
let selectedVocab = [];
let selectedVocabeln = [];
// Grauen Balken für den Gesamtfortschritt
const grauerBalken = document.querySelector('.balken-grau');

// Orangen Balken für den individuellen Fortschritt
const orangerBalken = document.querySelector('.balken-orange');

// Funktion, um den orangefarbenen Balken zu aktualisieren und das Popup3 anzuzeigen
function updateOrangerBalken() {
    // Prozentsatz des Fortschritts berechnen
    const progressPercentage = (practicedVocabCount / totalVocabCount) * 90; // Maximal 90%
    // Breite des orangefarbenen Balkens entsprechend anpassen
    orangerBalken.style.width = `${progressPercentage}%`;

    // Überprüfen, ob alle Vokabeln geübt wurden
    if (progressPercentage >= 90) {
        popup3.classList.add('open-popup3'); // Alle Vokabeln wurden gelernt, zeige Abschluss-Popup
    }
}

function zeigeFrage() {
    popup.classList.remove('open-popup');
    popup2.classList.remove('open-popup2');
    const deutschElement = document.getElementById('deutsch');
    deutschElement.innerText = selectedVocabelnE[currentQuestionIndex].deutsch; // Anzeigen der deutschen Vokabel
    document.getElementById('antwort').value = ''; // Zurücksetzen der Eingabe
    document.getElementById('question').style.display = 'block';
    document.getElementById('antwort').focus(); // Fokussiere das Textfeld für die Eingabe
}

document.addEventListener('keydown', function(event) {
    // Überprüfen, ob eines der Popups geöffnet ist
    const popup1IsOpen = popup.classList.contains('open-popup');
    const popup2IsOpen = popup2.classList.contains('open-popup2');
    const popup3IsOpen = popup3.classList.contains('open-popup3');
    
    // Wenn keines der Popups geöffnet ist und die Entertaste gedrückt wird, führe die Enter-Tasten-Funktionalität aus
    if (!popup1IsOpen && !popup2IsOpen && !popup3IsOpen && event.key === "Enter") {
        pruefen(); // Funktion pruefen() aufrufen, wenn die Entertaste gedrückt wird
    }
});

function pruefen() {
    const antwort = document.getElementById('antwort').value.trim().toLowerCase();
    const uebersetzung = selectedVocabelnE[currentQuestionIndex].uebersetzung.toLowerCase();
    if (antwort === uebersetzung) {
        popup.classList.add('open-popup');
        if (!wrongAnswers.includes(selectedVocabelnE[currentQuestionIndex])) {
            if (!skippedAnswers.includes(selectedVocabelnE[currentQuestionIndex])) {
                vokabelGeuebt(); // Vokabel als geübt markieren, wenn sie beim ersten Mal richtig beantwortet wurde und nicht übersprungen wurde
            }
        }
    } else if (!skippedAnswers.includes(selectedVocabelnE[currentQuestionIndex])) { // Hinzufügen der Bedingung, um sicherzustellen, dass die Vokabel nicht als übersprungen markiert wurde
        popup2.classList.add('open-popup2');
        //Das richtige Übersetzungswort im Popup anzeigen
        const uebersetzungAnzeige = document.getElementById('uebersetzung');
        uebersetzungAnzeige.innerText = uebersetzung;
        if (!wrongAnswers.includes(selectedVocabelnE[currentQuestionIndex])) {
            wrongAnswers.push(selectedVocabelnE[currentQuestionIndex]); // Falsche Antwort zur Liste hinzufügen, wenn sie beim ersten Mal falsch beantwortet wurde
        }
    }
}

function zeigeFalscheVokabeln() {
    popup.classList.remove('open-popup');
    popup2.classList.remove('open-popup2');
    currentQuestionIndex = 0; // Setze den Index für falsche Vokabeln zurück
    selectedVocabelnE.splice(0, selectedVocabelnE.length, ...wrongAnswers); // Ersetze die Hauptliste mit den falschen Antworten
    wrongAnswers = []; // Setze die Liste der falschen Antworten zurück
    zeigeFrage(); // Beginne die Abfrage der falschen Vokabeln erneut
}

function naechsteFrage() {
    currentQuestionIndex++;
    while (skippedAnswers.includes(selectedVocabelnE[currentQuestionIndex])) {
        currentQuestionIndex++; // Überspringe Vokabeln, die als "Gelten lassen" markiert wurden
    }
    if (currentQuestionIndex < selectedVocabelnE.length) {
        zeigeFrage(); // Zeige die nächste Frage
    } else {
        if (wrongAnswers.length > 0) {
            zeigeFalscheVokabeln(); // Wenn falsche Vokabeln vorhanden sind, zeige sie erneut
        } else {
            updateOrangerBalken(); // Überprüfen, ob das Popup3 angezeigt werden soll
        }
    }
}

function geltenlassen() {
    skippedAnswers.push(selectedVocabelnE[currentQuestionIndex]); // Markiere die aktuelle Vokabel als übersprungen
    currentQuestionIndex++; // Index für die nächste Frage erhöhen
    if (currentQuestionIndex < selectedVocabelnE.length) { // Überprüfen, ob es noch weitere Fragen gibt
        popup2.classList.remove('open-popup2');
        zeigeFrage(); // Nächste Frage anzeigen
    } else {
        popup2.classList.remove('open-popup2');
        naechsteFrage(); // Springe zur nächsten Frage
    }
    vokabelGeuebt();
}

function zurueck() {
    popup2.classList.remove('open-popup2');
    document.getElementById('antwort').value = '';
}

function Startseite() {
    popup3.classList.remove('open-popup3');
}

document.addEventListener('DOMContentLoaded', function() {
    if (selectedVocabelnE.length > 0) {
        zeigeFrage();
        updateProgressText(); // Anzeige aktualisieren
    } else {
        alert('Es wurden keine Vokabeln ausgewählt.');
    }
});

// Beispiel: Vokabel wurde geübt
function vokabelGeuebt() {
    practicedVocabCount++; // Inkrementieren des Zählers für geübte Vokabeln
    updateOrangerBalken(); // Orangen Balken aktualisieren
    updateProgressText(); // Text für den Fortschritt aktualisieren
}

// Beispiel: Funktion zur Aktualisierung des Fortschritts
function updateProgressText() {
    const progressText = `${practicedVocabCount}/${totalVocabCount}`;
    document.getElementById('progress').innerText = progressText;
}
document.addEventListener('keydown', function(event) {
    // Überprüfen, ob die Taste "1" gedrückt wurde
    if (event.key === "1") {
        event.preventDefault(); // Standardaktion der Taste verhindern (z. B. Springen zum Anfang der Seite)
        fuegeZeichenEinN(); // Funktion aufrufen, um das Zeichen "ñ" einzufügen
    }
});
// JavaScript-Funktion, um ein ñ einzufügen
function regulaereUebung() {
    selectedVocabeln = selectedVocabelnE.map(vokabel => {
        return { deutsch: vokabel.uebersetzung, spanisch: vokabel.deutsch };
    });

    localStorage.setItem('selectedVocab', JSON.stringify(selectedVocabeln));

    window.location.href = 'statistiken.html';
}

    