
import { create } from 'zustand';
import { BaseProduct, Charm, CHARMS } from './mock-data';

interface CustomizerState {
  currentStep: 'entry' | 'base-selection' | 'quantity-selection' | 'charm-selection' | 'review';
  selectedBaseProduct: BaseProduct | null;
  material: 'Gold' | 'Silver' | 'Rose Gold';
  charmQuantity: number;
  currentSlotIndex: number;
  selectedCharms: ({ charm: Charm | null; position: { x: number; y: number } })[];
  customerNote: string;
  totalPrice: number;

  // Actions
  setStep: (step: CustomizerState['currentStep']) => void;
  selectBaseProduct: (product: BaseProduct) => void;
  setMaterial: (material: CustomizerState['material']) => void;
  setCharmQuantity: (quantity: number) => void;
  setCurrentSlotIndex: (index: number) => void;
  selectCharm: (index: number, charm: Charm | null) => void;
  updateCharmPosition: (index: number, x: number, y: number) => void;
  setCustomerNote: (note: string) => void;
  calculateTotalPrice: () => void;
  reset: () => void;
}

export const useCustomizerStore = create<CustomizerState>((set, get) => ({
  currentStep: 'entry',
  selectedBaseProduct: null,
  material: 'Gold',
  charmQuantity: 0,
  currentSlotIndex: 0,
  selectedCharms: [],
  customerNote: '',
  totalPrice: 0,

  setStep: (step) => set({ currentStep: step }),

  selectBaseProduct: (product) => {
    set({ selectedBaseProduct: product });
    get().calculateTotalPrice();
  },

  setMaterial: (material) => set({ material }),

  setCharmQuantity: (quantity) => {
    set({ 
      charmQuantity: quantity,
      currentSlotIndex: 0,
      selectedCharms: Array(quantity).fill(null).map((_, i) => ({
        charm: null,
        position: { x: 0, y: 0 }
      })) 
    });
    get().calculateTotalPrice();
  },

  setCurrentSlotIndex: (index) => set({ currentSlotIndex: index }),

  selectCharm: (index, charm) => {
    const charms = [...get().selectedCharms];
    charms[index] = { 
      ...charms[index], 
      charm,
      position: charms[index].charm ? charms[index].position : { x: 0, y: 0 }
    };
    set({ selectedCharms: charms });
    get().calculateTotalPrice();
  },

  updateCharmPosition: (index, x, y) => {
    const charms = [...get().selectedCharms];
    charms[index] = { ...charms[index], position: { x, y } };
    set({ selectedCharms: charms });
  },

  setCustomerNote: (note) => set({ customerNote: note }),

  calculateTotalPrice: () => {
    const { selectedBaseProduct, selectedCharms } = get();
    let total = selectedBaseProduct?.price || 0;
    
    selectedCharms.forEach((item) => {
      if (item.charm) total += item.charm.price;
    });

    set({ totalPrice: total });
  },

  reset: () => set({
    currentStep: 'entry',
    selectedBaseProduct: null,
    material: 'Gold',
    charmQuantity: 0,
    currentSlotIndex: 0,
    selectedCharms: [],
    customerNote: '',
    totalPrice: 0,
  }),
}));
