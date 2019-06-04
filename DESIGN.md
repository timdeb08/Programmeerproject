# Design document

Name: Tim de Boer

Student number: 11202351

__Data Sources__
---
This paragraph contains a list of the data sources used for the final project of the programming minor:

- https://www.verkiezingsuitslagen.nl/verkiezingen/detail/PS20190320/684845

This dataset contains the results of the elections of the Provinciale Staten in 2019, including the attendance rate. The dataset contains all the practical information I need for my visualizations, so it does not need much scraping. The download is a CSV file which I convert to a JSON file with the municipalities as object.

- https://www.cbs.nl/nl-nl/maatwerk/2019/19/percentage-mensen-in-opleidingsniveau-en-leeftijdgroep

This dataset contains the average educational level of the citizens per province. The latter gives a little difficulty as the first dataset has information per municipality. Luckily, the file does not need much scraping. It is also a CSV file which I, again, convert to a JSON file. This time with the province as objects.

- https://opendata.cbs.nl/statline/#/CBS/nl/dataset/84341ned/table?ts=1559560414075

This dataset contains data about the income of household per municipality. The dataset does not need much scraping, only convertion from CSV to JSON. This time the municipalities are the objects.

__Technical components__
---
Components | Description | Implementation
---------- | ----------- | --------------
Data map | A map of the Netherlands on which all the municipalities are shown with the corresponding seats Forum voor Democratie has won this election in that particular municipality. It also has a click function for the municipalities. When a municipality is clicked on, the other components update. | For the data map we need a map of the Netherlands and the first dataset from the list of data sources to visualize this component.
Pie chart / Sunburst | This visualization updates with the click function of the data map. If a municipality is clicked on, this chart will show the seats of all the parties of that municipality. | For this visualization we need, again, the first dataset as this dataset contains not only information about FVD but also of all the other parties.
Scatterplot | The scatterplot visualizes whether there is a correlation between an increase of seats for FVD in a specific municipality and the attendance rate/income difference/educational level of the municipality. With this I try to find an argument for the huge success of the party. | For this dataset we need to combine the first dataset and the dataset about educational level and income difference to plot the data points.

__Plug ins__
---
- D3 data maps
- Color schemes derived from Color Brewer
- D3-tip
