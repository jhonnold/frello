import React, { ReactElement } from 'react';
import Column from './column';

interface Props {
    title?: string;
}

const Board: React.FC<Props> = (props: Props): ReactElement => {
    const { title = 'Untitled' } = props;

    return (
        <div className="board">
            <h1 className="title is-3">{title}</h1>
            <hr />
            <div className="board__columns">
                <Column />
                <Column />
                <Column />
                <Column />
                <Column />
                <Column />
            </div>
        </div>
    );
};

export default Board;
