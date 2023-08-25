export interface Barbecue {
  id:string
  description: string;
  date: Date;
  observation:string;
  onClick?: () => void;
  suggestedValue?: number  
}

