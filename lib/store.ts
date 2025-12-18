
import { create } from 'zustand';
import { BaseProduct, Charm, CHARMS } from './mock-data';

interface CustomizerState {
  currentStep: 'entry' | 'base-selection' | 'quantity-selection' | 'charm-selection' | 'review';
  selectedBaseProduct: BaseProduct | null;
  charmQuantity: number;
  selectedCharms: (Charm | null)[];
  customerNote: string;
  totalPrice: number;

  // Actions
  setStep: (step: CustomizerState['currentStep']) => void;
  selectBaseProduct: (product: BaseProduct) => void;
  setCharmQuantity: (quantity: number) => void;
  selectCharm: (index: number, charm: Charm | null) => void;
  setCustomerNote: (note: string) => void;
  calculateTotalPrice: () => void;
  reset: () => void;
}

export const useCustomizerStore = create<CustomizerState>((set, get) => ({
  currentStep: 'entry',
  selectedBaseProduct: null,
  charmQuantity: 0,
  selectedCharms: [],
  customerNote: '',
  totalPrice: 0,

  setStep: (step) => set({ currentStep: step }),

  selectBaseProduct: (product) => {
    set({ selectedBaseProduct: product });
    get().calculateTotalPrice();
  },

  setCharmQuantity: (quantity) => {
    set({ 
      charmQuantity: quantity,
      selectedCharms: Array(quantity).fill(null) 
    });
    get().calculateTotalPrice();
  },

  selectCharm: (index, charm) => {
    const charms = [...get().selectedCharms];
    charms[index] = charm;
    set({ selectedCharms: charms });
    get().calculateTotalPrice();
  },

  setCustomerNote: (note) => set({ customerNote: note }),

  calculateTotalPrice: () => {
    const { selectedBaseProduct, selectedCharms } = get();
    let total = selectedBaseProduct?.base_price || 0;
    
    selectedCharms.forEach((charm) => {
      if (charm) total += charm.price;
    });

    set({ totalPrice: total });
  },

  reset: () => set({
    currentStep: 'entry',
    selectedBaseProduct: null,
    charmQuantity: 0,
    selectedCharms: [],
    customerNote: '',
    totalPrice: 0,
  }),
}));
