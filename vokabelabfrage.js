const selectedVocab = JSON.parse(localStorage.getItem('selectedVocab')) || [];
console.log('In selectedVocab gespeichert:', selectedVocab);
let currentQuestionIndex = 0;
let wrongAnswers = []; // Liste für falsch beantwortete Vokabeln
let skippedAnswers = []; // Liste für übersprungene Vokabeln

// Zähler für geübte Vokabeln und Gesamtzahl der Vokabeln
let practicedVocabCount = 0;
const totalVocabCount = selectedVocab.length;

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
    const spanisch = document.getElementById('spanisch');
    spanisch.innerText = selectedVocab[currentQuestionIndex].spanisch;
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
    const deutsch = selectedVocab[currentQuestionIndex].deutsch.toLowerCase();
    const ergebnisText = document.getElementById('ergebnisText');
    if (antwort === deutsch) {
        popup.classList.add('open-popup');
        if (!wrongAnswers.includes(selectedVocab[currentQuestionIndex])) {
            if (!skippedAnswers.includes(selectedVocab[currentQuestionIndex])) {
                vokabelGeuebt(); // Vokabel als geübt markieren, wenn sie beim ersten Mal richtig beantwortet wurde und nicht übersprungen wurde
            }
        }
    } else if (!skippedAnswers.includes(selectedVocab[currentQuestionIndex])) { // Hinzufügen der Bedingung, um sicherzustellen, dass die Vokabel nicht als übersprungen markiert wurde
        popup2.classList.add('open-popup2');
        //Das richtige Spanische Wort im Popup anzeigen
        const spanischAnzeige = document.getElementById('spanischAnzeige');
        spanischAnzeige.innerText = deutsch;
        if (!wrongAnswers.includes(selectedVocab[currentQuestionIndex])) {
            wrongAnswers.push(selectedVocab[currentQuestionIndex]); // Falsche Antwort zur Liste hinzufügen, wenn sie beim ersten Mal falsch beantwortet wurde
        }
    }
}

function zeigeFalscheVokabeln() {
    popup.classList.remove('open-popup');
    popup2.classList.remove('open-popup2');
    currentQuestionIndex = 0; // Setze den Index für falsche Vokabeln zurück
    selectedVocab.splice(0, selectedVocab.length, ...wrongAnswers); // Ersetze die Hauptliste mit den falschen Antworten
    wrongAnswers = []; // Setze die Liste der falschen Antworten zurück
    zeigeFrage(); // Beginne die Abfrage der falschen Vokabeln erneut
}

function naechsteFrage() {
    currentQuestionIndex++;
    while (skippedAnswers.includes(selectedVocab[currentQuestionIndex])) {
        currentQuestionIndex++; // Überspringe Vokabeln, die als "Gelten lassen" markiert wurden
    }
    if (currentQuestionIndex < selectedVocab.length) {
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
    skippedAnswers.push(selectedVocab[currentQuestionIndex]); // Markiere die aktuelle Vokabel als übersprungen
    currentQuestionIndex++; // Index für die nächste Frage erhöhen
    if (currentQuestionIndex < selectedVocab.length) { // Überprüfen, ob es noch weitere Fragen gibt
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

function Statistiken() {
    popup3.classList.remove('open-popup3');
}

document.addEventListener('DOMContentLoaded', function() {
    if (selectedVocab.length > 0) {
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
function fuegeZeichenEinN() {
    var textfeld = document.getElementById("antwort");
    textfeld.value += "ñ";
    }