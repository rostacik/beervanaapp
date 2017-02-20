#Introduction
Small [beervana](http://beervana.sk/) project to test NodeJS apps in Azure cloud. App scrapes beervana page, saves data and presents them and offers API that other developers can talk to. 

#App parts
- beervana-scraper - can scrape www.beervana.sk page, knows what to search for, returns Promise. Resolves, when data procesed and parsed. Returns array with beers available and with data about beer.
- beervana-cli - CLI app to nicely format data about beer for your console.
- beervana-webjob - uses beervana-scraper and saves data to Azure for later reference.
- beervana-api - API with all the logged data for your pleasure.
- beervana-web - web app that presents data from API.