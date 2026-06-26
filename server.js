const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const connectDB = require("./src/config/db");

// Database Connection
connectDB();

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});