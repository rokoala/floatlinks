const express = require('express');
const app = express();

const PORT = 3001;
app.use(bodyParser.json());
app.use((req,res,next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`,req.body);
    next();
})
app.use(router);
app.listen(PORT, () => console.info(`Server has started on port ${PORT}...`))