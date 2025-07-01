import { useState, useEffect } from 'react';
import ModalBase from './ModalBase';

export default function ModalEditar({ show, onClose, onSave, cliente }) {
  const [formData, setFormData] = useState({
    mac: '',
    nome: '',
    usuario: '',
    validade: '',
    status: '',
    contato: '',
  });

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    }
  }, [cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <ModalBase show={show} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" className="bg-zinc-700 px-3 py-2 rounded" />
        <input name="usuario" value={formData.usuario} onChange={handleChange} placeholder="Usuário" className="bg-zinc-700 px-3 py-2 rounded" />
        <input name="mac" value={formData.mac} onChange={handleChange} placeholder="MAC" className="bg-zinc-700 px-3 py-2 rounded" />
        <input name="validade" value={formData.validade} onChange={handleChange} placeholder="Validade" type="date" className="bg-zinc-700 px-3 py-2 rounded" />
        <select name="status" value={formData.status} onChange={handleChange} className="bg-zinc-700 px-3 py-2 rounded col-span-2">
          <option value="">Status</option>
          <option value="ativo">Ativo</option>
          <option value="bloqueado">Bloqueado</option>
        </select>
        <input name="contato" value={formData.contato} onChange={handleChange} placeholder="(11)9.1111-1111" className="bg-zinc-700 px-3 py-2 rounded col-span-2" />
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="bg-zinc-600 px-4 py-2 rounded hover:bg-zinc-700">Cancelar</button>
        <button onClick={handleSubmit} className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">Salvar</button>
      </div>
    </ModalBase>
  );
}
