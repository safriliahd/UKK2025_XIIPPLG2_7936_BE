const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const tasksRoutes = require('./routes/tasksRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/tasks', tasksRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});