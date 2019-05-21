# Analysis of the unemployment rate in the Netherlands per province

Name: Tim de Boer

Studentnumber: 11202351

The final project of the programming minor. For this project I will visualize the unemployment rate per province in the Netherlands using a timeline in the form of a line chart. Second, I will capture the differences in unemployment rates relative to several variables, e.g. educational level or amount of vacancies, in the form of a scatterplot. Finally, I want to visualize by industry per province and analyze whether the economic activities significantly differ among the provinces. For the latter I want to use a sunburst or pie chart.

__Problem Statement__
---
Unemployment is a global problem which has the potential to have significant and serious social repercussions. Especially, after the Financial Crisis of 2007 the unemployment rate remains a huge topic. In the Netherlands you hear different noises from citizens about the unemployment rates, but which arguments are true? With this analysis, I am trying to visualize and map the unemployment in the Netherlands using several visualization which are linked. Eventually, I try to find a possible cause or explanation for these differences in opinions. The visualization can be a tool for the government to get an idea of the problem. This way, the government can allocate their resources where they are needed.  

__Solution__
---
*Idea*:
- My idea is to visualize and map the unemployment and analyze whether there are difference in terms of unemployment between the provinces.

*Main features*:
- A datamap of the Netherlands with the colour of each province corresponding to the total unemployment rate.
- When a province on the map is clicked, a sunburst will be shown with job industries and the total economic activity within a province.
- A scatterplot with the unemployment on the y-axis and dropdown menu for multiple variables on the x-axis, e.g. educational level, income, disease.

*Optional features*:
- Create a dropdown menu where the user can choose between different years.
- Create a mouseover function for the bullets on the scatterplot to show values of specific province.
- Create a mouseover function for the sunburst to see the values of the job industry

*Visualizations*:
![alt text](https://github.com/timdeb08/Programmeerproject/blob/master/file.jpeg)

__Prerequisites__
---
*Data sources*:
- https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83582NED/table?ts=1558449897717 Dataset about the economic activities per province. The dataset does not need much scraping.
- https://opendata.cbs.nl/statline/#/CBS/nl/dataset/82915NED/table?ts=1558391278663 Dataset about the working population. The dataset does not need much scraping.
- https://opendata.cbs.nl/statline/#/CBS/nl/dataset/82816ned/table?dl=19D07 Dataset about the educational levels between men and women. It does not need much scraping.
- https://www.cbs.nl/nl-nl/maatwerk/2019/19/percentage-mensen-in-opleidingsniveau-en-leeftijdgroep Dataset about the educational levels per province. It does not need much scraping
- https://opendata.cbs.nl/statline/#/CBS/nl/dataset/84469NED/table?ts=1558465695553 Dataset about the unemployment rate per province. It does not need much scraping

*External components*:
 - D3 tip

 *Similar visualization*:
 - https://nl.pinterest.com/kristensosulski/visualizing-unemployment-poverty-and-job-growth/ Website with similar visualization about employment.

 *Hardest part*:
 - Link the visualizations
 - Use several variables for the x-axis of scatterplot with a dropdown menu
 - Create datamap with the different regions and values


<!-- Arbeidsmarkt situatie jongeren tussen 15 en 27 jaar per gemeente in Nederland, met wel of geen uitkering - datamap
Verschillen tussen onderwijsniveau en werkloosheid onder jongeren - stacked barchart
Verloop van werkloosheid onder jongeren over de jaren vergelijking per leeftijdsgroep man en vrouw - linechart


Werkloosheid man en vrouw per leeftijdsgroep - linechart/barchart
Het opleidingsniveau per provincie in combinatie met werkloosheid per gemeente - scatterplot x: % opleidingsniveau y: werkloosheid


Jeugdwerkloosheid met linechart man en vrouw -->

<!-- datamap met kleuren Werkloosheid
scatterplot met y as werkloosheid, x as met verschillende variabelen
Sun burst met bedrijfstak per provincie als je klikt op datamap -->
