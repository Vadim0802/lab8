import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const CONTACTS = [];

const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve(fileURLToPath(import.meta.url), '..');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'wwwrot')));

app.get('/img/:id', (req, res) => {
  const id = req.params.id;
  fs.readdir(path.join(__dirname, 'wwwrot', 'img'), (_, imagesFiles) => {
    const matchImage = imagesFiles.find((img) => {
      const [name] = img.split('.');
      return name === id;
    });
    if (matchImage) {
      res.sendFile(path.join(__dirname, 'wwwrot', 'img', matchImage));
    } else {
      res.sendFile(path.resolve(__dirname, 'wwwrot', 'view', 'notFound.html'));
    }
  });
});

app.post('/add', (req, res) => {
  CONTACTS.push(req.body);
  res.status(201).json({ list: CONTACTS });
});

app.get('/', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'wwwrot', 'index.html'));
});

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'wwwrot', 'view', 'notFound.html'));
});

app.listen(PORT, () => {
  console.log('Server has been started...');
});