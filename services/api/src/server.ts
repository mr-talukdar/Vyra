import "dotenv/config";
import app from "./app.js";
import environment from "./config/env.js";

app.listen(environment.PORT, () => {
  console.log(`Server started on ${environment.PORT}`);
});
