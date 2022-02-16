import express, { Application } from 'express';
import 'dotenv/config'
import db from './config/database.config'; //our db connection (Sequelize instance) 

// ====== Connect to Database ======
db.sync().then(() => {
    console.log(`connected to the database: ${process.env.DB_NAME}`);
}).catch((err: any) => {
    console.log(err);
})

const app: Application = express();
const port: number | string = process.env.PORT || 5000;

// Request Parsing
app.use(express.json());

// ========== Routing ==========
import todoRouter from './routes/todoRouter';
app.use('/api/v1', todoRouter);


app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
}) 