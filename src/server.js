const app = require("./app");
const connectDatabase = require("./config/db");

const port = process.env.PORT || 5080;

connectDatabase().then(
  app.listen(port, () => {
    console.log(`Server is listening on port:${port}`);
    console.log(`Check health: http://localhost:${port}/health`);
  })
);
