const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
let redisStore = require("connect-redis")(session);
const {createClient} = require("redis");

const { MONGO_PORT, MONGO_IP, MONGO_PASSWORD, MONGO_USER, SESSION_SECRET, REDIS_URL, REDIS_PORT } = require("./config/config");

let redisClient = createClient({
    legacyMode:true,
    socket:{
        host:REDIS_URL,
        port:REDIS_PORT
    }
});
redisClient.connect().catch(console.error)

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

const mongoURL =`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/database?authSource=admin`;

const connectWithRetry = ()=>{

    mongoose.connect(mongoURL,{useUnifiedTopology:true})
        .then(()=>console.log("Successfully connected to DB"))
        .catch((e)=> {
            console.log(e)
            setTimeout(connectWithRetry,5000)
        })

}

connectWithRetry();

app.use(cors({}));
app.enable('trust proxy');
app.use(
    session({
        store: new redisStore({ client: redisClient}),
        secret: SESSION_SECRET,
        resave:false,
        saveUninitialized:true,
        cookie:{
            secure:false,
            resave:false,
            saveUninitialized:true,
            httpOnly:true,
            maxAge:60000
        }
        

    })
)

app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/api/v1",(req,res)=>{
    console.log("nginx c dla balle");
    res.send("<h1>Wesh la zoone alors ça marche ??</h1>");
})

app.use("/api/v1/posts",postRouter);
app.use("/api/v1/users",userRouter);


app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
}) 