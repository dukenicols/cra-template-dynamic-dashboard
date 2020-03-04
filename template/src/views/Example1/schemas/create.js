import FIELDS from './fields';
const { name, username, website, email } = FIELDS;

export default {
    columns: [
        {
            size: 6,
            elements: [name, username]
        },
        {
            size: 6,
            elements: [website, email]
        }
    ]
};