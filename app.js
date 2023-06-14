const express = require('express');
const app = express();

const PORT = 8888;

app.set('views', './views/');
app.set('view engine', 'ejs');



app.listen(PORT, function () {
	console.log(`http://localhost:${PORT}`);
});

module.exports = app;