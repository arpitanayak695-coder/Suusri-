const mongoose = require('mongoose');

// Local MongoDB Connection String
const localURI = 'mongodb://127.0.0.1:27017/suusriAi';

mongoose.connect(localURI)
  .then(() => console.log('✅ MongoDB Local Database Connected Successfully!'))
  .catch((err) => console.error('❌ Connection Error:', err));