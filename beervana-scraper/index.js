const scrapeIt = require('scrape-it')

function scrapeBeervana() {
    return scrapeIt('http://beervana.sk/', {
        beer: {
            listItem: 'div.beerlising',
            data: {
                beerName: {
                    selector: 'div.center-box span',
                    how: 'text',
                    convert: x => x.trim().replace(/\n/g, ' | ').replace(/\t/g, '')
                },
                remaining: {
                    selector: 'div.remain-txt span',
                    how: 'text',
                    convert: x => x.replace(/Nezmeškaj/gi, '').replace(/Novinka/gi, '')
                },
                description: {
                    selector: 'div.share-open div.center-box p',
                    how: 'text'
                }
            }
        }
    });
}

module.exports = scrapeBeervana;