import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home.jsx';
import logoImg from '../dist/assets/lrnr-logo-DuXhzx9H.png';

test('checks the logo with correct image and alt text', () => {
    render(<Home/>);
    const logo = screen.getByAltText('lrnr-logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', logoImg);
});

test('checks the header test', () => {
    render(<Home/>);
    const header = screen.getByText(/Your guided path to programming enlightenment/i);
    expect(header).toBeInTheDocument();
})

test('renders first paragraph with correct text', () => {
    render(<Home />);
    const paragraph = screen.getByText(/Greetings, young padawan. Are you ready to embark on a journey of personalized enlightenment/i);
    expect(paragraph).toBeInTheDocument();
  });

test('renders the paragraph with correct text', () => {
    render(<Home />);
    const paragraph = screen.getByText(/Our app is designed to be both challenging and rewarding/i);
    expect(paragraph).toBeInTheDocument();
  });