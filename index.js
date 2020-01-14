const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://gabriel:devradar@cluster0-yjuqq.mongodb.net/dbradar?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.get('/', (req, res) => {
  return res.json({ message: 'API OK!' });
});

app.listen(3333);