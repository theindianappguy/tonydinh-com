import { useState } from 'react';

const isValid = (email) => email && email.indexOf('@') > -1;

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('I write once a month ❤️');

  const submit = async () => {
    setLoading(true);
    setMessage('Please wait...');
    try {
      await fetch('https://sub.toniflare.workers.dev', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      setMessage(
        <span>
          🎉 Done! Check your inbox for a confirmation email!
          <br />
          (Check Spam folder too!)
        </span>
      );
    } catch (e) {
      setMessage(
        <span>
          Something went wrong, please try again or subscribe directly from{' '}
          <a target="_blank" href="https://newsletter.tonydinh.com">
            newsletter.tonydinh.com
          </a>
          . Sorry! 😢
        </span>
      );
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="title">Get notified when I release new stuff! 👇</div>
      <div>
        <input
          disabled={loading}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          onKeyDown={(e) => e.keyCode === 13 && submit()}
        />
        <button onClick={submit} disabled={loading || !isValid(email)}>
          Subscribe
        </button>
      </div>
      {message ? <div className="message">{message}</div> : null}
      <style jsx>
        {`
          input,
          button {
            padding: 5px;
            margin: 2px;
          }

          .title {
            margin: 10px;
          }

          .message {
            font-size: 13px;
            margin: 5px;
          }

          .container {
            max-width: 400px;
            text-align: center;
            margin: 10px auto;
          }
        `}
      </style>
    </div>
  );
}