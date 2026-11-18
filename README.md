# Alpine Finance Summit — Website

Statischer Nachbau von <https://www.alpinefinancesummit.org/> (bisher Jimdo) für **GitHub Pages**.
Reines HTML/CSS/JS, kein Build-Schritt, keine Cookies, kein Tracking, Schriften lokal eingebunden
(keine Google-Fonts-Abrufe → DSGVO-unkritisch).

## Struktur

```
index.html                         Startseite
call-for-papers-submissions/       Call for Papers (inkl. Dual Submission, Anker #dual)
program-2026/                      Programm 2026 + Keynote (Anker #keynote)
venue/                             Garmisch-Partenkirchen, Anreise, Kongresshaus, Hotel
outdoor-activities/                Social Program
past-program-2025/, past-program-2024/   Archiv mit Programm und Fotogalerie
organizers/, imprint/, privacy-policy/
dual-submission-option/            Weiterleitung → call-for-papers-submissions/#dual
program-2026/keynote-speaker/      Weiterleitung → program-2026/#keynote
404.html                           Fehlerseite
assets/css/style.css               gesamtes Design (Farben oben in :root)
assets/js/main.js                  Menü, Header, Lightbox, Einblend-Effekte
assets/img/                        Bilder (xyz.jpg = groß, xyz-sm.jpg = Vorschau)
assets/docs/                       Call-for-Papers-PDF
```

Die alten Jimdo-URLs bleiben gültig, damit Links aus PDFs, SFS-Seiten usw. weiter funktionieren.

## Lokal ansehen

```bash
python -m http.server 8765
```

dann <http://localhost:8765> öffnen.

## Inhalte pflegen

- Texte stehen direkt im HTML der jeweiligen Seite (`…/index.html`).
- Header/Footer sind auf jeder Seite enthalten; bei Menü-Änderungen alle `index.html` anpassen
  (Suchen/Ersetzen über den Ordner).
- Programmpunkte: eine `<li class="slot">` pro Zeile. Klassen: `brk` (Pause), `key` (Keynote),
  `social` (Dinner/Outdoor), ohne Zusatz = Paper.
- Neues Jahr (z. B. 2027): `program-2026/` nach `past-program-2026/` kopieren, neue
  `program-2027/` anlegen, Navigation + Footer + Startseite (Daten, Keynote, Key Dates) anpassen.
- Neue Fotos: in `assets/img/` ablegen, Vorschauversion `-sm.jpg` ca. 640–900 px breit.

## Veröffentlichen auf GitHub Pages

Repository: <https://github.com/sstoeckl/alpinefinancesummit> (öffentlich), GitHub Pages aus
`main` / `/ (root)`. Jeder Push auf `main` ist nach ca. 1 Minute live unter
<https://sstoeckl.github.io/alpinefinancesummit/>.

Dieser Teams-Ordner ist das Git-Repository (normaler `.git`-Ordner hier im Verzeichnis).
Auf einem anderen Rechner einfach `git clone https://github.com/sstoeckl/alpinefinancesummit` verwenden.
Hinweis: Nicht gleichzeitig von zwei Rechnern aus in diesem synchronisierten Ordner committen —
OneDrive/SharePoint kann sonst Konfliktkopien von Dateien in `.git` erzeugen.

Ändern und veröffentlichen:

```bash
git add -A
git commit -m "Update program"
git push
```

Alle Pfade sind relativ; nur die 404-Seite sieht erst mit eigener Domain korrekt aus.
Später in eine GitHub-Organisation verschieben: *Settings → Transfer ownership* (Pages-URL ändert sich dann).

## Eigene Domain umziehen (alpinefinancesummit.org)

Stand 18.11.2026 (RDAP-Abfrage): registriert am 22.10.2023 **über Jimdo** (Registrar InterNetX),
Nameserver `ns13/ns14.jimdo.com`, läuft bis **22.10.2027** (gerade automatisch verlängert),
Transfersperre aktiv. Keine MX-Einträge (E-Mail läuft über Gmail) → beim Umzug geht kein Postfach verloren.

**Variante A — Domain zu all-inkl umziehen (empfohlen, wenn ihr dort schon ein Paket habt):**

1. Bei Jimdo im Dashboard Transfersperre aufheben und **Auth-Code** anfordern.
2. Bei all-inkl im KAS: Domain-Transfer (KK-Antrag) für `alpinefinancesummit.org` mit Auth-Code starten.
3. Nach erfolgreichem Transfer im KAS → DNS-Einstellungen:
   - `A`-Records für `alpinefinancesummit.org` (Apex):
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - optional `AAAA`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` für `www` → `<user-oder-org>.github.io.`
4. Im Repo eine Datei `CNAME` mit dem Inhalt `www.alpinefinancesummit.org` anlegen
   (oder unter *Settings → Pages → Custom domain* eintragen), dann *Enforce HTTPS* aktivieren.
5. Empfohlen: Domain in GitHub verifizieren (*Org/Profil-Settings → Pages → Add a domain*, TXT-Record),
   damit niemand anderes sie für eine GitHub-Pages-Seite kapern kann.
6. Erst danach das Jimdo-Paket kündigen.

**Variante B — Domain bei Jimdo lassen:** nur sinnvoll, wenn Jimdo im aktuellen Tarif externe
DNS-Einträge (A/CNAME) erlaubt; dann Schritte 3–5 dort. Das Jimdo-Paket muss dann aber weiterlaufen.

Domain-Transfers dauern typischerweise einige Tage; währenddessen bleibt die alte Seite online.
