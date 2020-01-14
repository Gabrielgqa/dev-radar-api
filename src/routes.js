const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'API OK!' });
});

routes.post('/devs', async (req, res) => {
  const { git_username, techs, latitude, longitude } = req.body;
  const response = await axios.get(`https://api.github.com/users/${git_username}`);
  const { name = login, avatar_url, bio } = response.data;
  const techsArray = techs.split(',').map(tech => tech.trim());
  const location = {
    type: 'Point',
    coordinates: [longitude, latitude],
  };

  const dev = await Dev.create({
    git_username,
    name,
    avatar_url,
    bio,
    techs: techsArray,
    location
  });

  return res.status(200).json(dev);

})

module.exports = routes;