import { create } from 'zustand';

export const boardManager = create((set, get) => ({
    drawing : false,
    currentTool : "pencil",
    elements : [],
    cursor : "crosshair",

    addElement: (element) => {
        const {elements} = get();
        set({elements:[...elements, element]});
    },

    setDrawing: (value) => {
        set({drawing : value});
    },

    setTool: (value) => {
        set({currentTool : value});
    },

    setCursor: (value) => {
        set({cursor : value});
    }
}));