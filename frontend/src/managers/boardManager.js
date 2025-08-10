import { create } from 'zustand';

export const boardManager = create((set, get) => ({
    drawing : false,
    currentTool : "pencil",
    elements : [],

    addElement: (element) => {
        const {elements} = get();
        set({elements:[...elements, element]});
    },

    setDrawing: (value) => {
        set({drawing : value});
    },

    setTool: (value) => {
        set({currentTool : value});
        const {currentTool} = get();
        console.log(currentTool);
    }
}));