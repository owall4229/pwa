const http = require('http');

export default async function handler(req, res) {
    const url = req.query.url;

    if (!url) {
        res.status(400).send('Missing "url" parameter');
        return;
    }

    http.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            res.status(response.statusCode).send(data);
        });
    }).on('error', (err) => {
        res.status(500).send('Error while fetching: ' + err.message);
    });
}
