const express = require("express")
const app = express()
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require("dotenv").config();
const cors = require("cors")

const bookRoutes = require('./src/books/book.route')
const orderRoutes = require("./src/orders/order.route")
const userRoutes = require("./src/users/user.route") 
const adminRoutes = require("./src/stats/admin.stats")

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)


app.get("/", (req, res) => {
    res.send("API root working")
})

async function main() {
    await mongoose.connect(process.env.DB_URL);
    // app.listen(port, () => {
    //     console.log(`server running on port ${5000}`)
    // });
}


// v2oGejwSfZkXYj1h


main().then(() => console.log ("Mongodb connect successfully!")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})