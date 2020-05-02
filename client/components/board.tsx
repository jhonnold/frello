import React, { ReactElement, useState } from 'react';
import { DndProvider } from 'react-dnd';
import dndBackend from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Column from './column';

import { Card } from '../@types';

interface Props {
    title?: string;
}

const initialCards: Card[] = [
    { state: 'todo', text: 'create something new', id: uuidv4() },
    { state: 'in progress', text: 'working on something', id: uuidv4() },
    { state: 'done', text: 'completed it', id: uuidv4() },
    { state: 'deployed', text: 'what do they think?', id: uuidv4() },
    { state: 'todo', text: 'create something pretty', id: uuidv4() },
    { state: 'todo', text: 'something sweet', id: uuidv4() },
    { state: 'deployed', text: 'do they use it', id: uuidv4() },
    { state: 'done', text: 'working', id: uuidv4() },
    { state: 'todo', text: 'update', id: uuidv4() },
    { state: 'todo', text: 'fix', id: uuidv4() },
    { state: 'in progress', text: 'ya know', id: uuidv4() },
    { state: 'todo', text: 'todo', id: uuidv4() },
    { state: 'in progress', text: 'dinking', id: uuidv4() },
];

const Board: React.FC<Props> = (props: Props): ReactElement => {
    const { title = 'Untitled' } = props;

    const [cards, setCards] = useState<Card[]>(initialCards);
    const grouped = _.groupBy(cards, 'state');

    const onDrop = (id: string, state: string): void => {
        const draggedCard = _.find(cards, ['id', id]);
        const updatedCard = _.assign({}, draggedCard, { state });

        const updatedCards = _.reject(cards, ['id', id]).concat(updatedCard);
        setCards(updatedCards);
    };

    const renderColumns = (): ReactElement[] =>
        Object.keys(grouped).map(state => {
            const cards = grouped[state];

            return <Column title={state} cards={cards} key={state} onDrop={onDrop} />;
        });

    return (
        <DndProvider backend={dndBackend}>
            <div className="board">
                <h1 className="title is-3">{title}</h1>
                <hr />
                <div className="board__columns">{renderColumns()}</div>
            </div>
        </DndProvider>
    );
};

export default Board;
