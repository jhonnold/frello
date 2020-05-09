import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';
import { Card, Column } from '../@types';

export const generateColumn = (): Column => ({
    id: uuidv4(),
    name: faker.lorem.word(),
});

export const generateCard = (column: Column): Card => ({
    id: uuidv4(),
    text: faker.hacker.phrase(),
    column: column.id,
});

export const generateColumns = (amount = 4): Column[] => {
    const columns: Column[] = [];

    for (let i = 0; i < amount; i++) columns.push(generateColumn());

    return columns;
};

export const generateCards = (columns: Column[], amount?: number): Card[] => {
    const howMany = amount || columns.length * 3;
    const cards: Card[] = [];

    for (let i = 0; i < howMany; i++) {
        const column = _.sample(columns);
        const card = generateCard(column);

        cards.push(card);
    }

    return cards;
};
