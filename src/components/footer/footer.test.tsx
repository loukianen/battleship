import {render, screen} from '@testing-library/react';
import Footer from './footer';

describe('Footer', () => {
  it('sould render text about developer', () => {
    render(
      <Footer />,
    );

    expect(screen.getByText('created by Konstantin Lukyanenok')).toBeInTheDocument();
  });
});
