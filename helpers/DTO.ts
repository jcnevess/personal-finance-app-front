type Pot = {
  name: string;
  target: number;
  total: number;
  theme: string;
};

type Budget = {
  category: string;
  maximum: number;
  theme: string;
};

type Transaction = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
};

type Balance = {
  current: number;
  income: number;
  expenses: number;
};

export type { Pot, Budget, Transaction, Balance };
