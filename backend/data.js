import express from 'express'

const app = express();

fetch('https://backend-powertrack.onrender.com')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
