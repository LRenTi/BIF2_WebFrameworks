const express = require("express");
const cors = require('cors');
const db = require('./db'); // Importieren der db.js
var randomToken = require('random-token');
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    next();
});

app.get("/", (req, res) => {
    // Alle Token Daten ausgeben
    console.log(db.tokens);
    res.status(200).json(db.tokens);
});

app.post("/login", (req, res) => {
    console.log(req.body);

    // Login-Überprüfung mit der Methode aus db.js
    const user = db.login(req.body.email, req.body.password);
    if (user) {
        console.log("Successfully logged in with token: " + user.token);
        res.status(200).json({ Token: user.token });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

app.post("/signup", (req, res) => {
    const { email, password } = req.body;

    // Überprüfung, ob der Benutzer bereits existiert, und Registrierung
    const success = db.signup(email, password);
    if (success) {
        // Erstellen eines neuen Tokens nach erfolgreicher Registrierung
        const token = randomToken(64);
        db.tokens.push({ token, username: email });

        res.status(201).json({ message: "User created successfully", Token: token });
    } else {
        res.status(409).json({ message: "User already exists!" });
    }
});

app.get("/highscores", (req, res) => {

    const highscores = db.highscores.sort((a, b) => b.score - a.score);
    res.status(200).json(highscores);
});

app.post("/highscores", (req, res) => {
    // Token aus dem Header holen
    const token = req.headers.authorization;

    if (db.isAuthenticated(token)) {
        const user = db.getAuthUser(token);
        const { score } = req.body;
        db.addHighscore(user.username, score);
        res.status(201).json({ message: "Score added successfully" });
    } else {
        res.status(401).json({ message: "Invalid token" });
    }
});

app.post("/logout", (req, res) => {
    const token = req.headers.authorization;
    console.log("Logout Token: " + token);

    if (db.isAuthenticated(token)) {
        db.deleteToken(token);
        res.status(200).json({ message: "Successfully logged out" });
    } else {
        res.status(401).json({ message: "Invalid token" });
    }
});

module.exports = app;

