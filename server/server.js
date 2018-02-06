//
// APP ROOT
//

// LOAD IN MODULES
const path = require('path');
const express = require('express');

// CONFIG MODULES
const publicPath = path.join(__dirname, '../public');
// define port to work both local or online
const port = process.env.PORT || 3000;
var app = express();
// config express static middleware
app.use(express.static(publicPath));

// startup the server
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

