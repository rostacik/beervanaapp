const scrapeIt = require('scrape-it');

function scrapeBeervana() {
    return scrapeIt('http://beervana.sk/', {
        beerStyles: {
            listItem: 'div.beer-style div.filter-box ul li',
            data: {
                beerTypeName: {
                    selector: 'span a',
                    how: 'text'
                },
                beerCode: {
                    selector: 'span.triangle-box',
                    how: 'css',
                    convert: function(x) {
                        let res = x['border-left'].match(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi);

                        if (res[0]) {
                            return res[0];
                        } else {
                            throw new Error("color code for beer not found");
                        }
                    }
                }
            }
        },
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
                },
                beerStyle: {
                    selector: 'div.triangle-boxright',
                    how: 'css',
                    convert: function(x) {
                        let res = x['border-right'].match(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi);

                        if (res[0]) {
                            return res[0];
                        } else {
                            throw new Error("color code for beer not found");
                        }
                    }
                }
            }
        }
    }, (err, page) => { //post process beer styles
        if (err) {
            console.log("There was an error " + err);
        }

        if (page && page.beer) {
            for (let oneBeer of page.beer) {
                if (oneBeer.beerStyle) {
                    let foundStyle = page.beerStyles.find((style) => {
                        return style.beerCode === oneBeer.beerStyle;
                    });

                    if (foundStyle) {
                        oneBeer.beerStyle = foundStyle.beerTypeName;
                    }
                }
            }
        }
    });
}

module.exports = scrapeBeervana;