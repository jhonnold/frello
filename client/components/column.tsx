import React, { ReactElement } from 'react';
import Card from './card';
import { Card as CardType } from '../@types';

interface Props {
    title?: string;
    cards: CardType[];
}

const Column: React.FC<Props> = (props: Props): ReactElement => {
    const { title = 'Untitled', cards = [] } = props;

    const renderCards = (): ReactElement[] => cards.map((c, i) => <Card text={c.text} key={i} />);

    return (
        <div className="column board__column">
            <h3 className="title is-5">{title}</h3>
            {renderCards()}
        </div>
    );
};

export default Column;
