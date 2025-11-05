import express, { json } from 'express';
import cors from 'cors';
import { connectMongo } from './config/db.mongo.js';

const port = 3000;
const app = express();

app.use(json());
app.use(cors());

connectMongo();

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur Express !');
});

import userRoutes from './routes/user.routes.js';
app.use('/api/users', userRoutes);

import bookRoutes from './routes/book.routes.js';
app.use('/api/books', bookRoutes);

import profileRoutes from './routes/profile.routes.js';
app.use('/api/profiles', profileRoutes);

import fullRoutes from './routes/full.routes.js';
app.use('/api/user-full', fullRoutes);

app.use((req, res) => res.status(404).json({ error: 'Route inconnu' }));

app.use((err, req, res, next) => {
    console.error('Erreur serveur :', err.message);
    res.status(500).json({ error: 'Erreur interne au serveur' });
});

app.listen(port, () => console.log(`API prête sur le port http://localhost:${port}`));