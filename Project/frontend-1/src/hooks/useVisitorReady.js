import { useEffect, useState } from 'react';
import { isVisitorReady, onVisitorReady } from '../utils/storage.js';

// Re-renders the component once the visitor state has been loaded from the backend. Rendering is never blocked:
// until then the component simply sees the defaults, exactly as it did on the server render.
export default function useVisitorReady() {
  const [ready, setReady] = useState(isVisitorReady());
  useEffect(() => (ready ? undefined : onVisitorReady(() => setReady(true))), [ready]);
  return ready;
}
