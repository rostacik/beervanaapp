var scb = require('beervana-scraper');

/**
 * yeeeea, format that object, yeeeeaaaa, like that * 
 * @param {beer} obj object to be serialized
 * @returns {string} nice result
 */
function objToString(obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + ' : ' + obj[p] + '\n';
        }
    }
    return str;
}

scb().then(page => {
    for (let beer of page.beer) {
        console.log(objToString(beer));
    }
});