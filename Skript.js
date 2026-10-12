//doppeltes Auswählen verhindern
document.addEventListener('DOMContentLoaded', function() {
    const fachSelect = document.getElementById('fach');
    const fach2Select = document.getElementById('fach2');
    const abgewählt_1 = document.getElementById('abgewählt_1');
    const abgewählt_2 = document.getElementById('abgewaehlt_2');
    const sp_drei = document.getElementById('sp_drei');
    const muku = document.getElementById('musisches-fach');

    function erstelleFehlermeldung(element, text) {
        const meldung = document.createElement('p');
        meldung.textContent = text;
        meldung.style.color = 'red';
        meldung.hidden = true;
        element.insertAdjacentElement('afterend', meldung);
        return meldung;
    }

    const fehlermeldungLeistungskurse = erstelleFehlermeldung(fach2Select, 'Bitte wähle zwei unterschiedliche Fächer aus.');
    const fehlermeldungAbgewaehlte = erstelleFehlermeldung(abgewählt_2, 'Bitte wähle zwei unterschiedliche abgewählte Fächer aus.');
    const fehlermeldungSport = erstelleFehlermeldung(sp_drei, 'Es kann nicht sowohl der dreistündige Sportkurs als auch Sport als LK gewählt werden.');

    function pruefeDoppelteAuswahl(fach_1, fach_2, fach_3, fehlermeldung) {
        let gleicheAuswahl = fach_1 !== '' && fach_1 === fach_2;
        if (fach_3 !== null) {
            gleicheAuswahl = gleicheAuswahl ||
                (fach_1 !== '' && fach_1 === fach_3) ||
                (fach_2 !== '' && fach_2 === fach_3);
        }
        fehlermeldung.hidden = !gleicheAuswahl;
    }

    function pruefeSportAuswahl() {
        const sportDoppelt = sp_drei.checked &&
            (fachSelect.value === 'sport' || fach2Select.value === 'sport');
        fehlermeldungSport.hidden = !sportDoppelt;
    }

    fachSelect.addEventListener('change', () =>
        pruefeDoppelteAuswahl(fachSelect.value, fach2Select.value, null, fehlermeldungLeistungskurse)
    );
    fach2Select.addEventListener('change', () =>
        pruefeDoppelteAuswahl(fachSelect.value, fach2Select.value, null, fehlermeldungLeistungskurse)
    );
    fachSelect.addEventListener('change', pruefeSportAuswahl);
    fach2Select.addEventListener('change', pruefeSportAuswahl);

    abgewählt_1.addEventListener('change', () =>
        pruefeDoppelteAuswahl(abgewählt_1.value, abgewählt_2.value, null, fehlermeldungAbgewaehlte)
    );
    abgewählt_2.addEventListener('change', () =>
        pruefeDoppelteAuswahl(abgewählt_1.value, abgewählt_2.value, null, fehlermeldungAbgewaehlte)
    );

    sp_drei.addEventListener('change', pruefeSportAuswahl);
});