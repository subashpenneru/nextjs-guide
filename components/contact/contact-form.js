import { useEffect, useState } from 'react';

import classes from './contact-form.module.css';
import Notification from '../ui/notification';

const sendContactData = async (contactData) => {
  const res = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Somthign went wrong!');
  }
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: '',
  });
  const [status, setStatus] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        setStatus(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const onChangeHandler = ({ target }) => {
    const value = target.value;
    const id = target.id;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    setStatus('pending');
    setError('');
    try {
      await sendContactData(formData);
      setStatus('success');
      setFormData({ email: '', message: '', name: '' });
    } catch (error) {
      setError(error.message);
      setStatus('error');
    }
  };

  let notification;

  if (status === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending Message...',
      message: 'Your message is on its way!',
    };
  } else if (status === 'success') {
    notification = {
      status: 'success',
      title: 'Success',
      message: 'Message sent Successfully',
    };
  } else if (status === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: error,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form onSubmit={sendMessage} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>E-Mail</label>
            <input
              type='email'
              name='email'
              id='email'
              onChange={onChangeHandler}
              value={formData.email}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Name</label>
            <input
              type='test'
              name='name'
              onChange={onChangeHandler}
              id='name'
              value={formData.name}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Message</label>
          <textarea
            name='message'
            id='message'
            rows='5'
            onChange={onChangeHandler}
            value={formData.message}
          />
        </div>

        <div className={classes.actions}>
          <button type='submit'>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          title={notification.title}
          status={notification.status}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
