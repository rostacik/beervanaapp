var scb = require("beervana-scraper");

scb().then(page => {
    console.log(page.beer);
});