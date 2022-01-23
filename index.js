let express = require("express");
require('dotenv').config();
const cors = require("cors");
let app = express();

app.use(cors());

// I need to add functionality to parse the json body
app.use(express.json());

let port = process.env.PORT

app.get('/', (req,res) => {
    res.send("I am working")
})

const authRoutes = require('./routes/auth');
app.use(authRoutes);

const usersRoutes = require('./routes/users');
app.use(usersRoutes);

const contactRoutes = require('./routes/contact');
app.use(contactRoutes);

app.listen(port, () => {
    console.log("listening on prt", port);
})