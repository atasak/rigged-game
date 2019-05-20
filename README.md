# Setup

  - Installeer nodejs/npm
  - `npm i`
  - `npm i -g typescript @angular/cli`
  - `ng serve`
  
Het project runt nu op `localhost:4200`

# The game

  - Gebruik asdw om te bewegen. 
  - Elke beurt heeft een speler een budget van 4 action points
  - Het ontgraven van een nieuw stuk grond kost 4 ap
  - Het lopen over een ontgraven stuk grond kost 1 ap
  - Bij het afgraven van een stuk grond heeft de speler een kans om een plaats in de afspeellijst te vinden
  - Bij het lopen over de trap gaan alle spelers naar een nieuwe ruimte
  - Als de speler niets meer kan of wil doen, kan hij/zij op enter drukken om de volgende speler de beurt te geven
  
## TODO

  - Powerups:
    - Een extra AP (permanent)
    - Verdubbel (in deze ruimte) de kans om een plaats in de afspeellijst te vinden
