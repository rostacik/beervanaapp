var azure = require('azure-storage');
var nconf = require('nconf');
var scraper = require('beervana-scraper');
var uuid = require('node-uuid');

//config data from config.json
nconf.argv().env().file({ file: __dirname + '\\config.json' });

var tableName = nconf.get("TABLE_NAME");
var partitionKey = nconf.get("PARTITION_KEY");
var accountName = nconf.get("STORAGE_NAME");
var accountKey = nconf.get("STORAGE_KEY");

var tableSvc = azure.createTableService(accountName, accountKey);
var entGen = azure.TableUtilities.entityGenerator;
var beerBatch = new azure.TableBatch();

scraper().then(page => {
    for (let beer of page.beer) {
        var beerBatchItem = {
            PartitionKey: entGen.String(partitionKey),
            RowKey: entGen.String(uuid()),
            beerName: entGen.String(beer.beerName),
            remaining: entGen.String(beer.remaining),
            description: entGen.String(beer.description),
            beerStyle: entGen.String(beer.beerStyle),
            savedDate: entGen.DateTime(new Date(Date.now()))
        };

        beerBatch.insertEntity(beerBatchItem, { echoContent: true });
    }

    tableSvc.executeBatch(tableName, beerBatch, function (error, result, response) {
        if (!error) {
            for (let beer of page.beer) {
                console.log(beer.beerName);
            }
        }
    });
});