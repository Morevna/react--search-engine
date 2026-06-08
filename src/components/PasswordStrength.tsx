import { checkPasswordStrength } from '../utils/file.utils';

interface Props {
  password?: string;
}

const PasswordStrength = ({ password = '' }: Props) => {
  if (!password) return null;

  const strength = checkPasswordStrength(password);

  const renderRule = (isValid: boolean, text: string) => (
    <div style={{ color: isValid ? 'green' : 'red', fontSize: '0.85rem', margin: '2px 0' }}>
      {isValid ? '●' : '○'} {text}
    </div>
  );

  return (
    <div style={{ marginTop: '8px', padding: '8px', border: '1px dashed #ccc', borderRadius: '4px' }}>
      <p style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 'bold' }}>Password Strength:</p>
      {renderRule(strength.hasUpper, 'At least 1 uppercase letter')}
      {renderRule(strength.hasLower, 'At least 1 lowercase letter')}
      {renderRule(strength.hasNumber, 'At least 1 number')}
      {renderRule(strength.hasSpecial, 'At least 1 special character')}
    </div>
  );
};

export default PasswordStrength;