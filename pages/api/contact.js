import { MongoClient } from 'mongodb';

import { mongoURI } from '../../constants';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'invalid input' });
      return;
    }

    const newMsg = { email, name, message };
    try {
      const client = await MongoClient.connect(mongoURI);

      const db = client.db();
      const result = await db.collection('message').insertOne(newMsg);

      res
        .status(201)
        .json({ success: true, data: { ...newMsg, id: result.insertedId } });

      client.close();
    } catch (error) {
      res.status(500).json({ error: true, message: 'could not connect to db' });
      return;
    }
  }
}

export default handler;
