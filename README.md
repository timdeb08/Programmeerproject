# Analysis of the reason behind the huge political gain of Forum voor Democratie

Name: Tim de Boer

Student number: 11202351

The final project of the programming minor. For this project I will visualize the gains and losses of the political parties, in specific Forum voor Democatie(FVD), per province/municipality. For the first visualization I will use a data map to visualize the absolute gain of FVD per province/municipality. Second, I will capture the differences in gains/losses between the political parties to show the gains relatively, using a sunburst or pie chart. Finally, I want to analyze whether there is a correlation between the gains of FVD and income differences/educational level/attendance rate per province/municipality. For the latter I want to use a scatterplot.

__Problem Statement__
---
The huge political gain of the party Forum voor Democratie (FVD) was a striking event during the last elections. A party that exists for nearly two years, wins thirteen seats for the Provinciale Staten and beats the coalition. What is the reason behind this success for FVD of the last election? Is there a significant difference between municipalities or is there a correlation between attendance rate and the votes for FVD? With this analysis I want to map and visualize the wins of FVD after the last election using several linked visualizations. Eventually, I try to find a possible cause or explanation for this success. The visualization can be a tool to map the polical differences per province.

__Solution__
---
*Idea*:
- My idea is to visualize and map the wins of FVD and analyze whether there are differences between the provinces or whether there is a correlation between votes and several factors.

*Main features*:
- A datamap of the Netherlands with the colour of each province corresponding to the total win of FVD.
- When a province on the map is clicked, a sunburst will be shown with the wins/losses of the corresponding parties.
- A scatterplot with the votes on the y-axis and dropdown menu for multiple variables on the x-axis, e.g. educational level, income, attendance rate.

*Optional features*:
- Create a mouseover function for the bullets on the scatterplot to show values of specific province.
- Create a mouseover function for the sunburst to show votes per political party.

*Visualizations*:
![alt text](https://github.com/timdeb08/Programmeerproject/blob/master/file.jpeg)

__Prerequisites__
---
*Data sources*:
- https://www.verkiezingsuitslagen.nl/verkiezingen/detail/PS20190320/684845 Dataset about the results of the election of the Provinciale Staten. It does not need much scraping.
- https://www.cbs.nl/nl-nl/maatwerk/2019/19/percentage-mensen-in-opleidingsniveau-en-leeftijdgroep Dataset about the educational levels per province. It does not need much scraping.
- https://opendata.cbs.nl/statline/#/CBS/nl/dataset/84341ned/table?ts=1559560414075 Dataset about the income differences per province. Dataset is for the year 2017, so it does not correspond to the year of the election.

*External components*:
 - D3 tip

 *Similar visualization*:
 - https://www.verkiezingsuitslagen.nl/verkiezingen/detail/PS20190320/684845 This website shows similar visualizations of the results of the election.

 *Hardest part*:
 - Link the visualizations
 - Use several variables for the x-axis of scatterplot with a dropdown menu
 - Create datamap with the different regions and values
