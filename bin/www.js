const express = require('express');
const app = express();


const port = 8888;

app.listen(port, function () {
	console.log(`http://localhost:${port}`);
});

