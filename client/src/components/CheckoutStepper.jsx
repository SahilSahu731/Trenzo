import React from 'react';
import { Check } from 'lucide-react';

const steps = ['Shipping', 'Payment', 'Place Order'];

const CheckoutStepper = ({ currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step} className={`relative ${stepIdx !== steps.length - 1 ? 'flex-1' : ''}`}>
            {stepIdx < currentStep ? (
              // --- Completed Step ---
              <div className="flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600">
                  <Check className="w-5 h-5 text-white" />
                </span>
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{step}</span>
              </div>
            ) : stepIdx === currentStep ? (
              // --- Current Step ---
              <div className="flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-blue-600">
                  <span className="h-2.5 w-2.5 bg-blue-600 rounded-full"></span>
                </span>
                <span className="ml-2 text-sm font-medium text-blue-600 dark:text-blue-400">{step}</span>
              </div>
            ) : (
              // --- Upcoming Step ---
              <div className="flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"></span>
                <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{step}</span>
              </div>
            )}

            {/* --- Connecting Line --- */}
            {stepIdx < steps.length - 1 ? (
              <div className={`absolute top-4 left-4 -ml-px mt-0.5 h-0.5 w-full ${stepIdx < currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`} />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CheckoutStepper;