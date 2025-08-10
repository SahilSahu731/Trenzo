import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    // --- Placeholder for API call ---
    // In a real app, you would send the email to your backend or a service like Mailchimp.
    console.log('Subscribing email:', email);
    setSubmitted(true);
  };

  return (
    <section className="relative bg-gray-800">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Office background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
        {submitted ? (
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Thank You for Subscribing!
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              You're officially on our list. Keep an eye on your inbox for the latest deals and updates.
            </p>
          </div>
        ) : (
          <>
            <Mail className="mx-auto h-12 w-12 text-white/50" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stay in the Loop
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
              Get the latest deals, new arrivals, and exclusive offers delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-5 py-3 rounded-md bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <button
                  type="submit"
                  className="flex-shrink-0 px-6 py-3 rounded-md bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-colors"
                >
                  <span className="hidden sm:inline">Subscribe Now</span>
                  <Send className="sm:hidden mx-auto" />
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default NewsletterSignup;