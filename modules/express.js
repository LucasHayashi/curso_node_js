const express = require('express');
const bodyParser = require('body-parser');
const UserModel = require('../src/models/user.model');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Executa antes de tudo
app.use((req, res, next) => {
    console.log('Request Type: ' + req.method);
    console.log('Content Type: ' + req.headers['content-type']);
    console.log('Date: ' + new Date());
    next();
});

app.set('view engine', 'ejs');
app.set('views', 'src/views')

app.post('/users', async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/views/users', async (req, res) => {
    const users = await UserModel.find({});
    res.render("index", {users});
});

app.get('/users', async (req, res) => {
    try {
        const user = await UserModel.find({});
        res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.patch('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findByIdAndDelete(id);
        res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

const port = 8080;

app.listen(port, () => console.log(`Rodando com Express na porta ${port}`));