import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from './Select';

describe('Select', () => {
  it('opens options and selects an option', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(
      <Select
        label="Age"
        options={[
          { label: 'None', value: '0' },
          { label: 'Ten', value: '10' },
          { label: 'Twenty', value: '20' },
          { label: 'Thirty', value: '30' },
        ]}
        onChange={handleChange}
      />,
    );

    const selectDiv = screen.getByText('Age').nextElementSibling!;
    await user.click(selectDiv);

    const listbox = await screen.findByRole('listbox');
    expect(listbox).toBeInTheDocument();

    const option = screen.getByRole('option', { name: 'Ten' });
    await user.click(option);

    expect(handleChange).toHaveBeenCalledWith('10');
    expect(screen.getByText('Ten')).toBeInTheDocument();
  });

  it('shows helperText', () => {
    render(
      <Select
        label="Select"
        options={[{ label: 'None', value: '0' }]}
        helperText="Helper text"
      />,
    );
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('applies error', () => {
    render(
      <Select
        label="Select"
        options={[{ label: 'None', value: '0' }]}
        error
        helperText="Invalid"
      />,
    );
    const selectDiv = screen.getByText('Select').nextElementSibling!;
    expect(selectDiv).toHaveClass('errorSelect');
    expect(screen.getByText('Invalid')).toHaveClass('errorHelperText');
  });

  it('disabled', async () => {
    const user = userEvent.setup();
    render(
      <Select
        label="Select"
        options={[{ label: 'None', value: '0' }]}
        disabled
      />,
    );
    const selectDiv = screen.getByText('Select').nextElementSibling!;
    await user.click(selectDiv);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
