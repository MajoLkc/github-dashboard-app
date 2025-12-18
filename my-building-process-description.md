# AI Workflow Dokumentácia

**Meno:** Marián Lukáč 

**Dátum začiatku:** 15.12.2025 

**Dátum dokončenia:** 16.12.2025

**Zadanie:** Frontend

---

## 1. Použité AI Nástroje

Vyplň približný čas strávený s každým nástrojom:

- [ ] **Cursor IDE:** 0 hodín
- [x] **Claude Code:** 4,5 hodiny  
- [x] **GitHub Copilot:** 10 minút
- [x] **ChatGPT:** 15 minút
- [ ] **Claude.ai:** 0 hodín
- [ ] **Iné:** 

**Celkový čas vývoja (priližne):** 6 hodín

---

## 2. Zbierka Promptov

> 💡 **Tip:** Kopíruj presný text promptu! Priebežne dopĺňaj po každej feature.

### Prompt #1: Inicializácia Claude code

**Nástroj:** Claude Code 
**Kontext:** Inicializácia nástroja claude code do projektu

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
Musel som upraviť štýly obrázka. Agent mi len zmenil výšku s šírku obrázka,
čo ale problém nevyriešilo.
```

**Poznámky / Learnings:**
```
Nezadal som mu presné umiestnenie chyby a obrázok, možno preto nefungoval.
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

### Prompt #10: Implementácia OAuth flow

**Nástroj:** Claude Code  
**Kontext:** Implementácia OAuth flow na GitHub

**Prompt:**
```
Create OAuth login flow to GitHub. Use @components\LoginModal.tsx for it.
If user types valid credetials and clicks on login button, close modal and set push notification "You were logged in successully"
In case of invalid credetials, show error message under the login button. 
```

**Výsledok:**  

[ ] ✅ Fungoval perfektne (first try)  
[x] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Fungoval dobre, potreboval som len pridať secrets z GitHubu do mojho projektu a 
správne nakonfigurovať applikáciu v GitHube.
```

**Poznámky / Learnings:**
```
Agent vykonal omnoho viac úprav, ako som očakával.
```

### Prompt #11: Vytvorenie stránky profil

**Nástroj:** Claude Code  
**Kontext:** Vytvorenie novej stránk, kde bude user presmerovaný po kliknutí na názov profilu v headeri.

**Prompt:**
```
After click on user profile name in @components\Header.tsx redirect user to new /profile page. 
```

**Výsledok:**  

[ ] ✅ Fungoval perfektne (first try)  
[x] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Budem musieť dodať ďalšie informácie, aké dáta sa majú zobraziť,
čo som pravdepodobne mohol urobiť už v tomto prompte.
```

**Poznámky / Learnings:**
```
Možno som do promptu mohol rovno zadať viac informácii, aby rovno vytvoril stránku
s požadovanými dátami.
```

### Prompt #12: Aktualizácia profilovej stránky

**Nástroj:** Claude Code  
**Kontext:** Doplnenie stránky Profil o požadované dáta.

**Prompt:**
```
Page @app\profile\page.tsx shall show top 10 public repos with: repo name (linkt to GitHub), description, stars count, primary language and last update.

Update that page. 
```

**Výsledok:**  

[x] ✅ Fungoval perfektne (first try)  
[ ] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Nič, fungovalo to spávne.
```

**Poznámky / Learnings:**
```
Nevytváral som novú konverzáciu, pokračoval som v tej z Promptu 11.
```

### Prompt #13: Oprava img warningu

**Nástroj:** Claude Code  
**Kontext:** img element zobrazoval warning pre nextJS, bolo potrebné ho opraviť

**Prompt:**
```
In @components\Header.tsx fix this warning

Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage  
or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element 
```

**Výsledok:**  

[x] ✅ Fungoval perfektne (first try)  
[ ] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Nič.
```

**Poznámky / Learnings:**
```
Vytvoril som novú konverzáciu, mohol som mu dať naraz opraviť rovnakú chybu aj súbore app\profile\page.tsx.
```

### Prompt #14: Oprava ďalšieho img warningu

**Nástroj:** Claude Code  
**Kontext:** img element zobrazoval warning aj v ďalšom súbore

**Prompt:**
```
Same issue in @app\profile\page.tsx, fix it 
```

**Výsledok:**  

[x] ✅ Fungoval perfektne (first try)  
[ ] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Nič.
```

**Poznámky / Learnings:**
```
Pokračoval som v predošlej konverzácii.
```

### Prompt #15: Vytvorenie nového komponentu

**Nástroj:** Claude Code  
**Kontext:** Login a Logout tlačidlá boli vytvorené 2-krát, ale mali rovnaké properties. Potreboval som vytvoriť jeden komponent. 

**Prompt:**
```
In @components\Header.tsx file, there are quite same buttons for login and logout. Create it as one component and reuse it for login and logout. 
```

**Výsledok:**  

[ ] ✅ Fungoval perfektne (first try)  
[x] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Pridal som ešte funkciu handleLogin, aby som mal zachovanu rovnaku logiku logiku pre login aj logout.
```

