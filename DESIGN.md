# Design document

Name: Tim de Boer

Student number: 11202351

__Data Sources__
---
This paragraph contains a list of the data sources used for the final project of the programming minor:

- https://www.verkiezingsuitslagen.nl/verkiezingen/detail/PS20190320/684845

This dataset contains the results of the elections of the Provinciale Staten from 2019, including the attendance rate. The dataset contains all the practical information I need for my visualizations, so it does not need much scraping. The download is a CSV file which I convert to a JSON file with the municipalities as objects.

- https://www.cbs.nl/nl-nl/maatwerk/2019/19/percentage-mensen-in-opleidingsniveau-en-leeftijdgroep

This dataset contains the average educational level of the citizens per province. The latter gives a little difficulty as the first dataset has information per municipality. Luckily, the file does not need much scraping. It is also a CSV file which I, again, convert to a JSON file. This time with the province as objects.

- https://opendata.cbs.nl/statline/#/CBS/nl/dataset/84341ned/table?ts=1559560414075

This dataset contains data about the income of household per municipality. The dataset does not need much scraping, only convertion from CSV to JSON. This time the municipalities are the objects.
