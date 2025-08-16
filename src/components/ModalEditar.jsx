import { useState, useEffect } from 'react';
import ModalBase from './ModalBase';

export default function ModalEditar({ show, onClose, onSave, cliente }) {
  const [formData, setFormData] = useState({
    id: '',
    mac: '',
    nome: '',
    usuario: '',
    validade: '',
    status: '',
    contato: '',
  });

  // Função para converter data de dd/mm/yyyy para yyyy-mm-dd (formato ISO)
  const dateToISO = (dateStr) => {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  // Função para converter data de yyyy-mm-dd para dd/mm/yyyy
  const dateFromISO = (isoDate) => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (cliente) {
      setFormData({
        ...cliente,
        // Se a validade vier no formato dd/mm/yyyy, mantém assim
        // Se vier em outro formato, você pode ajustar conforme necessário
        validade: cliente.validade || ''
      });
    }
  }, [cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'validade') {
      // O input date retorna no formato yyyy-mm-dd, convertemos para dd/mm/yyyy
      const formattedDate = dateFromISO(value);
      setFormData((prev) => ({ ...prev, [name]: formattedDate }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <ModalBase show={show} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input 
          name="id" 
          value={formData.id} 
          onChange={handleChange} 
          placeholder="ID do Cliente" 
          className="bg-zinc-700 px-3 py-2 rounded col-span-2"
        />
        <input 
          name="nome" 
          value={formData.nome} 
          onChange={handleChange} 
          placeholder="Nome" 
          className="bg-zinc-700 px-3 py-2 rounded" 
        />
        <input 
          name="usuario" 
          value={formData.usuario} 
          onChange={handleChange} 
          placeholder="Usuário" 
          className="bg-zinc-700 px-3 py-2 rounded" 
        />
        <input 
          name="mac" 
          value={formData.mac} 
          onChange={handleChange} 
          placeholder="MAC" 
          className="bg-zinc-700 px-3 py-2 rounded" 
        />
        <input 
          name="validade" 
          value={dateToISO(formData.validade)} // Converte para ISO para o input
          onChange={handleChange} 
          placeholder="dd/mm/yyyy" 
          type="date" 
          className="bg-zinc-700 px-3 py-2 rounded" 
        />
        <select 
          name="status" 
          value={formData.status} 
          onChange={handleChange} 
          className="bg-zinc-700 px-3 py-2 rounded col-span-2"
        >
          <option value="">Status</option>
          <option value="ativo">Ativo</option>
          <option value="bloqueado">Bloqueado</option>
        </select>
        <input 
          name="contato" 
          value={formData.contato} 
          onChange={handleChange} 
          placeholder="(11)9.1111-1111" 
          className="bg-zinc-700 px-3 py-2 rounded col-span-2" 
        />
      </div>
      <div className="flex justify-end gap-3">
        <button 
          onClick={onClose} 
          className="bg-zinc-600 px-4 py-2 rounded hover:bg-zinc-700"
        >
          Cancelar
        </button>
        <button 
          onClick={handleSubmit} 
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Salvar
        </button>
      </div>
    </ModalBase>
  );
}
