var express = require('express');

var adminRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var books = [
    {
        id : '978-0641723445',
        cat : ['book','hardcover'],
        title : 'The Lightning Thief',
        author : 'Rick Riordan',
        series_t : 'Percy Jackson and the Olympians',
        sequence_i : 1,
        genre_s : 'fantasy',
        inStock : true,
        price: 12.50,
        pages_i : 384,
        read: false,
        bookId: 656
    }
    ,
    {
        id : '978-1423103349',
        cat : ['book','paperback'],
        title : 'The Sea of Monsters',
        author : 'Rick Riordan',
        series_t : 'Percy Jackson and the Olympians',
        sequence_i : 2,
        genre_s : 'fantasy',
        inStock : true,
        price : 6.49,
        pages_i : 304,
        read: false,
        bookId: 24280
    }
    ,
    {
        id : '978-1857995879',
        cat : ['book','paperback'],
        title : 'Sophies World : The Greek Philosophers',
        author : 'Jostein Gaarder',
        sequence_i : 1,
        genre_s: 'fantasy',
        inStock : true,
        price : 3.07,
        pages_i : 64,
        read: false
    }
    ,
    {
        id : '978-1933988177',
        cat : ['book','paperback'],
        title : 'Lucene in Action, Second Edition',
        author : 'Michael McCandless',
        sequence_i : 1,
        genre_s : 'IT',
        inStock : true,
        price : 30.50,
        pages_i : 475,
        read: false
    }
];

var router = function(nav) {
    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url =
                'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db){
               var collection = db.collection('books');
                collection.insertMany(books,
                    function(err, results){
                        res.send(results);
                        db.close();
                    });
            });
           //res.send('inserting books');
        });

    return adminRouter;
}

module.exports = router;