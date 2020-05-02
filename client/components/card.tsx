import React, { ReactElement } from 'react';

interface Props {
    text: string;
}

const Card: React.FC<Props> = (props: Props): ReactElement => {
    const { text } = props;

    return (
        <div className="card">
            <div className="card-content">
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Card;
