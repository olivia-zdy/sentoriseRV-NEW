import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminLogin from '../AdminLogin';

const signIn = vi.fn();

vi.mock('@/hooks/useAdminAuth', () => ({
  useAdminAuth: () => ({
    user: null,
    isTeamMember: false,
    isLoading: false,
    signIn,
  }),
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

const renderPage = () =>
  render(
    <MemoryRouter>
      <AdminLogin />
    </MemoryRouter>
  );

describe('AdminLogin', () => {
  beforeEach(() => {
    signIn.mockReset();
  });

  it('does not show validation errors on initial render', () => {
    renderPage();
    expect(screen.queryByText(/please enter a valid email/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/password must be at least/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId('login-error')).not.toBeInTheDocument();
  });

  it('shows validation errors only after submitting an empty form', async () => {
    renderPage();
    fireEvent.click(screen.getByTestId('login-submit'));
    expect(await screen.findByText(/please enter a valid email/i)).toBeInTheDocument();
    expect(screen.getByText(/password must be at least/i)).toBeInTheDocument();
    expect(signIn).not.toHaveBeenCalled();
  });

  it('shows the backend error message when sign-in fails and clears it on retry', async () => {
    signIn.mockResolvedValueOnce({ error: { message: 'Invalid login credentials' } });
    renderPage();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'secret1' } });
    fireEvent.click(screen.getByTestId('login-submit'));

    const alert = await screen.findByTestId('login-error');
    expect(alert).toHaveTextContent(/incorrect email or password/i);

    // Editing the form clears the backend error
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'secret12' } });
    await waitFor(() => {
      expect(screen.queryByTestId('login-error')).not.toBeInTheDocument();
    });
  });

  it('shows loading state and disables the submit button while signing in', async () => {
    let resolveSignIn: (v: { error: null }) => void = () => {};
    signIn.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveSignIn = resolve;
      })
    );
    renderPage();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'secret1' } });
    fireEvent.click(screen.getByTestId('login-submit'));

    const button = await screen.findByRole('button', { name: /logging in/i });
    expect(button).toBeDisabled();

    resolveSignIn({ error: null });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^log in$/i })).not.toBeDisabled();
    });
  });

  it('toggles password visibility without affecting validation', () => {
    renderPage();
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    const toggle = screen.getByTestId('toggle-password');

    expect(passwordInput.type).toBe('password');
    fireEvent.click(toggle);
    expect(passwordInput.type).toBe('text');
    // No validation errors should appear from toggling alone
    expect(screen.queryByText(/password must be at least/i)).not.toBeInTheDocument();
    fireEvent.click(toggle);
    expect(passwordInput.type).toBe('password');
  });
});
