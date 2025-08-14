import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ status: 'invalido', mensagem: 'ID inválido' });
  }

  try {
    const ref = collection(db, 'clientes');
    const q = query(ref, where('id', '==', id));
    const snap = await getDocs(q);

    if (snap.empty) {
      return res.status(404).json({ status: 'inexistente', mensagem: 'ID inexistente'});
    }

    const cliente = snap.docs[0].data();

    return res.status(200).json(cliente);

  } catch (erro) {
    return res.status(500).json({ status: 'erro', mensagem: 'Erro interno' });
  }
}
