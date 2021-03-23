import { useContext } from 'react'
import { Container } from './styles'
import { TransactionsContext } from '../../TransactionContext'

export function TransactionsTable() {
  const {transactions} = useContext(TransactionsContext)

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th> 
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('PT-br', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(transaction.amount))}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.createAt),
                )}
              </td>
              {/* <td className="icons">
                        <button 
                            type="button"
                            onClick={() => deleteTransaction(transaction.id)}
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </td> */}
              {/* <td className="icons">
                        <button 
                            type="button"
                            onClick={() => updateTransaction(transaction)}
                        >
                            <FiEdit size={16} />
                        </button>
                    </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
