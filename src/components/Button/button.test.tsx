import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Test</Button>);
    screen.getByText('Test');
  });

  it('shows Loading...', () => {
    render(<Button isLoading={true}>Test</Button>);
    screen.getByText('Loading...');
  });

  it('onClick works', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test</Button>);
    await userEvent.click(screen.getByText('Test'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('disabled', () => {
    render(<Button disabled>Test</Button>);
    expect(screen.getByText('Test')).toHaveAttribute('disabled');
  });
});
