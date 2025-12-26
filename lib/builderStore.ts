
import { create } from 'zustand';

export interface Charm {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  image: string;
  category_id?: string;
}

export interface Base {
  id: string;
  name: string;
  price: number;
  image: string;
  type: 'necklace' | 'bracelet';
}

export interface PlacedCharm {
  charm: Charm;
  position: { x: number; y: number };
  rotation: number; // Tilting to align with base
}

export type Step = 'charms' | 'base' | 'space';
export type SpacingType = 'compact' | 'standard' | 'loose';

// Predefined rotation angles based on anchor index for a curved necklace
const NECKLACE_ROTATIONS = [-45, -25, 0, 25, 45, -35, -15, 15, 35, 0];

export function generateAnchorPositions(
  quantity: number,
  type: 'necklace' | 'bracelet',
  spacing: SpacingType = 'standard'
): { x: number; y: number; rotation: number }[] {
  const positions: { x: number; y: number; rotation: number }[] = [];

  // Spacing modifiers
  const spacingMap = {
    compact: 0.6,
    standard: 1.0,
    loose: 1.4
  };
  const mod = spacingMap[spacing];

  if (type === 'necklace') {
    const centerX = 50;
    const centerY = 40;
    const radiusX = 25 * mod;
    const radiusY = 20 * mod;
    const startAngle = Math.PI * 0.35;
    const endAngle = Math.PI * 0.65;

    for (let i = 0; i < quantity; i++) {
      const t = quantity === 1 ? 0.5 : i / (quantity - 1);
      const angle = startAngle + t * (endAngle - startAngle);
      positions.push({
        x: centerX + radiusX * Math.cos(angle),
        y: centerY + radiusY * Math.sin(angle),
        rotation: NECKLACE_ROTATIONS[i % NECKLACE_ROTATIONS.length]
      });
    }
  } else {
    // Linear for bracelet
    const width = 50 * mod;
    const startX = 50 - width / 2;
    const y = 50;

    for (let i = 0; i < quantity; i++) {
      const t = quantity === 1 ? 0.5 : i / (quantity - 1);
      positions.push({
        x: startX + t * width,
        y: y,
        rotation: 0 // Bracelets usually have vertical charms
      });
    }
  }

  return positions;
}

interface BuilderState {
  currentStep: Step;
  selectedBase: Base | null;
  placedCharms: PlacedCharm[];
  spacingOption: SpacingType;

  // Browsing/Swiping state
  selectedCategoryId: string;
  activeCharmIndex: number;
  activeBaseIndex: number;

  // Actions
  setStep: (step: Step) => void;
  setBase: (base: Base) => void;
  setCategoryId: (id: string) => void;
  setActiveCharmIndex: (index: number) => void;
  setActiveBaseIndex: (index: number) => void;
  setSpacing: (spacing: SpacingType) => void;

  addCharm: (charm: Charm) => void;
  removeCharm: (index: number) => void;
  resetSelection: () => void;
  updateCharmPosition: (index: number, x: number, y: number) => void;

  getTotalPrice: () => number;
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  currentStep: 'charms',
  selectedBase: null,
  placedCharms: [],
  spacingOption: 'standard',
  selectedCategoryId: 'cat-1',
  activeCharmIndex: 0,
  activeBaseIndex: 0,

  setStep: (step) => set({ currentStep: step }),

  setBase: (base) => {
    const { placedCharms, spacingOption } = get();
    // Re-generate positions with the new base type
    const newAnchors = generateAnchorPositions(placedCharms.length, base.type, spacingOption);

    const updatedCharms = placedCharms.map((pc, i) => ({
      ...pc,
      position: { x: newAnchors[i].x, y: newAnchors[i].y },
      rotation: newAnchors[i].rotation
    }));

    set({
      selectedBase: base,
      placedCharms: updatedCharms
    });
  },

  setCategoryId: (id) => set({ selectedCategoryId: id, activeCharmIndex: 0 }),

  setActiveCharmIndex: (index) => set({ activeCharmIndex: index }),

  setActiveBaseIndex: (index) => set({ activeBaseIndex: index }),

  setSpacing: (spacing) => {
    const { placedCharms, selectedBase } = get();
    if (!selectedBase) {
      set({ spacingOption: spacing });
      return;
    }

    const newAnchors = generateAnchorPositions(placedCharms.length, selectedBase.type, spacing);
    const updatedCharms = placedCharms.map((pc, i) => ({
      ...pc,
      position: { x: newAnchors[i].x, y: newAnchors[i].y },
      rotation: newAnchors[i].rotation
    }));

    set({
      spacingOption: spacing,
      placedCharms: updatedCharms
    });
  },

  addCharm: (charm) => {
    const { placedCharms, selectedBase, spacingOption } = get();

    // Calculate new anchors including the new charm
    const newCount = placedCharms.length + 1;
    const baseType = selectedBase?.type || 'necklace';
    const newAnchors = generateAnchorPositions(newCount, baseType, spacingOption);

    // Re-position all charms to maintain spacing balance
    const updatedCharms = [...placedCharms, { charm, position: { x: 50, y: 50 }, rotation: 0 }].map((pc, i) => ({
      ...pc,
      position: { x: newAnchors[i].x, y: newAnchors[i].y },
      rotation: newAnchors[i].rotation
    }));

    // Audio trigger
    const audio = new Audio('/sounds/pop.mp3');
    audio.play().catch(() => { });

    set({ placedCharms: updatedCharms });
  },

  removeCharm: (index) => {
    const { placedCharms, selectedBase, spacingOption } = get();
    const remaining = placedCharms.filter((_, i) => i !== index);

    const baseType = selectedBase?.type || 'necklace';
    const newAnchors = generateAnchorPositions(remaining.length, baseType, spacingOption);

    const updatedCharms = remaining.map((pc, i) => ({
      ...pc,
      position: { x: newAnchors[i].x, y: newAnchors[i].y },
      rotation: newAnchors[i].rotation
    }));

    set({ placedCharms: updatedCharms });
  },

  resetSelection: () => set({
    placedCharms: [],
    selectedBase: null,
    currentStep: 'charms',
    spacingOption: 'standard'
  }),

  updateCharmPosition: (index, x, y) => {
    const { placedCharms } = get();
    const updated = [...placedCharms];
    if (updated[index]) {
      updated[index] = { ...updated[index], position: { x, y } };
    }
    set({ placedCharms: updated });
  },

  getTotalPrice: () => {
    const { selectedBase, placedCharms } = get();
    const basePrice = selectedBase?.price || 0;
    const charmsPrice = placedCharms.reduce((sum, item) => sum + (item.charm?.price || 0), 0);
    return basePrice + charmsPrice;
  },
}));
