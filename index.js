const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const shortUrl = require('./Models/shortUrl');
dotenv.config()
const app = express();

const PORT = process.env.PORT || 8000;
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.get('/', (req, res) => {
    let url = req.query.sUrl;
    if (url) {
        res.render('index', { sUrl: process.env.URL + url });
    } else {
        res.render('index', { sUrl: "" });
    }
    
})
app.get('/:id', async (req, res) => {
    const data = await shortUrl.findOne({ shortUrl: req.params.id });
    if (data === null) res.sendStatus(404);
    res.redirect(data.fullUrl);
})

app.post('/shortUrl', async (req, res) => {
    const url = await shortUrl.create({ fullUrl: req.body.fullurl })
    res.redirect('/?sUrl=' + url.shortUrl);
})

app.listen(PORT, () => {
    console.log("Server Running at http://localhost:" + PORT);
})