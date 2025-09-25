import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorMiddleware.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

app.use('/api/dashboard', dashboardRoutes);


const PORT = process.env.PORT || 5000;


connectDB()
.then(() => {
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
console.error('Failed to connect DB', err);
process.exit(1);
});