let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
const PORT = 3002; 
let pg = require('pg');

//setting up connection to database
let pool = new pg.Pool({
    port: 5432,
    database: 'registrar',
    max: 20,
    host: 'localhost',
    user: 'allina'
});

// pool.connect((err, db, done) => {
//     if(err) {
//         return console.log(err);
//     }
//     else {
//         db.query('SELECT * FROM students', (err, table) => {
//             done();
//             if (err) {
//                 return console.log(err);
//             }
//             else {
//                 console.log(table.rows);
//             }
//             })
//         }
//     });

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/search-students', function (req,res) {
    console.log("app.get function");
    pool.connect((err, db, done) => {
    if(err) {
        return console.log(err);
    }
    else {
        db.query('SELECT * FROM students', (err, table) => {
            console.log("in process");
            done();
            if (err) {
                return console.log(err);
            }
            else {
                console.log(table.rows);
            }
            })
        }
    });
})

app.listen(PORT, () => console.log('listening on port' + PORT));
