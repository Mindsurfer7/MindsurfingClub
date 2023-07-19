import { fireEvent, render, screen } from '@testing-library/react';
import { withTranslation } from 'react-i18next';
import { ComponentRender } from '../../../../config/tests/ComponentRender/ComponentRender';
import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';
import Counter from './Counter';
import userEvent from '@testing-library/user-event';

describe('counter', () => {
  test('test', () => {
    ComponentRender(<Counter />, { initialState: { counter: { value: 10 } } });
    expect(screen.getByTestId('valueTitle')).toHaveTextContent('10');
  });
  test('increment', () => {
    ComponentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    userEvent.click(screen.getByTestId('incbtn'));
    expect(screen.getByTestId('valueTitle')).toHaveTextContent('11');
  });

  test('decrement', () => {
    ComponentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    userEvent.click(screen.getByTestId('decbtn'));
    expect(screen.getByTestId('valueTitle')).toHaveTextContent('9');
  });
});
