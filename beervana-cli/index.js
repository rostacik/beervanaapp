const scrapeIt = require("scrape-it");
var scb = require("./scrapeBeervana");

scb().then(page => {
    console.log(page.beer);
});