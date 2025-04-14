import 'reflect-metadata';
import express from 'express';
import {getHome} from "./controllers/home.controller";
import webzApiRoutes from "./routes/webzApi.routes";
import postRoutes from "./routes/post.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', getHome);
app.use('/api', postRoutes)
app.use('/api', webzApiRoutes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
