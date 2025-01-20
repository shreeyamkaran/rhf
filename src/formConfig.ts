export interface FormInput {
  username: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

export interface FieldConfig {
  label: string;
  type: 'text' | 'email' | 'password' | 'checkbox';
  validation: Record<string, any>;
}

export const FormFields: Record<keyof FormInput, FieldConfig> = {
  username: {
    label: 'Username',
    type: 'text',
    validation: {
      required: 'Username is required',
      minLength: { value: 4, message: 'Username must be at least 4 characters long' }
    }
  },
  email: {
    label: 'Email',
    type: 'email',
    validation: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address'
      }
    }
  },
  password: {
    label: 'Password',
    type: 'password',
    validation: {
      required: 'Password is required',
      minLength: { value: 6, message: 'Password must be at least 6 characters long' }
    }
  },
  acceptTerms: {
    label: 'Accept Terms',
    type: 'checkbox',
    validation: { required: 'You must accept the terms and conditions' }
  }
};