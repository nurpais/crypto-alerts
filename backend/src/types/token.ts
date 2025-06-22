export interface Link {
  type?: string | null;
  label?: string | null;
  url: string;
}

export interface Token {
  url: string;
  chainId: string;
  tokenAddress: string;
  amount: number;
  totalAmount: number;
  icon: string;
  header: string;
  description: string;
  links?: Link[] | null;
}
