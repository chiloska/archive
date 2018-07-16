let algoliasearch = require('algoliasearch'),
    DataStore = require('nedb'),
    db = new DataStore({ filename: 'data.db', autoload: true });

let ebook_page = 'articles.production.ebook-article'
let email_solo = 'articles.production.solo-ad'
let autoresponse_article = 'articles.production.autoresponder-article'

let client = algoliasearch('NUAQM2MEG8', 'f880cb52bac271f3af08abcd28096c35');

let index = client.initIndex('articles.production.autoresponder-article');

db.loadDatabase((err) => {
    console.log('Load BD')
})


for (let i = 1; i < 33; i++) {
    getLurnData(0, i)
}

///getSoloAdOffer(0);


//findAll()



function getLurnData(page, nicheNumber) {

    index.search({ query: '', filters: "enabled=1 AND (niche=" + nicheNumber + ")", hitsPerPage: 1000, page: page }, function (err, content) {
        if (err) {
            console.error(err);
        }

        console.log('Niche Number: ' + nicheNumber + ' Items: ' + content.nbHits, 'pages: ' + content.nbPages)

        // for (let record of content.hits) {
        //     //console.log(record)
        //     insertData(record)
        // }

        let ebook_article = {
            "Type": "Email Article",
            "NicheNumber": nicheNumber,
            "hitsNumber": content.nbHits,
            "hits": content.hits
        }

        insertData(ebook_article);

    })
}


function getSoloAdOffer(page) {
    index.search({ query: '', filters: "enabled=1", hitsPerPage: 1000, page: page }, function (err, content) {
        if (err) {
            console.error(err);
        }

        console.log(content)

        // let ebook_article = {
        //     "Type": "Solo Ad",
        //     "hits": content.hits
        // }

        // insertData(ebook_article);
    })
}

function insertData(record) {
    db.insert(record, (err, res) => {
        if (err) { console.log(err) }

        //console.log(res)
    })
}

function findAll() {
    db.find({}, (err, res) => {
        if (err) { console.log(err) }

        console.log(res)
    })
}
