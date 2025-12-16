# AI Workflow Dokumentácia

**Meno:** Marián Lukáč 

**Dátum začiatku:** 15.12.2025 

**Dátum dokončenia:** 

**Zadanie:** Frontend

---

## 1. Použité AI Nástroje

Vyplň približný čas strávený s každým nástrojom:

- [ ] **Cursor IDE:** _____ hodín
- [x] **Claude Code:** 2:30 hodín  
- [x] **GitHub Copilot:** 0:05 hodín
- [ ] **ChatGPT:** _____ hodín
- [ ] **Claude.ai:** _____ hodín
- [ ] **Iné:** 

**Celkový čas vývoja (priližne):** _____ hodín

---

## 2. Zbierka Promptov

> 💡 **Tip:** Kopíruj presný text promptu! Priebežne dopĺňaj po každej feature.

### Prompt #1: Inicializácia Claude code

**Nástroj:** Claude Code 
**Kontext:** [ Inicializácia nástroja claude code do projektu ]

**Prompt:**
```
[/init]
```

**Výsledok:**  
[x] ✅ Fungoval perfektne (first try)  
[ ] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Nič, fungoval perfektne
```

**Poznámky / Learnings:**
```
Defaultny príkaz, mal by vždy spraviť relatívne to isté
```

### "Prompt" #2: Pridanie MCP servera

**Nástroj:** Claude Code  
**Kontext:** Pridanie MCP servera do projektu

**Prompt:**
```
claude mcp add --transport sse --scope project sigma-mcp-server http://127.0.0.1:3845/mcp
```

**Výsledok:**  

[ ] ✅ Fungoval perfektne (first try)  
[ ] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[x] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Fungoval dobre, ale vystup v claude po inicializacii noveho .mcp.json suboru mi nefungovalo prihlasenie (pisalo mi not-authenticated)
manuálne som teda upravil súbor .mcp.json, kde som zmenil url na web figma, kde som tiež prihlásený, čo už fungovalo a po použití príkazu 
/mcp som dostal status connected, authenticated
```

**Poznámky / Learnings:**
```
Nabudúce by som asi rovno použil webovú verziu, keďže som mal problém s lokálnym MCP serverom.
```

### Prompt #3: Kontrola použitých tokenov

**Nástroj:** Claude Code  
**Kontext:** Kontrola použitých tokenov

**Prompt:**
```
/usage
```

**Výsledok:**  

[x] ✅ Fungoval perfektne (first try)  
[ ] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Nič
```

**Poznámky / Learnings:**
```
Robil som pre istotu, pretože som hľadal claude riešenie predošlého problému
```

### Prompt #4: Vytvorenie stránky pre vyhľadávanie

**Nástroj:** Claude Code  
**Kontext:** Vytvorenie stránky pre vyhľadávanie GitHub userov podľa poskytnutých dizajnov v nástroji Figma

**Prompt:**
```
Create web for search GitHub users. This web shall be responsive desktop/tablet/mobile and has option to switch dark and light theme.
  Here you can find designs: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=1-704
  Style guide for colors: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=1-313&t=l7vMLG2gg7OGtczF-4
  Style guide for typohraphy: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=1-131&t=F4tISYqCjXtKuuhB-4
  Style guide for spacing: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=1-164&t=F4tISYqCjXtKuuhB-4
  Style guide for radius: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=1-251&t=F4tISYqCjXtKuuhB-4
  For searching users use following endpoint: GET https://api.github.com/users/{username} 
```

**Výsledok:**  

[ ] ✅ Fungoval perfektne (first try)  
[ ] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[x] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Použil som v novom okne ďalší prompt na fix errorov. Taktiež som otvoril novú konverzáciu, pretože táto spotrebovala veľa tokenov.
Spotrebovaných bolo 43%.
```

**Poznámky / Learnings:**
```
Agent sa zacyklil pri na dvoch erroroch a opakovane potreboval zadat command npm run lint 2>&1.
Po štvrtom zadaní toho commandu problem nevyriešil, tak som proces ukončil.
```

### Prompt #5: Oprava bugu

**Nástroj:** Claude Code  
**Kontext:** Oprava bugu súvisiaceho s SSR Client Componentom

