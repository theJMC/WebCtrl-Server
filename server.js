var express = require("express"); var app = express(); app.set("view engine", "ejs")

app.get('/api', (req, res) => { res.render('about');});

app.listen(3000);