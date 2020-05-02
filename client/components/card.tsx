import React, { ReactElement } from 'react';
import { useDrag } from 'react-dnd';

interface Props {
    text: string;
    id: string;
}

const Card: React.FC<Props> = (props: Props): ReactElement => {
    const { text, id } = props;
    const [{ opacity }, dragRef] = useDrag({
        item: { type: 'CARD', id },
        collect: m => ({ opacity: m.isDragging() ? 0.5 : 1 }),
    });

    return (
        <div className="card" ref={dragRef} style={{ opacity }}>
            <div className="card-content">
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Card;
