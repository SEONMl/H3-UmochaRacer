import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Self from './pages/Self';
import Main from './pages/Main';
import Loading from './pages/Loading';
import OptionProvider from './provider/optionProvider';
import {ModalProvider} from './provider/modalProvider';
import Modal from './component/modal/Modal';
interface AppProviderProps {
  contexts: React.ElementType[];
  children: React.ReactNode;
}

function App() {
  const AppProvider = ({contexts, children}: AppProviderProps) =>
    contexts.reduce(
      (prev: React.ReactNode, context: React.ElementType) =>
        React.createElement(context, {
          children: prev,
        }),
      children,
    );
  return (
    <AppProvider contexts={[OptionProvider, ModalProvider]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/self" element={<Self />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </BrowserRouter>
      <Modal />
    </AppProvider>
  );
}

export default App;
