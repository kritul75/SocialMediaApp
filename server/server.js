const express= require("express")
const cors= require("cors");
const app= express();
const db= require("./Db/db");
const userApi= require("./routes/user");
const postApi= require("./routes/post");
const profileApi= require("./routes/profile");
const bodyparser = require('body-parser');

const port = process.env.PORT || 8080
db();
// setting middleware
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.json());
app.use("/api/users",userApi);
app.use("/api/posts",postApi);
app.use("/api/profile",profileApi);
// setting routes
app.get('/', (req, res) => {res.send('Social media!')})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})