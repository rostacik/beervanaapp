# Beervana beer state NodeJS Azure App

## Introduction

Small [beervana](http://beervana.sk/) project to test NodeJS apps in Azure cloud. Parts of app scrapes beervana page for available beer info and levels, displays data on command line, saves data to Azure table storage and presents them on page, or offers API that other developers can talk to, if they want to create own clients.

## App parts

- **beervana-scraper** - can scrape www.beervana.sk page, knows what to search for, returns Promise. Resolves, when data is procesed and parsed. Returns array with beers available and with data about beer.
- **beervana-cli** - CLI app to nicely format data about beer for your console.
- **beervana-webjob** - uses beervana-scraper and saves data to Azure for later reference. (missing settings config.json file for your own table storage)
- **beervana-api** - API with all the logged data for your pleasure. (TODO)
- **beervana-web** - web app that presents data from API. (TODO)

## beervana-scraper app setup

You dont need to npm i inside this folder, since this is just dependency used in other apps.

## beervana-cli app setup

You need to download beervana-scraper and beervana-cli. **run npm install inside beervana-cli, run node index.js**. beervana-scraper is "local" file dependency, it will be copied from beervana-scraper folder.

## beervana-webjob app setup

Application is using beervana-scraper to download data from beervana page and saves them to Azure Table storage. config.json file with following schema is expected to be in the root of beervana-webjob. This file is not part of project. Run **node index.js** to run the job 1x.

```javascript
{
    "STORAGE_NAME": your_value,
    "STORAGE_KEY": your_value,
    "PARTITION_KEY": your_value,
    "TABLE_NAME": your_value
}
```