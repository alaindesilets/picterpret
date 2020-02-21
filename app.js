const express = require('express');
const app = express();

app.use(express.static('HTML'));
app.use(express.static('CSS'));
app.use(express.static('JS'));


// app.get('/', (req, res) => {
//     res.sendFie
// });

app.listen(3000, () => console.log('Gator app listening on port 3000!'));