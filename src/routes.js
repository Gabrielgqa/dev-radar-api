const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'API OK!' });
});

routes.post('/devs', async (req, res) => {
  const { git_username, techs } = req.body;
  const response = await axios.get(`https://api.github.com/users/${git_username}`);
  const { name = login, avatar_url, bio } = response.data;
  const techsArray = techs.split(',').map(tech => tech.trim());

  const dev = await Dev.create({
    git_username,
    name,
    avatar_url,
    bio,
    techs: techsArray
  });

  return res.status(200).json(dev);

})

module.exports = routes;