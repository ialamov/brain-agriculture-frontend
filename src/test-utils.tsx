import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store/root-reducer';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      farmers: {
        total: 0,
        page: 1,
        pageSize: 20,
        loading: false,
        error: undefined,
        current: null,
        getting: false,
        creating: false,
        updating: false,
        deleting: {},
      },
      auth: {
        user: null,
        token: null,
        loading: false,
        error: undefined,
      },
      home: {
        summary: null,
        loading: false,
        error: undefined,
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
export { default as userEvent } from '@testing-library/user-event';
