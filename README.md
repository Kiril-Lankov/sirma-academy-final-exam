# sirma-academy-final-exam

Football Tournament Task
Steps:

First I create a new project using Vite + React
Now I create a folder named 'data' where I will store a data from csv files. Here I will drag and drop csv files from the task
Now I create a custom Hook named useCSV.js which will be used for loading and parsing my csv files and reuse for each component.It will load files and parse them into usable data.
Now I create folder 'components' in my 'src' folder where I will store my React components.
Now I create content for each of my React components. They are as following:
1.HomePage - this components keeps data about all matches in the tournament 2.MatchDetails - this component keeps data about both teams and a result. Every team is clickable and navigate to TeamDetails component. Every player here is clickable too and navigates to PlayerInfo component where is more information about player (react router used) 3.TeamDetails - this component will show all players in a roster view with search and filter functionality 4.PlayerInfo - this component will show info about players with their name,position, and number

I add some buttons so they can take us back to HomePage and Match details.
I will navigate through components using React Router making some components clickable and linking to other component
I create pages which I connect to my react components content
I add some basic css to make my application responsive friendly
