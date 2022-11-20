export interface TransactionListType {
  balance: number,
  creditedTransactions: TransactionType[],
  debitedTransactions: TransactionType[]
}

export interface TransactionType {
  id: number,
  value: number,
  createdAt: string,
  creditedAccount?: TransactionAccountType,
  debitedAccount?: TransactionAccountType
}

interface TransactionAccountType {
  id: number,
  user: { username: string}
}

interface AccountType {
  id: number,
  balance: number,
  user?: UserType
}

export interface UserType {
  id: number,
  username: string,
  account: AccountType
}