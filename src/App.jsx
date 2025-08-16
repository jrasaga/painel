import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from './services/firebase';

import ClientTable from './components/ClientTable';
import ModalEditar from './components/ModalEditar';
import ModalExcluir from './components/ModalExcluir';

function gerarCodigoUnico() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

export default function App() {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  useEffect(() => {
    const ref = collection(db, 'clientes');
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const dados = snapshot.docs.map((doc) => ({
        ...doc.data(),
        codigo: doc.id, // Inclui o ID do documento como 'codigo'
      }));
      setClientes(dados);
    });
    return () => unsubscribe();
  }, []);

  const abrirNovo = async () => {
    const codigoGerado = await gerarCodigoUnico(db);
    setClienteSelecionado({
      id: '', // Adicionado campo ID
      codigo: codigoGerado,
      mac: '',
      nome: '',
      usuario: '',
      validade: '',
      status: 'ativo',
      contato: '',
    });
    setModalEditar(true);
  };

  const salvarCliente = async (cliente) => {
    const ref = doc(db, 'clientes', cliente.codigo);

    // Se o cliente já tem um ID e código, é uma edição
    if (cliente.id && cliente.codigo) {
      await setDoc(ref, cliente, { merge: true });
      return;
    }

    // Para novos clientes, verifique duplicidade do ID
    const clientesRef = collection(db, 'clientes');
    const q = query(clientesRef, where("id", "==", cliente.id));
    const querySnapshot = await getDocs(q);

    if (!cliente.id) {
      alert("O ID do cliente não pode estar vazio.");
      return;
    }

    if (querySnapshot.empty) {
      await setDoc(ref, cliente);
    } else {
      alert("Já existe um cliente com este ID.");
    }
  };

  const editarCliente = (cliente) => {
    setClienteSelecionado(cliente);
    setModalEditar(true);
  };

  const excluirCliente = (cliente) => {
    setClienteSelecionado(cliente);
    setModalExcluir(true);
  };

  const confirmarExclusao = async () => {
    await deleteDoc(doc(db, 'clientes', clienteSelecionado.codigo));
    setModalExcluir(false);
  };

  const alternarStatus = async (cliente) => {
    const novoStatus = cliente.status === 'ativo' ? 'bloqueado' : 'ativo';
    await updateDoc(doc(db, 'clientes', cliente.codigo), { status: novoStatus });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-200 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-zinc-800">Painel IPTV • Clientes</h1>
          <button
            onClick={abrirNovo}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            + Novo Cliente
          </button>
        </div>

        <ClientTable
          clients={clientes}
          onEdit={editarCliente}
          onDelete={excluirCliente}
          onToggleStatus={alternarStatus}
        />
      </div>

      <ModalEditar
        show={modalEditar}
        cliente={clienteSelecionado}
        onSave={salvarCliente}
        onClose={() => setModalEditar(false)}
      />

      <ModalExcluir
        show={modalExcluir}
        nome={clienteSelecionado?.nome}
        onConfirm={confirmarExclusao}
        onClose={() => setModalExcluir(false)}
      />
    </div>
  );
}
