document.addEventListener('DOMContentLoaded', function() {
    let vokabeln = JSON.parse(localStorage.getItem('vokabeln')) || [];
    const vokabelListe = document.getElementById('vokabelListe');
    const counter = document.getElementById('counter'); // Das HTML-Element für den Counter
    // Funktion zum Aktualisieren des Counters
    function updateCounter() {
        const selectedCount = document.querySelectorAll('.checkbox-input:checked').length;
        const totalCount = vokabeln.length;
        counter.textContent = selectedCount + '/' + totalCount; // Aktualisierung des Counter-Textes
    }
    // Event-Listener für die Checkboxen
    function handleCheckboxChange() {
        if (this.checked) {
            // Füge die ausgewählte Vokabel zum Array der ausgewählten Vokabeln hinzu
            selectedVokabelnE.push(vokabeln[this.dataset.vokabelId]);
        } else {
            // Entferne die Vokabel aus dem Array der ausgewählten Vokabeln
            const index = selectedVokabelnE.findIndex(vokabel => vokabel === vokabeln[this.dataset.vokabelId]);
            selectedVokabelnE.splice(index, 1);
        }
        updateCounter(); // Aktualisiere den Counter
        saveSelectedVokabeln(); // Speichere die ausgewählten Vokabeln im Local Storage
    }

    // Funktion zum Speichern der ausgewählten Vokabeln im Local Storage
    function saveSelectedVokabeln() {
        localStorage.setItem('selectedVokabelnE', JSON.stringify(selectedVokabelnE));
    }

    // Array für die ausgewählten Vokabeln
    let selectedVokabelnE = [];

    vokabeln.forEach((vokabel, index) => {
        const row = vokabelListe.insertRow();
        const deutschCell = row.insertCell(0);
        const uebersetzungCell = row.insertCell(1);
        const checkboxCell = row.insertCell(2); // Füge eine Zelle für die Checkbox hinzu
        deutschCell.textContent = vokabel.deutsch;
        uebersetzungCell.textContent = vokabel.uebersetzung;
        checkboxCell.classList.add('checkbox'); // Füge der Checkbox-Zelle die entsprechende Klasse hinzu
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox-input');
        checkbox.dataset.vokabelId = index; // Verwenden Sie das Dataset, um die Vokabel-ID zu speichern
        checkboxCell.appendChild(checkbox);

        // Event-Listener für die Checkboxen
        checkbox.addEventListener('change', handleCheckboxChange);
    });

    // Aktualisiere den Counter zu Beginn
    updateCounter();

    // Event-Listener für den Start-Button
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', function() {
        if (selectedVokabelnE.length === 0) {
            alert('Bitte wählen Sie mindestens eine Vokabel aus.');
            return;
        }
        localStorage.setItem('selectedVocabelnE', JSON.stringify(selectedVokabelnE));
        localStorage.setItem('counter', JSON.stringify(counter));
        window.location.href = 'vokabelabfrageE.html';
    });
});
