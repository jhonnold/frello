import React, { ReactElement } from 'react';
import Card from './card';

interface Props {
    title?: string;
}

const Column: React.FC<Props> = (props: Props): ReactElement => {
    const { title = 'Untitled' } = props;

    return (
        <div className="column board__column">
            <h3 className="title is-5">{title}</h3>
            <Card text="Do this..." />
            <Card text="Do this..." />
            <Card text="Do this..." />
            <Card text="Do this..." />
        </div>
    );
};

export default Column;
