import { create } from "zustand";

export interface ModalListInterface {
  data?: Record<string, any>[];
  title?: string;
  isOpenList: boolean;
  openModalList: (data: Record<string, any>[],  title: string) => void;
  closeListModal: () => void;
}

const useListModal = create<ModalListInterface>((set) => ({
  data: undefined,
  title: undefined,
  isOpenList: false,
  openModalList: (data: Record<string, any>[],  title: string) => set({ isOpenList: true, data, title }),
  closeListModal: () => set({ isOpenList: false, data: undefined, title: undefined }),
}));

export default useListModal;