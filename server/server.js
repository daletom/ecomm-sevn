const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
const bodyParser = require('body-parser');
const ImgixAPI = require("imgix-management-js");
const imgix = new ImgixAPI({
    apiKey: `ak_5adc6acc31ea10c0716132049da5d3312014a74e4b90c80d4fd301f13d916412`
});

app.use(bodyParser.json());
//deleted this from cors {origin: 'http://localhost:8080'}
app.use(cors());
// new
app.use(express.urlencoded({ extrended: true }));

/*let products = imgix.request('assets/55e4d9390d42e03905934ad4')
.then(response => console.log(JSON.stringify(response, null, 2)))
.catch(err => console.log(JSON.stringify(err)));
[
    {
        id: '1',
        title: 'A New Hope',
        episode_id: 4,
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
        image_url: 'https://tom.imgix.net/api/films/1.jpg'
    },
    {
        id: '2',
        title: 'The Empire Strikes Back',
        episode_id: 5,
        director: 'Irvin Kurshner',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1980-05-17',
        image_url: 'https://tom.imgix.net/api/films/2.jpg'
    }
];*/

app.get('/products', (req, res) => {
    let products = imgix.request('assets/55e4d9390d42e03905934ad4?filter[categories]=Game%20of%20Thrones')
    .then(response => res.send(response))
    .catch(err => console.log(JSON.stringify(err)));
    
});

app.get('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(product => product.id === id);
    res.send(product);
});

//new
app.get('/', (req, res) => {
    res.send('Hi! Server is listening on port ${port}')
});

// starting the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))