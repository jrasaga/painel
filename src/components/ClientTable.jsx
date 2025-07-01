import {
  PencilIcon,
  TrashIcon,
  LockClosedIcon,
  LockOpenIcon,
} from '@heroicons/react/24/outline';

export default function ClientTable({ clients, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="overflow-x-auto rounded-md bg-white shadow-md text-sm text-zinc-800">
      <table className="min-w-full border-separate border-spacing-y-2">
        <thead className="bg-zinc-100 text-left text-zinc-600 font-semibold">
          <tr>
            <th className="px-4 py-2">Código</th>
            <th>MAC</th>
            <th>Nome</th>
            <th>Usuário</th>
            <th>Validade</th>
            <th>Status</th>
            <th>Contato</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.codigo} className="bg-zinc-50 hover:bg-zinc-100">
              <td className="px-4 py-2">{c.codigo}</td>
              <td>{c.mac}</td>
              <td>{c.nome}</td>
              <td>{c.usuario}</td>
              <td>{c.validade}</td>
              <td>
                <span
                  className={`px-2 py-1 text-xs font-bold rounded ${
                    c.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}
                >
                  {c.status}
                </span>
              </td>
              <td>{c.contato}</td>
              <td className="text-center">
                <div className="flex justify-center items-center gap-2">
                  <button onClick={() => onEdit(c)}><PencilIcon className="h-4 w-4 text-blue-500" /></button>
                  <button onClick={() => onToggleStatus(c)}>{
                    c.status === 'ativo'
                      ? <LockClosedIcon className="h-4 w-4 text-yellow-500" />
                      : <LockOpenIcon className="h-4 w-4 text-green-500" />
                  }</button>
                  <button onClick={() => onDelete(c)}><TrashIcon className="h-4 w-4 text-red-500" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
