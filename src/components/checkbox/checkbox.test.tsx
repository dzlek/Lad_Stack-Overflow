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

  it('respects isChecked prop in controlled mode', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Checked" isChecked onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('respects initial isChecked in uncontrolled mode', () => {
    render(<Checkbox label="Unchecked" isChecked={false} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
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
