const Text = require('../models/textModels');
const { Op } = require('sequelize');

const textController = {
    createText: async (req, res) => {
        try {
            await Text.create({
                name: req.body.name,
                telefone: req.body.telefone,
                email: req.body.email
            });
            res.redirect('/texts');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getTextById: async (req, res) => {
        try {
            const text = await Text.findByPk(req.params.id);
            if (!text) return res.status(404).json({ message: 'Text not found' });
            res.render('text/show', { text });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getAllTexts: async (req, res) => {
        try {
            const texts = await Text.findAll();
            res.render('text/index', { texts });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('text/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const text = await Text.findByPk(req.params.id);
            if (!text) return res.status(404).json({ message: 'Text not found' });
            res.render('text/edit', { text });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    updateText: async (req, res) => {
        try {
            await Text.update(
                {
                    name: req.body.name,
                    telefone: req.body.telefone,
                    email: req.body.email
                },
                { where: { id: req.params.id } }
            );
            res.redirect('/texts');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    deleteText: async (req, res) => {
        try {
            await Text.destroy({ where: { id: req.params.id } });
            res.redirect('/texts');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    searchTexts: async (req, res) => {
        try {
            const search = req.query.search || '';
            const texts = await Text.findAll({
                where: {
                    name: { [Op.like]: `%${search}%` }
                }
            });
            res.json({ texts });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    searchByEmail: async (req, res) => {
        try {
            const email = req.query.email || '';
            const text = await Text.findOne({ where: { email } });
            res.json({ text });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
};

module.exports = textController;