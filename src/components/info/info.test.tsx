import '../../locales/i18n';
import { render, screen } from '@testing-library/react';
import Info from './info';

xdescribe('Info', () => {
  it('should render element with dock test id', () => {
    render(<Info />);

    expect(screen.getByTestId('info')).toBeInTheDocument();
  });
});
