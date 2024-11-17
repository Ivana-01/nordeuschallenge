const express = require('express');
const mongoose = require('mongoose');
const filterData = require ('./data/filterData');
const cors = require('cors');
const statsController = require('./controllers/statsController');
const User = require('./models/user');

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:3000',
  }
));

const dbURI = 'mongodb+srv://node1user:user1234@cluster0.f2jm7ay.mongodb.net/nordeus?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Pokretanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.get('/', async(req, res) => {
  try {
    await filterData();
    res.status(200).json({ message: 'Data Imported Successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error importing data', error });
  }
});

app.post('/api', async (req, res) => {
  try {
    const { user_id } = req.body;
    console.log('server obradjuje:' + user_id)
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    const user = await User.findOne({ user_id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('server:' + user)
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error in API:', error); // Loguje detalje greške
    return res.status(500).json({ error: 'Server error' }); // Vraća JSON format
  }
});


app.get('/api/user_stats/:user_id', statsController.getUserStats);
app.get('/api/game_stats/:user_id', statsController.getGameStats);