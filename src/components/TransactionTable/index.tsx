import { useTransactions } from '../../hooks/useTransactions'

import { FiTrash2, FiEdit } from 'react-icons/fi'

import { Container } from './styles'

export function TransactionTable() {
  const {
    transactions,
    deleteTransaction,
    updateTransaction,
  } = useTransactions()

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Excluir</th>
            <th>Editar</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createAt),
                )}
              </td>
              <td className="icons">
                <button
                  type="button"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  <FiTrash2 size={16} />
                </button>
              </td>
              <td className="icons">
                <button
                  type="button"
                  onClick={() => updateTransaction(transaction)}
                >
                  <FiEdit size={16} />
                </button>
              </td>
            </tr>
          ))}
          ;
        </tbody>
      </table>
    </Container>
  )
}
