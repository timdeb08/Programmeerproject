# Project report

Project of the Programming Minor 2019

Name: Tim de Boer

Student number: 11202351

__Info__
---
This project visualizes the results of the last Provinciale Staten elections in the Netherlands, with a specific focus on the huge gain of the new political party Forum voor Democratie. The user can get information about the total votes of Forum voor Democratie or the party with the most votes per municipality, visualized with the use of a data map. Second, the political diversion of a specific municipality is shown by a pie chart. And finally, the scatterplot displays the values of the total votes of Forum voor Democratie per municipality and the attendance rate/median standardized income of a municipality.
![alt text](https://github.com/timdeb08/Programmeerproject/blob/master/doc/scherm1.jpg)
![alt text](https://github.com/timdeb08/Programmeerproject/blob/master/doc/scherm2.jpg)

__Design components__
---
__Data sources and structure__

Two datasets are used and merged into one, which can be found in the 'verkiezing.json' file. The dataset represents the results of the elections of the Provinciale Staten and the median standardized income per municipality.

__Data map__

The first visualization displays the map of the Netherlands and its municipalities and it colors them based on the total votes Forum voor Democratie obtained during the last elections. On the other hand, the party with most votes is shown on the data map.

__Pie chart__

The pie chart shows the results of the election of a specific municipality based on the chosen municipality using a click function.

__Scatterplot__

The last visualization displays on the one hand the attendance rate or median standardized income and on the other hand the total votes of Forum voor Democratie.

__Dropdown menus__

Both the data map as the scatterplot come with a dropdown menu where the user can choose between two variables. The data map can display the total votes of Forum voor Democratie or the party who've won the elections per municipality. The scatterplot can display both the attendance rate or the median standardized income.


__Technical components of the design__
---
__Data structure__

The first dataset contained the results of the elections and was very easy to convert from a CSV file to a JSON file. All the municipalities were up to date with the reclassifications made at the beginning of 2019, so the dataset could directly been used for the visualizations.

The second dataset was a small file with only the median standardized income per municipality, but it was based on the reclassification of 2018. So, at first, I had to find all the municipalities which got merged into one new municipality. Thereafter, I had to convert all the data manually, so it took quite long to make this a workable dataset.

For the data map I also had to find a map of the Netherlands with the new municipal boundaries. This was really hard to find and it took me about two/three days to finally find one. So this was a bit of a pity.

__Data map__

As mentioned earlier, the map of the Netherlands was implemented using Datamaps. I did find the right coordinates quite fast and could visualize the map really quick. Then, I had to match the dataset with right municipality, which went quite easy as well. In the beginning I did only visualize the map and the results of Forum voor Democratie per municipality using a tooltip. The map had no colors referring to the differences in the results and no dropdown to switch between options.

The colors were added a fews day later to show the differences between the municipalities. Thereafter, I had to create a new dataset within the Javascript file to find the party with the most votes per municipality. It was really easy to find the highest amount of votes per municipality, but it was a bit harder to find the corresponding party. But, when the dataset was finally ready, I could create the dropdown and coloring for the second option two.

At the end, the data map displays both the result of Forum voor Democratie as the party with the most votes per municipality. For the second option, every party has its own color so the user can easily recognize which party has won in a municipality. However, the color schemes only consist of 12 colors, so not every party has its own color.

__Pie chart__

After I had created the map I could work on the pie chart and as the dataset was already useful, I could immediately display it. However, I created a new dataset within the Javascript file to remove the parties who had no votes within a municipality. But this was quite easy, so it was no problem.

As the data map comes with a 'click' function, the pie chart corresponds to the municipality which is clicked on. It shows the political diversion in the municipality and gives a relative view on the total votes Forum voor Democratie obtained.

__Scatterplot__

The scatterplot is used to visualize whether there is a possible correlation between both the attendance rate as the median standardized income and the total votes of Forum voor Democratie. For the scatterplot I had to merge the two datasets, because I wanted to use a dropdown menu. As mentioned, this took a bit long but I could create the scatterplot quite fast. On the X-axis a user can choose between attendance rate and income and on the Y-axis the total votes of Forum is shown.

The scatterplot is connected to the data map using the 'click' function. When a municipality is clicked on, the scatterplot shows all the municipalities in the same province. This makes the scatterplot interactive, because that was bit of a challenge. It was not possible to click on a municipality and show only that one municipality on the scatterplot. So I had to find a solution for this and decided to show all the municipalities in the same province to keep the interactivity.

__Dropdown menus__

The dropdown menus were not that difficult to create, but to update every element of the SVG was really challenging. First, the dropdown are created within the Javascript file, where a span and the values are implemented. Then, I had to write a function when the value chosen by the user changed. This was more difficult, because for both visualizations the updates were different. This took me longer than I expected, but finally it worked. The user has the option to update the visualization when using the data map and the scatterplot.  

__Website__

The website was very basic and I've only used bootstrap to create a navbar to navigate between multiple HTML pages. For the home- and introduction page I also used side navbars to include an image or different background color to beautify the webpage.

For the analysis HTML file I've used the same bootstrap for the navbar, but I also included wrappers to organize the visualizations. It gave a more structured look to the webpage and made it easy to put all the SVG-elements at the right place.

__Difficulties__
---
__Multiple datasets__

I've found it really hard to work with several datasets. For this project it was a bit difficult to easily merge the dataset, because of the reclassification in 2019. As mentioned earlier, I had to merge them manually because I couldn't find a proper way to merge it by writing a piece of code. This took a long time and so I've missed the opportunity to do other things.

__Link the views__

The second challenge I've met during this project was to link all the three visualizations. At first, I could easily link them because I displayed the visualizations as easy as possible. Thereafter, when I had to create titles, legends and dropdown menus, it was much harder to link them properly.

Unfortunately, I didn't had the time to properly update the linked visualizations when using the click function. Now I remove the SVG at first and then create a new one, so this does not give the smooth transition when choosing between different municipalities.

__Small things resulted in large problems__

There were a few things which I thought were easy to fix, but then I found out later on that it was not that easy.. For example, the dropdown menu for the data map was almost done, but I only had to fix one 'small' bug. When I clicked on the map, an error popped up that he could not get the value of 'undefined'. Later, I found out that I selected all the paths, not only the paths of the data map. But this small thing took me a whole weekend to fix. So, planning-wise I can do a bit better next time.

__Decisions__
---
There is only decision which was different than the design I've made at the beginning of the project which is the third variable of the dropdown menu for the scatterplot. It didn't had the time to also convert the third dataset into one, as it had the same reclassification problem.

Further, I think that the decisions I've made are clear and good. Only the update function combined with the click function is the wrong decisions I've made, but this was more a time problem than a decision problem.

__The future__
---
I think the results give a clear representation of the political situation in the Netherlands and especially for the political party Forum voor Democratie. It is a helpful tool for presenting the data I've used. However, with more time you could implement the third variable for the dropdown menu of the scatterplot.
Besides, the values in the scatterplot are all absolute so Forum voor Democratie automatically obtaines more votes in larger municipalities like Amsterdam and Rotterdam. Next, the income is based on the median of a municipality. If there are more outliers in a municipality, the average can give another value for the income and result in larger differences than the median standardized income.
