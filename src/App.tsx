import React, { ComponentProps, FC } from 'react';

import styles from './App.module.scss';
import { Main } from './components/pages/Main';

const App: FC<ComponentProps<any>> = () => (
  <div className={styles.app}>
    <Main />
  </div>
);

export default App;
