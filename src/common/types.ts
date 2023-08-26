export interface Barbecue {
  id:string
  description: string;
  date: Date;
  observation:string;
  onClick?: () => void;
  suggestedValue?: number  
}

export interface Participant {
  id: string;
  name: string;
  barbecueId: string;
  amount: number;
  drink: number
  paid: boolean;
}
export type Response = {
  barbecues:Barbecue[]
  participants:Participant[]
}
