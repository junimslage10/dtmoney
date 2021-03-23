import { useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { TransactionsProvider } from './hooks/useTransactions'

import { NewTransactionModal } from './components/NewTransactionModal'
import Modal from 'react-modal'

import { GlobalStyle } from './style/global'

Modal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(
    false,
  )

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <GlobalStyle />
    </TransactionsProvider>
  )
}
