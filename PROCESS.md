__Process Book__
---
Naam: Tim de Boer

Student number: 11202351
### Monday 3rd
- Afmaken van de proposal. Was al grotendeels af en ingeleverd, maar was van onderwerp gewisseld.
- Fundament maken voor repository. Het bij elkaar stoppen van files, zodat het overzichtelijk blijft.
- Klein begin aan design document. Beschrijven van de data sources en wat er aan de datasets moet worden gedaan.


### Tuesday 4th
- Afmaken design document. Het beschrijven van de componenten die nodig zijn voor de visualisaties.
- Opzoek naar laatste dataset. Ik had een dataset gevonden over de onderwijsniveaus per provincie, maar ik visualiseer per gemeente. Dit geeft dus een klein probleem als ik de scatterplot wil gaan maken.
- Opzoek naar data map voor de Gemeentelijke grenzen van Nederland anno 2019.

### Wednesday 5th
- Tijdens de standup goede feedback gekregen over mijn onderwerp. Sophie merkte goed op dat ik een html component miste, dus dat ik deze nog moet toevoegen. Dit heb ik nu gedaan bij de visualisatie van de data map, waarbij de gebruiker nu kan kiezen uit de winsten van FvD of van de winnende partij per gemeente.
- Verder op zoek gegaan naar een data map voor mijn visualisatie. Helaas nog niks kunnen vinden.

### Thursday 6th
- Ik heb eindelijk een data map kunnen vinden voor mijn visualisatie. Ik kon lange tijd niks vinden, dus ik wilde de keuze maken tussen een kaart van 2017 of 2019. Gelukkig heb ik nog een kaart van 2019 kunnen vinden, want dit scheelt aardig wat tijd. Dit is ook waar ik grotendeels van de dag mee bezig ben geweest.

### Friday 7th
- Vandaag aan de slag gegaan met het visualiseren van de data map. De data map is nu te zien op project.html, een html die ik voor nu even kort gebruik om de visualisatie voor elkaar te krijgen. De visualisatie is enkel nog niet gelinkt aan de dataset, dit hoop ik dit weekend al te kunnen doen.
- Voor de rest loopt alles op dit moment vrij voorspoedig.

### Tuesday 11th
- De data map is gelinkt met de dataset, waardoor waardes worden laten zien als je over de map heen gaat.
- De dataset bestond nog uit enkele waardes waarvan ik niet zeker wist of ik die moest gebruiken. Deze heb ik er toch maar uit gehaald, omdat ze niet nodig zijn voor de visualisaties.

### Wednesday 12th
- De pie chart is gelinkt met datamap, waardoor de waardes van elke provincie kan worden laten zien.
- Ik wilde de namen van de partijen op de slices van de pie chart zetten, enkel zijn deze namen vrij lang dus heb ik ervoor gekozen om een legenda te maken. De tooltip laat de partij met de bijbehorende stemmen zien.
- Ik heb een begin kunnen maken aan het opstellen van de dataset voor de scatterplot.

### Thursday 13th
- Ik heb vandaag de scatterplot proberen af te maken, maar het is niet gelukt omdat ik er niet uit kwam wat in deze visualisatie wilde laten zien. Als ik alle gemeentes zou laten zien, dan zou ik geen interactie meer hebben tussen de drie figuren. Ik heb daarom besloten om in de scatterplot de gemeentes per provincie te laten. Hierdoor verandert de scatterplot als je op gemeentes klikt in andere provincie, waardoor de visualisatie interactief blijft.
- De rest van de middag ben ik bezig geweest om de dataset te kunnen krijgen, zodat per provincie alle gemeentes werden weergegeven.

### Friday 14th
- Ik was vandaag ziek, dus ik heb weinig tot niks kunnen doen.

### Monday 17th
- De dataset voor de scatterplot is af. Heb daarmee ook de scatterplot af kunnen maken.
- Voor de scatterplot wil ik nog wel een dropdown-menu maken waarbij gekozen kan worden tussen inkomensniveau van de gemeente en opkomstpercentage per gemeente.
- Aan de pie chart heb ik een legenda toegevoegd met de bijhorende kleur en labels van elke politieke partij.  

### Tuesday 18th
- Ik heb vandaag gewerkt aan de dropdown voor de scatterplot, alleen ik krijg het nog niet voor elkaar om de value voor de x-as te veranderen door middel van de update. Ik heb wel een begin kunnen maken, maar het is niet nog niet af.
- Daarnaast gekeken naar het updaten van de data map, waarbij ook een dropdown menu wordt gemaakt waaruit gekozen kan worden tussen de winnende partij per gemeente en het aantal stemmen op Forum voor Democratie per gemeente.

### Wednesday 19th
- Vandaag heb ik de dropdown menu af kunnen maken voor de scatterplot. Er kan nu gekozen worden tussen respectievelijk de opkomst per gemeente en het inkomensniveau per gemeente. Zo kan er gekeken worden of er een verband bestaat tussen de opkomst/het inkomensniveau en het aantal stemmen op Forum voor Democratie per gemeente per provincie.
- Daarnaast heb ik voor het updaten van de data map de dataset kunnen creëren voor de winnende partij, waarbij het hoogst aantal stemmen op een bepaalde partij is gevonden en vervolgens in een dict is gestopt met gemeente als de key. Alleen de dropdown moet gemaakt worden om de map nog goed te updaten.
