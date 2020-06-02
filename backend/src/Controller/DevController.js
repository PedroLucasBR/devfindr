const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArrey = require('../utils/parseStringAsArrey');

//Funções do controller: (index, show, store, update, destroy); 

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = response.data;

            const techsArray = parseStringAsArrey(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }

        return res.json(dev);
    },

    async update(req, res) {
        const { github_username } = req.params;
        const dev = await Dev.updateOne({ github_username }, req.body);

        return res.json(dev);

    },

    async destroy(req, res) {
        const { github_username } = req.params;
        await Dev.deleteOne({ github_username });

        return res.json(`Usuário ${github_username} deletado com sucesso!`);
    }
};