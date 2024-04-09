  // Funktion zum Hinzufügen einer Vokabel
  function addVokabel() {
    const deutschInput = document.getElementById('deutsch');
    const uebersetzungInput = document.getElementById('uebersetzung');
    const vokabelListe = document.getElementById('vokabelListe');
    
    // Werte aus den Eingabefeldern abrufen
    const deutsch = deutschInput.value.trim();
    const uebersetzung = uebersetzungInput.value.trim();
    
    // Sicherstellen, dass beide Felder ausgefüllt sind
    if (deutsch === '' || uebersetzung === '') {
      alert('Bitte füllen Sie beide Felder aus.');
      return;
    }
    
    // Neues Element erstellen und zur Liste hinzufügen
    const vokabelItem = document.createElement('div');
    vokabelItem.innerHTML = `${deutsch} - ${uebersetzung} <button onclick="deleteVokabel(this)">Löschen</button>`;
    vokabelListe.appendChild(vokabelItem);
    
    // Eingabefelder leeren
    deutschInput.value = '';
    uebersetzungInput.value = '';
    
    // Vokabel in localStorage speichern
    saveVokabel(deutsch, uebersetzung);
  }

  // Funktion zum Löschen einer Vokabel
  function deleteVokabel(button) {
    const vokabelItem = button.parentElement;
    const deutsch = vokabelItem.textContent.split(' - ')[0]; // Deutsches Wort extrahieren
    vokabelItem.remove();
    // Vokabel aus localStorage entfernen
    removeVokabel(deutsch);
  }

  // Funktion zum Speichern einer Vokabel im localStorage
  function saveVokabel(deutsch, uebersetzung) {
    let vokabeln = JSON.parse(localStorage.getItem('vokabeln')) || [];
    vokabeln.push({ deutsch, uebersetzung });
    localStorage.setItem('vokabeln', JSON.stringify(vokabeln));
  }

  // Funktion zum Entfernen einer Vokabel aus dem localStorage
  function removeVokabel(deutsch) {
    let vokabeln = JSON.parse(localStorage.getItem('vokabeln')) || [];
    vokabeln = vokabeln.filter(vokabel => vokabel.deutsch !== deutsch);
    localStorage.setItem('vokabeln', JSON.stringify(vokabeln));
  }

  // Funktion zum Laden und Anzeigen der gespeicherten Vokabeln beim Laden der Seite
  document.addEventListener('DOMContentLoaded', function() {
    let vokabeln = JSON.parse(localStorage.getItem('vokabeln')) || [];
    const vokabelListe = document.getElementById('vokabelListe');
    vokabeln.forEach(vokabel => {
      const vokabelItem = document.createElement('div');
      vokabelItem.innerHTML = `${vokabel.deutsch} - ${vokabel.uebersetzung} <button onclick="deleteVokabel(this)">Löschen</button>`;
      vokabelListe.appendChild(vokabelItem);
    });
  }); 