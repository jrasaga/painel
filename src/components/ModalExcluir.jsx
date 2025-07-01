import ModalBase from './ModalBase';

export default function ModalExcluir({ show, onClose, onConfirm, nome }) {
  return (
    <ModalBase show={show} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Excluir Cliente</h2>
      <p className="mb-6">Tem certeza que deseja excluir <strong>{nome}</strong>? Esta ação não poderá ser desfeita.</p>
      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="bg-zinc-600 px-4 py-2 rounded hover:bg-zinc-700">Cancelar</button>
        <button onClick={onConfirm} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Excluir</button>
      </div>
    </ModalBase>
  );
}
