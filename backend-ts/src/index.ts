import express from 'express';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Mount your API routes
app.use('/api', routes);

app.get('/', (_req, res) => {
  res.send('Express backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
