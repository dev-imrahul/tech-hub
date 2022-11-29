import mongoose from 'mongoose';
import app from './index';

const PORT = process.env.PORT || 8000;
const mongoConnection: string = `mongodb+srv://rahul_yadv:qmKQ8TDnHLmqmbLZ@cluster0.64cxwhe.mongodb.net`;

mongoose.connect(mongoConnection, {
    dbName: 'tech_hub',
    retryWrites: true,
    w: 'majority'
  }, (err) => {
    console.log('connected')
  }
)

app.listen(PORT, ():void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});