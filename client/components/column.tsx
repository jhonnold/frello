import React, { ReactElement } from 'react';
import { useDrop } from 'react-dnd';
import Card from './card';
import { Card as CardType, Column as ColumnType, CardDragItem } from '../@types';

interface Props {
    column: ColumnType;
    cards: CardType[];
    onDrop: (id: string, state: string) => void;
}

const Column: React.FC<Props> = (props: Props): ReactElement => {
    const { column, cards = [], onDrop } = props;

    const [, dropRef] = useDrop({
        accept: ['CARD'],
        drop(item: CardDragItem) {
            onDrop(item.id, column.id);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            draggingColor: monitor.getItemType(),
        }),
    });

    const renderCards = (): ReactElement[] => cards.map((c, i) => <Card {...c} key={i} />);

    return (
        <div className="frello-column" ref={dropRef}>
            <h3 className="frello-column__title">{column.name}</h3>
            {renderCards()}
        </div>
    );
};

export default Column;
