const fs = require('fs');
var request = require('request');
const csvParser = require('csv-parser');

const resultJSON = {
    conversion_key : "" ,
    json : []
};

module.exports = function(app){
    
    app.post('/notes', (req, res) => {
    
        //req = payLoad;

        request.get(req.body.csv.url, function (error, response, body) {
            if (!error && response.statusCode == 200) 
            {
                fs.appendFile('addresses.csv', body, 
                    (err) => {if (err){ throw err;}})
                }
        });

        fs.createReadStream("./addresses.csv").pipe(csvParser({ headers : req.body.csv.select_fields }))
        .on('data', (data) => {
            resultJSON["json"].push(data); 
        })
        .on('end', () => {
            var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var newAlphabet = "";

            for(var i = 0; i < alphabets.length; i++){
                newAlphabet += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
            }

            resultJSON["conversion_key"] = newAlphabet;
            res.send(resultJSON);
        });

    })
}