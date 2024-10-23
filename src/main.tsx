import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '~/index.css'
import '~/App.css'
import App from '~/pages/main'
import Providers from './app/Providers';


const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);