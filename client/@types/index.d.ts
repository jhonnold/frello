export interface Card {
    id: string;
    column: string;
    text: string;
}

export interface Column {
    id: string;
    name: string;
}

export interface CardDragItem {
    type: string;
    id: string;
}
