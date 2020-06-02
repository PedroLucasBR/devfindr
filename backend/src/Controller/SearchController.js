const Dev = require('../models/Dev');
const parseStringAsArrey = require('../utils/parseStringAsArrey');

module.exports = {
    async index(req, res) {
        const { latitude, longitude, techs } = req.query;

        const techsArrey = parseStringAsArrey(techs);

        //Buscar em um raio de 10Km
        //Filtrar por tecnologias

        const devs = await Dev.find({
            techs: {
                $in: techsArrey,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, //Distância em metros
                },
            },
        });

        return res.json({ devs });
    }
}