import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react'
import { api } from '../services/api'

interface Transaction {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createAt: string
}

//Formas de criar interface com base em outra interface, mas retirando valores
/* 
Inclui somente os valores desejados
interface TransactionInput {
    title: string;
    amount: number;
    type: string;
    category: string;
} */

//Utiliza o Pick e inclui os valores desejados
//type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

//Utiliza o Omit que retira omite os valores passados
type TransactionInput = Omit<Transaction, 'id' | 'createAt'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
  deleteTransaction: (transaction: number) => Promise<void>
  updateTransaction: (transaction: Transaction) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api
      .get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transaction', {
      ...transactionInput,
      createAt: new Date(),
    })

    const { transaction } = response.data

    setTransactions([...transactions, transaction])
  }

  async function deleteTransaction(transactionId: number) {
    //Incluir código para deletar
    console.log(transactionId)
  }

  async function updateTransaction(transaction: Transaction) {
    //Incluir código para update
    console.log(transaction)
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}
