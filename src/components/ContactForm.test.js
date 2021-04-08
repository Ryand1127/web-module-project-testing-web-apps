import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    
    render(<ContactForm />);

});

test('renders the contact form header', ()=> {
    
    render(<ContactForm />);
    
    const header = screen.getByText(/contact form/i);
    
    expect(header).toBeTruthy();
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Contact Form");

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    
    render(<ContactForm />);
    
    const name = screen.getByLabelText(/first name/i);
    userEvent.type(name, 'Ryan')
    
    const error = await screen.findByText(/error/i);
    expect(error).toBeInTheDocument();

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', /submit/i);
    userEvent.click(submitButton);
    const error = await screen.findAllByTestId('error');
    expect(error).toHaveLength(3);

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    
    render(<ContactForm />);
    
    const firstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName,  'Ryann');

    const lastName = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastName, 'Dill')

    const submitButton = screen.getByRole('button', /submit/i);
    userEvent.click(submitButton);

    const error = await screen.findAllByTestId('error');
    expect(error).toHaveLength(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
    render(<ContactForm />)

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'jjjjj')

    const error = await screen.findByTestId('error');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent(/email must be a valid email address/i);

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
   
    render(<ContactForm />)

    const firstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName,  'Ryann');

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'ryan@ryan.com')

    const submitButton = screen.getByRole('button', /submit/i);
    userEvent.click(submitButton);

    const error = await screen.findByTestId('error');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent(/lastName is a required field/i);

    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
    render(<ContactForm />)

    const firstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName,  'Ryann');

    const lastName = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastName, 'Dill')
    
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'ryan@ryan.com')

    const submitButton = screen.getByRole('button', /submit/i);
    userEvent.click(submitButton);

    const displayFName = await screen.getByTestId(/firstnameDisplay/i);
    const displayLName = await screen.getByTestId(/lastnameDisplay/i);
    const displayEmail = await screen.getByTestId(/emailDisplay/i);
    const displayMessage = await screen.queryByTestId(/messageDisplay/i);

    expect(displayFName).toBeInTheDocument();
    expect(displayLName).toBeInTheDocument();
    expect(displayEmail).toBeInTheDocument();
    expect(displayMessage).not.toBeInTheDocument();


});

test('renders all fields text when all fields are submitted.', async () => {
    
    render(<ContactForm />)

    const firstName = screen.getByPlaceholderText(/edd/i);
    userEvent.type(firstName,  'Ryann');

    const lastName = screen.getByPlaceholderText(/burke/i);
    userEvent.type(lastName, 'Dill')
    
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'ryan@ryan.com')

    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, 'All done')

    const submitButton = screen.getByRole('button', /submit/i);
    userEvent.click(submitButton);

    const displayFName = await screen.getByTestId(/firstnameDisplay/i);
    const displayLName = await screen.getByTestId(/lastnameDisplay/i);
    const displayEmail = await screen.getByTestId(/emailDisplay/i);
    const displayMessage = await screen.getByTestId(/messageDisplay/i);

    expect(displayFName).toBeInTheDocument();
    expect(displayLName).toBeInTheDocument();
    expect(displayEmail).toBeInTheDocument();
    expect(displayMessage).toBeInTheDocument();

});