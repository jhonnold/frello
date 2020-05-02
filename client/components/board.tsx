import { Card } from '../@types';
import React, { ReactElement, useState } from 'react';
import Column from './column';

interface Props {
    title?: string;
}

const initialCards: Card[] = [
    { state: 'todo', text: 'create something new' },
    { state: 'in progress', text: 'working on something' },
    { state: 'done', text: 'completed it' },
    { state: 'deployed', text: 'what do they think?' },
    { state: 'todo', text: 'create something pretty' },
    { state: 'todo', text: 'something sweet' },
    { state: 'deployed', text: 'do they use it' },
    { state: 'done', text: 'working' },
    { state: 'todo', text: 'update' },
    { state: 'todo', text: 'fix' },
    { state: 'in progress', text: 'ya know' },
    { state: 'todo', text: 'todo' },
    { state: 'in progress', text: 'dinking' },
];

const groupBy = <T extends object>(arr: T[], key: string): { [key: string]: T[] } =>
    arr
        .map(val => val[key])
        .reduce((acc, val, i) => {
            acc[val] = (acc[val] || []).concat(arr[i]);
            return acc;
        }, {});

const Board: React.FC<Props> = (props: Props): ReactElement => {
    const { title = 'Untitled' } = props;

    const [cards] = useState<Card[]>(initialCards);
    const grouped = groupBy(cards, 'state');

    const renderColumns = (): ReactElement[] =>
        Object.keys(grouped).map(state => {
            const cards = grouped[state];

            return <Column title={state} cards={cards} key={state} />;
        });

    return (
        <div className="board">
            <h1 className="title is-3">{title}</h1>
            <hr />
            <div className="board__columns">{renderColumns()}</div>
        </div>
    );
};

export default Board;
