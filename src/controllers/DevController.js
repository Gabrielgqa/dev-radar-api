const axios = require('axios');
const Dev = require('../models/Dev');
const stringAsArray = require('../utils/stringAsArray');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    return res.status(200).json(devs);
  },

  async store(req, res) {
    const { git_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ git_username });

    if(!dev) {
      const response = await axios.get(`https://api.github.com/users/${git_username}`);
    
      const { name = login, avatar_url, bio } = response.data;
      
      const techsArray = stringAsArray(techs);
      
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
    }

    return res.status(200).json(dev);
  }
}