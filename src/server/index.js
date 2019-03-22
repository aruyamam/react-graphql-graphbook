import express from 'express';

const app = express();

app.get('*', (req, res) => res.send('Hello Wolrd'));

app.listen(8000, () => console.log('Listening on port 8000!'));
