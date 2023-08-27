export interface Barbecue {
  id: string;
  description: string;
  date: Date;
  observation: string;
  onClick?: () => void;
  suggestedValue?: number;
}

export interface Participant {
  id: string;
  name: string;
  barbecueId: string;
  amount: number;
  drink: number;
  paid: boolean;
}
export interface User {
  email: string;
  password: string;
  passwordConfirmation?: string;
}

export interface Response {
  barbecues: Barbecue[];
  participants: Participant[];
  users: User[];
}
