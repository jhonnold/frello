import React, { ReactElement, useState } from 'react';
import { DndProvider } from 'react-dnd';
import dndBackend from 'react-dnd-html5-backend';
import _ from 'lodash';
import Column from './column';
import { generateColumns, generateCards } from '../util/seed';

import { Card, Column as ColumnType } from '../@types';

interface Props {
    title?: string;
}

const Board: React.FC<Props> = (props: Props): ReactElement => {
    const { title = 'Untitled' } = props;

    const [columns] = useState<ColumnType[]>(generateColumns(5));
    const [cards, setCards] = useState<Card[]>(generateCards(columns));

    const onDrop = (id: string, columnId: string): void => {
        const draggedCard = _.find(cards, ['id', id]);
        const updatedCard = _.assign({}, draggedCard, { column: columnId });

        const updatedCards = _.reject(cards, ['id', id]).concat(updatedCard);
        setCards(updatedCards);
    };

    const renderColumns = (): ReactElement[] => {
        const grouped = _.groupBy(cards, 'column');

        return columns.map(column => {
            const cards = grouped[column.id];

            return <Column column={column} cards={cards} key={column.id} onDrop={onDrop} />;
        });
    };

    return (
        <DndProvider backend={dndBackend}>
            <div className="frello-board">
                <h1 className="frello-board__title">{title}</h1>
                <div className="frello-board__wrapper">{renderColumns()}</div>
            </div>
        </DndProvider>
    );
};

export default Board;
