import React from 'react';
import styles from './App.module.scss';
import { Main } from './components/pages/Main';

function App() {
  return (
    <div className={styles.app}>
      <Main />
    </div>
  );
}

export default App;
