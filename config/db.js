const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://"+process.env.DB_USER_PASS + "@carnet.zupzvmn.mongodb.net/carnet",
        {
           // useNewUrlParser: true,
           // useUnifiedTopology: true,
        }
    )
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Filed to connect to MongoDB', err));