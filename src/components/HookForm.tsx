import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStore } from '../store/useFormStore';
import { formSchema } from '../schemas/form.schema';
import type { FormSchemaType } from '../schemas/form.schema';
import { validateImageFile, convertToBase64 } from '../utils/file.utils';
import PasswordStrength from './PasswordStrength';
import CountryAutocomplete from './CountryAutocomplete';

interface Props {
  onSuccess: () => void;
}

const HookForm = ({ onSuccess }: Props) => {
  const addSubmission = useFormStore((state) => state.addSubmission);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange', 
    defaultValues: {
      name: '',
      age: '' as unknown as number, 
      email: '',
      gender: '' as 'male' | 'female' | 'other',
      country: '',
      password: '',
      confirmPassword: '',
      image: '',
      terms: false as unknown as true, 
    },
  });

const watchedPassword = useWatch({
  control,
  name: 'password',
  defaultValue: '',
});

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageError = validateImageFile(file);
    if (imageError) {
      setError('image', { type: 'manual', message: imageError });
      setValue('image', '');
      return;
    }

    clearErrors('image');
    const base64 = await convertToBase64(file);
    setValue('image', base64, { shouldValidate: true });
  };

  const onSubmit = (data: FormSchemaType) => {
    addSubmission(data);
    reset();
    onSuccess();
  };

  const renderError = (fieldName: keyof FormSchemaType) => (
    <div style={{ color: 'red', fontSize: '0.8rem', minHeight: '18px', marginTop: '2px' }}>
      {errors[fieldName]?.message || ''}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      
      <div>
        <label htmlFor="hk-name" style={{ fontWeight: 'bold', display: 'block' }}>Name:</label>
        <input 
          id="hk-name" 
          type="text" 
          {...register('name')} 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
        />
        {renderError('name')}
      </div>

      <div>
        <label htmlFor="hk-age" style={{ fontWeight: 'bold', display: 'block' }}>Age:</label>
        <input 
          id="hk-age" 
          type="number" 
          {...register('age', { valueAsNumber: true })} 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
        />
        {renderError('age')}
      </div>

      <div>
        <label htmlFor="hk-email" style={{ fontWeight: 'bold', display: 'block' }}>Email:</label>
        <input 
          id="hk-email" 
          type="text" 
          {...register('email')} 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
        />
        {renderError('email')}
      </div>

      <div>
        <label htmlFor="hk-gender" style={{ fontWeight: 'bold', display: 'block' }}>Gender:</label>
        <select id="hk-gender" {...register('gender')} style={{ width: '100%', padding: '8px' }}>
          <option value="">-- Select Gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {renderError('gender')}
      </div>

      <div>
        <label htmlFor="hk-country" style={{ fontWeight: 'bold', display: 'block' }}>Country:</label>
        <input
          id="hk-country"
          type="text"
          list="countries-list-hk"
          {...register('country')}
          placeholder="Type to search country..."
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
        <CountryAutocomplete id="hk-country" name="country" /> 
        {renderError('country')}
      </div>

      <div>
        <label htmlFor="hk-password" style={{ fontWeight: 'bold', display: 'block' }}>Password:</label>
        <input 
          id="hk-password" 
          type="password" 
          {...register('password')} 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
        />
        <PasswordStrength password={watchedPassword} />
        {renderError('password')}
      </div>

      <div>
        <label htmlFor="hk-confirmPassword" style={{ fontWeight: 'bold', display: 'block' }}>Confirm Password:</label>
        <input 
          id="hk-confirmPassword" 
          type="password" 
          {...register('confirmPassword')} 
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
        />
        {renderError('confirmPassword')}
      </div>

      <div>
        <label htmlFor="hk-image" style={{ fontWeight: 'bold', display: 'block' }}>Profile Image:</label>
        <input 
          id="hk-image" 
          type="file" 
          accept="image/png, image/jpeg" 
          onChange={handleImageChange} 
        />
        <input type="hidden" {...register('image')} />
        {renderError('image')}
      </div>

      <div style={{ marginTop: '8px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input id="hk-terms" type="checkbox" {...register('terms')} />
          <span>I accept Terms and Conditions</span>
        </label>
        {renderError('terms')}
      </div>

      <button 
        type="submit" 
        disabled={!isValid}
        style={{ 
          padding: '10px', 
          marginTop: '16px', 
          cursor: isValid ? 'pointer' : 'not-allowed', 
          fontSize: '1rem', 
          fontWeight: 'bold',
          opacity: isValid ? 1 : 0.5
        }}
      >
        Submit (Hook Form)
      </button>
    </form>
  );
};

export default HookForm;