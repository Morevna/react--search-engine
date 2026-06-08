import { useState } from 'react';
import { useFormStore } from '../store/useFormStore';
import { formSchema } from '../schemas/form.schema';
import { validateImageFile, convertToBase64 } from '../utils/file.utils';
import PasswordStrength from './PasswordStrength';
import CountryAutocomplete from './CountryAutocomplete';

interface Props {
  onSuccess: () => void;
}

const UncontrolledForm = ({ onSuccess }: Props) => {
  const addSubmission = useFormStore((state) => state.addSubmission);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentPassword, setCurrentPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);

    const imageFile = formData.get('imageFile') as File;
    let base64Image = '';

    if (imageFile && imageFile.name) {
      const imageError = validateImageFile(imageFile);
      if (imageError) {
        setErrors({ image: imageError });
        return;
      }
      base64Image = await convertToBase64(imageFile);
    }

    const rawData = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')) || 0,
      email: formData.get('email') as string,
      gender: formData.get('gender') as string,
      country: formData.get('country') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      terms: formData.get('terms') === 'on',
      image: base64Image,
    };

    const result = formSchema.safeParse(rawData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    addSubmission(result.data);
    const formElement = e.currentTarget;
    if (formElement) {
      formElement.reset();
    }
    onSuccess();
  };

  const renderError = (field: string) => (
    <div
      style={{
        color: 'red',
        fontSize: '0.8rem',
        minHeight: '18px',
        marginTop: '2px',
      }}
    >
      {errors[field] || ''}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
    >
      <div>
        <label
          htmlFor="unc-name"
          style={{ fontWeight: 'bold', display: 'block' }}
        >
          Name:
        </label>
        <input
          id="unc-name"
          name="name"
          type="text"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
        {renderError('name')}
      </div>

      <div>
        <label
          htmlFor="unc-age"
          style={{ fontWeight: 'bold', display: 'block' }}
        >
          Age:
        </label>
        <input
          id="unc-age"
          name="age"
          type="number"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
        {renderError('age')}
      </div>

      <div>
        <label
          htmlFor="unc-email"
          style={{ fontWeight: 'bold', display: 'block' }}
        >
          Email:
        </label>
        <input
          id="unc-email"
          name="email"
          type="text"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
        {renderError('email')}
      </div>

      <div>
        <label
          htmlFor="unc-gender"
          style={{ fontWeight: 'bold', display: 'block' }}
        >
          Gender:
        </label>
        <select
          id="unc-gender"
          name="gender"
          style={{ width: '100%', padding: '8px' }}
        >
          <option value="">-- Select Gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {renderError('gender')}
      </div>

      <div>
        <label
          htmlFor="unc-country"
          style={{ fontWeight: 'bold', display: 'block' }}
        >
          Country:
        </label>
        <CountryAutocomplete id="unc-country" name="country" />
        {renderError('country')}
      </div>

      <div>
        <label
          htmlFor="unc-password"
          style={{ fontWeight: 'bold', display: 'block' }}
        >
          Password:
        </label>
        <input
          id="unc-password"
          name="password"
          type="password"
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
        <PasswordStrength password={currentPassword} />
        {renderError('password')}
      </div>

      <div>
        <label
          htmlFor="unc-confirmPassword"
          style={{ fontWeight: 'bold', display: 'block' }}
        >
          Confirm Password:
        </label>
        <input
          id="unc-confirmPassword"
          name="confirmPassword"
          type="password"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
        {renderError('confirmPassword')}
      </div>

      <div>
        <label
          htmlFor="unc-image"
          style={{ fontWeight: 'bold', display: 'block' }}
        >
          Profile Image:
        </label>
        <input
          id="unc-image"
          name="imageFile"
          type="file"
          accept="image/png, image/jpeg"
        />
        {renderError('image')}
      </div>

      <div style={{ marginTop: '8px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input id="unc-terms" name="terms" type="checkbox" />
          <span>I accept Terms and Conditions</span>
        </label>
        {renderError('terms')}
      </div>

      <button
        type="submit"
        style={{
          padding: '10px',
          marginTop: '16px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold',
        }}
      >
        Submit (Uncontrolled)
      </button>
    </form>
  );
};

export default UncontrolledForm;
