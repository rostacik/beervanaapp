#Introduction
Small [beervana](http://beervana.sk/) project to test NodeJS apps in Azure cloud. Parts of app scrapes beervana page, displays data on command line, saves data to Azure table storage and presents them on page, or offers API that other developers can talk to. 

#App parts
- beervana-scraper - can scrape www.beervana.sk page, knows what to search for, returns Promise. Resolves, when data procesed and parsed. Returns array with beers available and with data about beer.
- beervana-cli - CLI app to nicely format data about beer for your console.
- beervana-webjob - uses beervana-scraper and saves data to Azure for later reference.
- beervana-api - API with all the logged data for your pleasure.
- beervana-web - web app that presents data from API.

#CLI app setup
You need to download beervana-scraper and beervana-cli. run npm install inside beervana-cli, run node index.js.