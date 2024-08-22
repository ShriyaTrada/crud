const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const rateLimit = require('./config/rateLimit');

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimit);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.use(errorMiddleware);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
