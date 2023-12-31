const app = require('./app');
const { config } = require('dotenv');
config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting the server: ${err}`);
  } else {
    console.log(`App is running at http://localhost:${PORT}`);
  }
});
