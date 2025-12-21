/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React from 'react';
import ReactDOM from 'react-dom/client';
  
import App from './App';
  
export default () => <App/>;
  
let rootElement: ReactDOM.Root
  
export const mount = (Component, element = document.getElementById('app')) => {
  rootElement = ReactDOM.createRoot(element);
  rootElement.render(<Component/>);

  if(module.hot) {
      module.hot.accept('./App', ()=> {
        rootElement.render(<Component/>);
      })
  }
};

export const unmount = () => {
  rootElement.unmount();
};
