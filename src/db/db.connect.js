import session from 'express-session';
import MongoStore from 'connect-mongo';

export const baseSession = session({
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/desafio" }),
    secret: 'c0d3r',
    resave: false,
    saveUninitialized: false,
})