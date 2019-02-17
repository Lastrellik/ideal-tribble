"use strict";
const express = require('express');
const app = express();
const port = 8080;
app.get('/', (req, res) => {
    console.log(typeof req);
    console.log(port);
    res.sendFile('../main.html', { root: __dirname });
});
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
//# sourceMappingURL=server.js.map