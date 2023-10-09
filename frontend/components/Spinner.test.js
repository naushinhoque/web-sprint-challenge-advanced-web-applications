// Import the Spinner component into this file and test
import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';
// that it renders what it should for the different props it can take.
test('sanity', () => {
  expect(true).toBe(false)
})

describe('Spinner Component', () => {
  it('should render with "on" prop set to true', () => {
    const { container } = render(<Spinner on={true} />);
    // Assert that the spinner component is rendered when "on" prop is true
    expect(container.querySelector('#spinner')).toBeInTheDocument();
  });

  it('should not render with "on" prop set to false', () => {
    const { container } = render(<Spinner on={false} />);
    // Assert that the spinner component is not rendered when "on" prop is false
    expect(container.querySelector('#spinner')).toBeNull();
  });

  // Add more test cases as needed
});
