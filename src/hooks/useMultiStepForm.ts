import { useState } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { FormInput, FormFields } from '../formConfig';
import toast from 'react-hot-toast';

export const useMultiStepForm = (formMethods: UseFormReturn<FormInput, object>) => {
  const { trigger, handleSubmit, reset } = formMethods;
  const [currentStep, setCurrentStep] = useState(0); // Track current step
  const [loading, setLoading] = useState(false); // Track loading state
  const steps = Object.keys(FormFields); // Get keys of form fields

  // Handle form submission
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    setLoading(true);
    setTimeout(() => {
      console.log('Form Data:', data);
      toast.success("Success");
      reset();
      setCurrentStep(0);
      setLoading(false);
    }, 500);
  };

  // Handle "Next" button click
  const handleNext = async () => {
    const isValid = await trigger(steps[currentStep] as keyof FormInput); // Trigger validation for current step
    if (isValid) {
      setLoading(true); // Start loading
      // Simulate an API call with a timeout
      setTimeout(() => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1)); // Go to the next step after 500ms
        setLoading(false); // Stop loading after API call finishes
      }, 500); // 500ms timeout to simulate API call
    }
  };

  // Handle "Previous" button click
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0)); // Go to the previous step
  };

  return {
    currentStep,
    loading,
    steps,
    onSubmit: handleSubmit(onSubmit),
    handleNext,
    handlePrevious,
  };
};
