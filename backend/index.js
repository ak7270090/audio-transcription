const textgears = require('textgears-api');
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

//connectDB();
app.use(cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
    credentials: true
}
));
app.use(express.json());

//route to check error
app.get("/",(req,res)=>{
    res.status(200).send("api running");
});

app.post("/checkerrors", async (req, res) => {


    const script = req.body.data
    var totalSoFar = script.split(' ').length

    
    console.log("total words in string", totalSoFar)

    if (script.length === 0) {
        
            // Handle empty script
            res.status(400).send('Text cannot be empty'); // Use 400 for bad request
       
    }
    else {

        const textgearsApi = textgears('TMvt6WKwtoYLW5BO', { language: 'en-US', ai: true });
        textgearsApi.checkGrammar(script)
            .then((data) => {
                for (const error of data.response.errors) {
                    console.log('Error: %s. Suggestions: %s', error.bad, error.better.join(', '));
                }
                console.log("total error words", data.response.errors.length)
                const responseData = {
                    data: data,
                    totalwords: totalSoFar,
                    errorwords: data.response.errors.length 
                  };
                res.json(responseData);
            })
            .catch((err) => {
                //500 => indicates a server side error
                res.status(400).send('Grammar checking API is not working');
            });
    }

});


//server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
