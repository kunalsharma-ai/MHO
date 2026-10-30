/** Build-time pre-render of the first screen (English) → instant First Contentful Paint. */
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export function render() {
  return renderToString(<App initialLang="en" />);
}
