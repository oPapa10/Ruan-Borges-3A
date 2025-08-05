//crie o conteudo deste arquivo vendaController.js com o seguinte conteudo: tabela de vendas com os campos: id, data, valor, quantidade, produto_id

const Venda = require('../models/vendaModel');

const vendaController = {
    createVenda: async (req, res) => {
        try {
            await Venda.create({
                data: req.body.data,
                valor: req.body.valor,
                quantidade: req.body.quantidade,
                produto_id: req.body.produto_id
            });
            res.redirect('/vendas');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getVendaById: async (req, res) => {
        try {
            const venda = await Venda.findByPk(req.params.id);
            if (!venda) return res.status(404).json({ message: 'Venda not found' });
            res.render('vendas/show', { venda });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    getAllVendas: async (req, res) => {
        try {
            const vendas = await Venda.findAll();
            res.render('vendas/index', { vendas });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('vendas/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const venda = await Venda.findByPk(req.params.id);
            if (!venda) return res.status(404).json({ message: 'Venda not found' });
            res.render('vendas/edit', { venda });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    updateVenda: async (req, res) => {
        try {
            await Venda.update(
                {
                    data: req.body.data,
                    valor: req.body.valor,
                    quantidade: req.body.quantidade,
                    produto_id: req.body.produto_id
                },
                { where: { id: req.params.id } }
            );
            res.redirect('/vendas');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    deleteVenda: async (req, res) => {
        try {
            await Venda.destroy({ where: { id: req.params.id } });
            res.redirect('/vendas');
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
};

module.exports = vendaController;