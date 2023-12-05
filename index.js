import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';


async function main() {
    console.clear();
    await setTimeout(1000);

    p.intro(`${color.bgCyan(color.black(' Entoothiast '))}`);

    const choice = await p.select({
        message: `What would you like to do?`,
        options: [
            { value: 'login', label: 'Login', hint: 'Do you already have an account?' },
            { value: 'register', label: 'Register' },
        ],
    });

    if (choice === 'login') {
        await loginUser();
    } else if (choice === 'register') {
        await registerUser();
    }
}

async function loginUser() {
    p.intro(`${color.bgGreen(color.black(' Login '))}`);
    const username = await p.text({
        message: 'Enter your username:',
        validate: (value) => {
            if (!value || value.trim().length == 0) return 'Please enter a valid username.';
        },
    });
    const password = await p.password({
        message: 'Enter your password:',
        validate: (value) => {
            if (!value) return 'Please enter a password.';
            if (value.length < 5) return 'Password should have at least 5 characters.';
        },
    });
    p.outro('Logged in successfully!');
    await showMenu();
}

async function registerUser() {
    p.intro(`${color.bgGreen(color.black(' Register '))}`);
    const username = await p.text({
        message: 'Enter your new username:',
        validate: (value) => {
            if (!value || value.trim().length == 0) return 'Please enter a valid username.';
        },
    });
    const password = await p.password({
        message: 'Enter your new password:',
        validate: (value) => {
            if (!value) return 'Please enter a password.';
            if (value.length < 5) return 'Password should have at least 5 characters.';
        },
    });
    p.outro('Registered successfully!');
    await showMenu();
}

async function showMenu() {
    const menuChoice = await p.select({
        message: 'Choose an option:',
        options: [
            { value: 'view', label: 'View upcoming appointments' },
            { value: 'publish', label: 'Publish a new timeslot' },
            { value: 'cancel', label: 'Cancel an appointment' },
            { value: 'delete', label: 'Delete a published timeslot' },
            { value: 'logout', label: 'Log out' },
            { value: 'exit', label: 'Exit' },
        ],
    });

    switch (menuChoice) {
        case 'view':
            p.intro(`${color.bgBlue(color.black(' View upcoming appointments '))}`);
            // Handle view upcoming appointments
            break;
        case 'publish':
            p.intro(`${color.bgBlue(color.black(' Publish a new available timeslot '))}`);
            const date = await p.text({
                placeholder: '2023-11-21',
                message: 'Enter the date (YYYY-MM-DD):',
                validate: (value) => {
                    if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return 'Please enter a valid date in the format YYYY-MM-DD.';
                },
            });
            const time = await p.text({
                placeholder: '09:00 AM',
                message: 'Enter the time (HH:MM AM/PM):',
                validate: (value) => {
                    if (!value.match(/^\d{2}:\d{2} (AM|PM)$/i)) return 'Please enter a valid time in the format HH:MM AM/PM.';
                },
            });
            p.outro(`Timeslot published for ${date} at ${time}`);
            await showMenu();
            break;
        case 'cancel':
            p.intro(`${color.bgBlue(color.black(' Cancel an appointment '))}`);
            // Handle cancel an appointment
            break;
        case 'delete':
            p.intro(`${color.bgBlue(color.black(' Delete an appointment '))}`);
            // Handle delete a published timeslot
            break;
        case 'logout':
            p.outro('See you soon!');
            main().catch(console.error);
            break;
        case 'exit':
            console.clear();
            p.outro('Thank you for using Entoothiast!');
            setTimeout(1000);
            process.exit(0);
            break;
        default:
            break;
    }
}

main().catch(console.error);





