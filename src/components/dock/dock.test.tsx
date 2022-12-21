import '../../locales/i18n';
import { render, screen } from '@testing-library/react';
import Dock from './dock';

describe('Dock', () => {
  it('should render element with dock test id', () => {
    render(<Dock />);

    expect(screen.getByTestId('dock')).toBeInTheDocument();
  });
});