**Poznámky / Learnings:**
```
Potreboval som tam ešte doplniť ikonu pre logout a zmeniť vzhľad kurzora. Pokračoval som preto v rovnakej konverzácii.
```

### Prompt #16: Male grafické úpravy buttonov

**Nástroj:** Claude Code  
**Kontext:** Potreboval som pridať ikonu k Logout buttonu a typ kurzora pre obe ikony ako pointer. 

**Prompt:**
```
Create new icon representing logout and put in next to the logout button (same as for login) and make coursor type pointer for both these buttons
```

**Výsledok:**  

[x] ✅ Fungoval perfektne (first try)  
[ ] ⭐⭐⭐⭐ Dobré, potreboval malé úpravy  
[ ] ⭐⭐⭐ OK, potreboval viac úprav  
[ ] ⭐⭐ Slabé, musel som veľa prepísať  
[ ] ❌ Nefungoval, musel som celé prepísať

**Čo som musel upraviť / opraviť:**
```
Nič.
```

**Poznámky / Learnings:**
```
Jednoduché príkazy zvláda bez chýb.
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

## 4. Kľúčové Poznatky

### 4.1 Čo fungovalo výborne

**1.** 
```
Claude code fungoval bez problémov pri detailnejšej špecifikácii. Napríklad,
keď som mu ku grafickému bugu pridal aj obrázok alebo som zadal, ktorý riadok
spôsobuje chybu v kóde.
```

**2.** 
```
Claude code fungoval výborne aj pri menších funkcionalitách, napíklad pri pridívaní
login modalu.
```

**3.** 
```
GitHub copilot som využíval najmä pri generovaní commit messages, kde som musel 
robiť len malé úpravy. Vačšinou message popísal dobre.
```

---

### 4.2 Čo bolo náročné

**1.** 
```
Vytváranie celej page podľa dizajnov vo Figme. Nakoľko som zadal príliš dlhý a 
zložitý prompt naraz.
```

**2.** 
```
Vytvánie Oauth funkcionality, nakoľko som sa s jej implementáciou ešte nestretol.
Musel som sa teda plne spoliehať len na AI.
```

---

### 4.3 Best Practices ktoré som objavil

**1.** 
```
V prípade opravy bugu v kóde je dobrá zadať jeho presné znenie, súbor a riadok, v ktorom sa bug vyskytuje.
```

**2.** 
```
V prípade grafických zmien je dobré poskytnúť agentovi aj obrázok a presne opísať problém.
```

**3.** 
```
Ak vytváram zložitejšie funkcionality bolo by lepšie zvoliť systematickejší prístup (PRP)
a nie len zadať prompt a čakať perfektný výsledok.
```

---

### 4.4 Moje Top 3 Tipy Pre Ostatných

**Tip #1:**
```
V prípade bugov/menších grafických úprav v Claude code je dobré byť konkrétny aj za cenu dlhšieho promptu.
Je dobré zadať file, prípadne riadok, kde sa daná issue vyskytuje a taktiež pridať (ak je to možné)
aj screenshot daného problému.
```

**Tip #2:**
```
Používanie GitHub Copilot na generovanie commit messages.
Veľa krát nebolo treba upravovať.
```

**Tip #3:**
```
Pri práci s Claude code agentom je dobré mať preddefinovanú štruktúru kódu, akú chcem používať,
taktiež rozloženie súborov a podobne.
```

---

## 6. Reflexia a Závery

### 6.1 Efektivita AI nástrojov

**Ktorý nástroj bol najužitočnejší?** Claude code

**Prečo?**
```
Agent dokázal veľmi efektívne pracovať a vytvárať väčšie funkcionality
za pomerne krátky čas. 
```

**Ktorý nástroj bol najmenej užitočný?** ChatGPT

**Prečo?**
```
Používal som ho najmenej.
```

---

### 6.2 Najväčšie prekvapenie
```
Rýchlosť a efektivita nástroja Claude code.
```

---

### 6.3 Najväčšia frustrácia
```
Hneď v úvode vytvorenie stránky za pomoci MCP servera z dizajnov vo Figme.
Agent sa zacyklil na dvoch erroroch, pričom chcel stále vykonávať príkaz na build.
```

---

### 6.4 Najväčší "AHA!" moment
```
Pri vytváraní malých webov vie AI veľmi dobre fungovať. Aj keď jej necháme "voľnú ruku"
```

---

### 6.5 Čo by som urobil inak
```
V prípade väčších funkcionalít by som dobudúcna určite použil systematickejší prístup (cez PRP).
Použil by som detailnejšie prompty.
```

### 6.6 Hlavný odkaz pre ostatných
```
Určite si to treba vyskúšať a vzdelávať sa v tejto obrasti, ak sa chceme posúvať vpred.
AI agenti vedia už teraz pomerne efektívne pracovať a vytvárať kód. 
```
