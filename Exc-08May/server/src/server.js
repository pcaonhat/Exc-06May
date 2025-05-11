  const express = require('express');
  const app = express();
  const playerRoutes = require('./routes/playerRoutes'); 
  const matchRoutes = require('./routes/matchRoutes'); 

  // Middleware
  app.use(express.json()); // để đọc body dạng JSON

  // Routes
  app.use('/api/players', playerRoutes); 
  app.use('/api/matchPlayers', matchRoutes); 

  // Server listen
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
