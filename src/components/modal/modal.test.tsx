import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from './Modal';

describe('Modal', () => {
  it('not render if closed', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        Hidden
      </Modal>,
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it(' onClose backdrop clicked', async () => {
    const handleClose = jest.fn();
    const user = userEvent.setup();
    render(
      <Modal open onClose={handleClose}>
        Content
      </Modal>,
    );

    const backdrop = screen.getByTestId('backdrop');
    await user.click(backdrop);

    expect(handleClose).toHaveBeenCalled();
  });

  it('renders children', () => {
    render(
      <Modal open onClose={() => {}}>
        <button>Click</button>
      </Modal>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
