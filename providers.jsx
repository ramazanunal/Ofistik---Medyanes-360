'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children, session }) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </Provider>
  );
}
