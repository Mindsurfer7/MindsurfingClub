import React from 'react';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nForTesting from '../../../src/shared/config/i18next/i18nForTesting';
import { StateScheme, StoreProvider } from 'App/providers/StoreProvider';

export interface componentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateScheme>;
}

export function ComponentRender(
  component: ReactNode,
  options: componentRenderOptions = {},
) {
  const { route = '/', initialState } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState}>
        <I18nextProvider i18n={i18nForTesting}>{component}</I18nextProvider>
      </StoreProvider>
    </MemoryRouter>,
  );
}
