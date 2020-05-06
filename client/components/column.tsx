import React, { ReactElement } from 'react';
import { useDrop } from 'react-dnd';
import Card from './card';
import { Card as CardType, CardDragItem } from '../@types';

interface Props {
    title?: string;
    cards: CardType[];
    onDrop: (id: string, state: string) => void;
}

const Column: React.FC<Props> = (props: Props): ReactElement => {
    const { title = 'Untitled', cards = [], onDrop } = props;

    const [, dropRef] = useDrop({
        accept: ['CARD'],
        drop(item: CardDragItem) {
            onDrop(item.id, title);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            draggingColor: monitor.getItemType(),
        }),
    });

    const renderCards = (): ReactElement[] => cards.map((c, i) => <Card {...c} key={i} />);

    return (
        <div className="column board__column" ref={dropRef}>
            <h3 className="title is-5">{title}</h3>
            {renderCards()}
        </div>
    );
};

export default Column;
