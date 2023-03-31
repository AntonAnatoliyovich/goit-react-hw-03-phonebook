import PropTypes from 'prop-types';
import css from './Phonebook.module.css';

export const ContactList = ({ contacts, children, deleteContact }) => {
    return (
        <div className={css.contactlist__card}>
            <h2 className={css.phonebook__title}>Contacts</h2>
                {children}
                <ul className={css.contact__List}>
                    {contacts.map(({ id, name, number }) => (
                    <li className={css.contact__item} key={id}>
                        <p className={css.contact__text}>{name}</p>
                        <p className={css.contact__text}> {number}</p>
                        <button
                        className={css.contact__button}
                        onClick={() => {
                        deleteContact(id);
                        }}
                        >
                        Delete
                        </button>
                    </li>
                    ))}
                </ul>
        </div>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
    deleteContact: PropTypes.func,
};
