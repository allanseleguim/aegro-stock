export interface Quantity {
    unit: string;
    magnitude: number;
  }
  
  export interface Amount {
    currencyCode: string;
    amount: number;
  }
  
  export interface StockLog {
    key: string;
    farmKey: string;
    elementKey: string;
    quantity: Quantity;
    amount?: Amount;
    sourceLocationKey?: string;
    destinationLocationKey?: string;
    destinationCropGlebeKeys?: string;
    occurrenceDate: string;
    observations?: string;
  }