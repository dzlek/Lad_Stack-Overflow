import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('renders label and checkbox', () => {
    render(<Checkbox label="Label" />);
    expect(screen.getByLabelText('Label')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('change event', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<Checkbox label="Checked" onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalled();
    expect(checkbox).toBeChecked();
  });

  it('respects defaultChecked prop in uncontrolled mode', () => {
    render(<Checkbox label="Checked" defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('respects checked prop in controlled mode', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Checked" checked onChange={handleChange} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('disabled', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Checkbox label="Disabled" disabled onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();

    await user.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
