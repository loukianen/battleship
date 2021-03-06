import { render, screen } from '@testing-library/react';
import OptionsDropdownItem from './options-dropdown-item';

describe('OptionsDropdownItem', () => {
  const label = 'Some text';
  const itemName = 'player';
  const player1Values = [{ value : 'user', text: 'User' }, { value : 'jack', text: 'Jack' }];

  it('should render correct element', () => {
    render(
      <OptionsDropdownItem label={label} itemName={itemName} values={player1Values} defaultValue={player1Values[0].value}
      />);
  
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByLabelText(label)).toBeInTheDocument();

    expect(screen.getAllByRole('option').length).toBe(player1Values.length);
    player1Values.forEach(({value, text}) => {
      const menuItem = screen.getByText(text);
      expect(menuItem).toBeInTheDocument();
      expect(menuItem.getAttribute('value')).toBe(value);
    });
  });
});
