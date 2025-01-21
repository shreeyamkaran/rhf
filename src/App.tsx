import React from 'react';
import { useForm } from 'react-hook-form';
import { FormFields, FormInput } from './formConfig';
import { Spinner } from './spinner';
import { useMultiStepForm } from './hooks/useMultiStepForm';

const App: React.FC = () => {
  const formMethods = useForm<FormInput>();
  const {
    currentStep,
    loading,
    steps,
    onSubmit,
    handleNext,
    handlePrevious,
  } = useMultiStepForm(formMethods); // Use the custom hook
  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center py-8 px-4">
      <h1 className="text-3xl font-semibold mb-6">Multi-Step Wizard Form Using React-Hook-Form</h1>
      <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
          <div
            className="bg-blue-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        {/* Render current step */}
        {steps.map((key, index) => {
          const field = FormFields[key as keyof FormInput];
          return (
            <div key={key} className={`mb-4 ${currentStep === index ? 'block' : 'hidden'}`}>
              <label htmlFor={key} className="block text-gray-700 font-medium mb-2">{field.label}</label>
              {field.type === 'checkbox' ? (
                <div className="flex items-center">
                  <input
                    {...formMethods.register(key as keyof FormInput, field.validation)}
                    id={key}
                    type={field.type}
                    className="mr-2"
                  />
                  <span className="text-gray-700">I accept the terms and conditions</span>
                </div>
              ) : (
                <input
                  {...formMethods.register(key as keyof FormInput, field.validation)}
                  id={key}
                  type={field.type}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              {formMethods.formState.errors[key as keyof FormInput] && (
                <p className="text-red-500 text-sm mt-1">{formMethods.formState.errors[key as keyof FormInput]?.message}</p>
              )}
            </div>
          );
        })}

        {/* Buttons: Previous and Next */}
        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 disabled:bg-gray-400"
              disabled={loading} // Disable when loading
            >
              Previous
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-600 ml-auto"
              disabled={loading} // Disable when loading
            >
              {loading ? <Spinner /> : 'Next'}
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-600 ml-auto"
              disabled={loading} // Disable when loading
            >
              {loading ? <Spinner /> : 'Submit'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default App;
