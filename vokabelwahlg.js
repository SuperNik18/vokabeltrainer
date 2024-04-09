let counter = 0;
const maxCount = 250;
const selectedVocab = [];
const switchInput = document.getElementById('switch-input');
let toggleState = false;
let startIndex = -1;
let endIndex = -1;

function toggleSwitch() {
    const switchInput = document.getElementById('switch-input');
    toggleState = !toggleState;
    if (toggleState) {
        switchInput.checked = true;
    } else {
        switchInput.checked = false;
    }
}

const checkboxes = document.querySelectorAll('td.checkbox');

checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('click', () => {
        const isChecked = checkbox.getAttribute('data-checked') === 'true';
        if (isChecked) {
            checkbox.innerHTML = ""; // Haken entfernen
            checkbox.setAttribute('data-checked', 'false');
            counter--;
            const indexInSelectedVocab = selectedVocab.findIndex(vocab => vocab.deutsch === checkbox.parentElement.cells[0].innerText);
            if (indexInSelectedVocab !== -1) {
                selectedVocab.splice(indexInSelectedVocab, 1);
            }
            if (index === startIndex) {
                startIndex = -1;
            } else if (index === endIndex) {
                endIndex = -1;
            }
        } else {
            if (counter >= maxCount) {
                alert('Sie haben bereits die maximale Anzahl von Vokabeln ausgewählt.');
                return;
            }
            checkbox.innerHTML = "&#10004;"; // Haken setzen
            checkbox.setAttribute('data-checked', 'true');
            counter++;
            selectedVocab.push({
                deutsch: checkbox.parentElement.cells[0].innerText,
                spanisch: checkbox.parentElement.cells[1].innerText
            });
            if (startIndex === -1) {
                startIndex = index;
            } else {
                endIndex = index;
                let start = Math.min(startIndex, endIndex);
                let end = Math.max(startIndex, endIndex);
                for (let i = start + 1; i < end; i++) {
                    checkboxes[i].innerHTML = "&#10004;"; // Haken setzen
                    checkboxes[i].setAttribute('data-checked', 'true');
                    counter++;
                    selectedVocab.push({
                        deutsch: checkboxes[i].parentElement.cells[0].innerText,
                        spanisch: checkboxes[i].parentElement.cells[1].innerText
                    });
                }
                startIndex = endIndex;
            }
        }
        document.getElementById('counter').innerText = counter;
    });
});

function starteVokabelabfrage() {
    if (selectedVocab.length === 0) {
        alert('Bitte wählen Sie mindestens eine Vokabel aus.');
        return;
    }
    localStorage.setItem('selectedVocab', JSON.stringify(selectedVocab));
    localStorage.setItem('counter', JSON.stringify(counter));
    window.location.href = 'vokabelabfrage.html';
}
