
import React from 'react';
import Main from './components/Main';
import Header from './components/Header';
import NoRecordFound from './components/NoRecordFound';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <React.Fragment >
      <Header />
      <main className='px-2'>
        <Routes>
          <Route path='/visa-requirements/:uId' element={<Main />} />
          <Route path='*' element={<NoRecordFound />}/>
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
