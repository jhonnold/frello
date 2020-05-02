import React, { ReactElement } from 'react';
import { hot } from 'react-hot-loader/root';

import Board from './components/board';

const App: React.FC = (): ReactElement => <Board title="board" />;

export default hot(App);