**Prompt:**
```
Fix following error
  A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:
  - A server/client branch `if (typeof window !== 'undefined')`.
  - Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
  - Date formatting in a user's locale which doesn't match the server.
  - External changing data without sending a snapshot of it along with the HTML.
  - Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

This error occures in this file @app\layout.tsx on line 24 
```

**Výsledok:**  

[x] ✅ Fungoval perfektne (first try)  
[ ] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Nič
```

**Poznámky / Learnings:**
```
Pri presnom zadefinovaní bugu a riadku, na ktorom sa danu bug vyskytol, fungoval prompt veľmi dobre.
```

### Prompt #6: Oprava bugu

**Nástroj:** Claude Code  
**Kontext:** Oprava bugu súvisiaceho s SSR Client Componentom

**Prompt:**
```
Fix following error
Invalid src prop (https://avatars.githubusercontent.com/u/583231?v=4) on `next/image`, hostname "avatars.githubusercontent.com" is not configured under images in your `next.config.js`
See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host

This error occures in @components\UserProfile.tsx on line 76 
```

**Výsledok:**  

[x] ✅ Fungoval perfektne (first try)  
[ ] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Nič
```

**Poznámky / Learnings:**
```
Nič nové.
```

### Prompt #7: Oprava štýlu obrázka

**Nástroj:** Claude Code  
**Kontext:** Fix profilového obrázku - mal nesprávne nadstavenú výšku. V prompte č. 4 nebol presne dodržaný style guide

**Prompt:**
```
Style of profile picture is wrong.
Here is correct style guide: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=5-659&t=k3daJ2CiQrIR5POY-4
Update it. 
```

**Výsledok:**  

[ ] ✅ Fungoval perfektne (first try)  
[ ] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[x] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Musel som upraviť štýly obrázka
```

**Poznámky / Learnings:**
```
Nezadam som mu presné umiestnenie chyby a obrázok, možno preto nefungoval.
```

### Prompt #8: Oprava noon ikonky

**Nástroj:** Claude Code  
**Kontext:** Fix moon ikonky - nepodobalo sa to na moon ikonku

**Prompt:**
```
Fix moon icon according style guide.
Currently it looks like this & '~\Desktop\Screenshot 2025-12-16 080850.png'
Here is the icons style guide: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app?node-id=5-134&t=k3daJ2CiQrIR5POY-4 
```

**Výsledok:**  

[x] ✅ Fungoval perfektne (first try)  
[ ] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Nič
```

**Poznámky / Learnings:**
```
Zreme pomohol screenshot ako vyzerala ikonka pôvodne.
```

### Prompt #9: Vytvorenie login formulára

**Nástroj:** Claude Code  
**Kontext:** Pridanie login tlačidla do horneho menu a prihlasovacieho formulára.

**Prompt:**
```
Add to @components\Header.tsx component login button.
After click on this button shall be opened modal with login form (username/email and password)
There shall be validation if input fields are not empty and email is valid.
Implement it. 
```

**Výsledok:**  

[ ] ✅ Fungoval perfektne (first try)  
[x] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Zmenil som farbu tlačidla na modré.
```

**Poznámky / Learnings:**
```
```

### Prompt #10: 

**Nástroj:** Claude Code  
**Kontext:** Pridanie prihlasovacieho formulára a login tlačidla do horneho menu.

**Prompt:**
```
Add to @components\Header.tsx component login button.
After click on this button shall be opened modal with login form (username/email and password)
There shall be validation if input fields are not empty and email is valid.
Implement it. 
```

**Výsledok:**  

[ ] ✅ Fungoval perfektne (first try)  
[x] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Zmenil som farbu tlačidla na modré.
```

**Poznámky / Learnings:**
```
```

### Prompt #11: 

**Nástroj:** Claude Code  
**Kontext:** Pridanie prihlasovacieho formulára a login tlačidla do horneho menu.

**Prompt:**
```
Add to @components\Header.tsx component login button.
After click on this button shall be opened modal with login form (username/email and password)
There shall be validation if input fields are not empty and email is valid.
Implement it. 
```

**Výsledok:**  

[ ] ✅ Fungoval perfektne (first try)  
[x] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Zmenil som farbu tlačidla na modré.
```

**Poznámky / Learnings:**
```
```

---

## 3. Problémy a Riešenia 

> 💡 **Tip:** Problémy sú cenné! Ukazujú ako riešiš problémy s AI.

### Problém #1: Zadanie príliš veľkého množstva funkcionalít v jednom prompte

**Čo sa stalo:**
```
Zadal som prompt na vytvorenie celej page so všetkými dizajnami aj funkcionalitami, ktoré mala daná page obsahovať.
Problém bol, že agent sa zacyklil pri dvoch erroroch, ktoré po viacerých pokusoch nevedel opraviť
```

**Prečo to vzniklo:**
```
Pravdepodobne príliš veľa funkcionalít zadaných v jednom prompte.
```

**Ako som to vyriešil:**
```
1. Otvoril som claude code v novom okne.
2. Zadal som opravu prvej chyby (prompt 5)
3. Zadal som opravu druhej chyby (prompt 6)
```

**Čo som sa naučil:**
```
Zrejme by som mu radšej zadal vytvoriť viac menších funkciolatít vo viacerých promptoch. 
```

**Screenshot / Kód:** [ ] Priložený

---

### Problém #2: Nesprávny štýl obrázka a ikonky

**Čo sa stalo:**
```
Obrázok avatara bol nesprávne naštýlovaný - roztiahnutý na celú výšku karty.
Moon ikonka sa nepodobala mesiacu.
```

**Prečo:**
```
Rovnaká príčina ako v probléme č.1
```

**Riešenie:**
```
1. Písomne som zadal, kde je chyba s obrázkom (Prompt 7).
2. Prompt nefungoval, tak som to opravil ručne.
3. Zadal som príkaz na opravu ikonky spolu so screenshotom (prompt 8).
```

**Learning:**
```
Pri grafickych bugoch pravdepodobne pomáha zadať aj screenshot chyby.
```

### Problém #3: 

**Čo sa stalo:**
```
Obrázok avatara bol nesprávne naštýlovaný - roztiahnutý na celú výšku karty.
Moon ikonka sa nepodobala mesiacu.
```

**Prečo:**
```
Rovnaká príčina ako v probléme č.1
```

**Riešenie:**
```
1. Písomne som zadal, kde je chyba s obrázkom (Prompt 7).
2. Prompt nefungoval, tak som to opravil ručne.
3. Zadal som príkaz na opravu ikonky spolu so screenshotom (prompt 8).
```

**Learning:**
```
Pri grafickych bugoch pravdepodobne pomáha zadať aj screenshot chyby.
```

## 4. Kľúčové Poznatky

### 4.1 Čo fungovalo výborne

**1.** 
```
[Príklad: Claude Code pre OAuth - fungoval first try, zero problémov]
```

**2.** 
```
```

**3.** 
```
```

**[ Pridaj viac ak chceš ]**

---

### 4.2 Čo bolo náročné

**1.** 
```
[Príklad: Figma MCP spacing - často o 4-8px vedľa, musel som manuálne opravovať]
```

**2.** 
```
```

**3.** 
```
```

---

### 4.3 Best Practices ktoré som objavil

**1.** 
```
[Príklad: Vždy špecifikuj verziu knižnice v prompte - "NextAuth.js v5"]
```

**2.** 
```
```

**3.** 
```
```

**4.** 
```
```

**5.** 
```
```

---

### 4.4 Moje Top 3 Tipy Pre Ostatných

**Tip #1:**
```
[Konkrétny, actionable tip]
```

**Tip #2:**
```
```

**Tip #3:**
```
```

---

## 6. Reflexia a Závery

### 6.1 Efektivita AI nástrojov

**Ktorý nástroj bol najužitočnejší?** _________________________________

**Prečo?**
```
```

**Ktorý nástroj bol najmenej užitočný?** _________________________________

**Prečo?**
```
```

---

### 6.2 Najväčšie prekvapenie
```
[Čo ťa najviac prekvapilo pri práci s AI?]
```

---

### 6.3 Najväčšia frustrácia
```
[Čo bolo najfrustrujúcejšie?]
```

---

### 6.4 Najväčší "AHA!" moment
```
[Kedy ti došlo niečo dôležité o AI alebo o developmente?]
```

---

### 6.5 Čo by som urobil inak
```
[Keby si začínal znova, čo by si zmenil?]
```

### 6.6 Hlavný odkaz pre ostatných
```
[Keby si mal povedať jednu vec kolegom o AI development, čo by to bylo?]
```
