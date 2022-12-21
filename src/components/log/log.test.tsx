import '../../locales/i18n';
import { render, screen } from '@testing-library/react';
import Log from './log';

describe('Log', () => {
  it('should render element with dock test id', () => {
    render(<Log />);

    expect(screen.getByTestId('log')).toBeInTheDocument();
  });
});
