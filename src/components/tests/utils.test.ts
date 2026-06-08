import { describe, it, expect } from 'vitest';
import {
  validateImageFile,
  checkPasswordStrength,
  convertToBase64,
} from '../../utils/file.utils';

describe('Utility Functions', () => {
  it('should validate image type and size correctly', () => {
    const badFile = new File(['hello'], 'test.txt', { type: 'text/plain' });
    expect(validateImageFile(badFile)).toBe(
      'Only PNG and JPEG images are allowed'
    );

    const bigFile = new File([new ArrayBuffer(3 * 1024 * 1024)], 'pic.png', {
      type: 'image/png',
    });
    expect(validateImageFile(bigFile)).toBe('Image size must be less than 2MB');

    const goodFile = new File(['content'], 'avatar.jpg', {
      type: 'image/jpeg',
    });
    expect(validateImageFile(goodFile)).toBeNull();
  });

  it('should evaluate password strength indicators correctly', () => {
    const weak = checkPasswordStrength('abc');
    expect(weak.hasUpper).toBe(false);
    expect(weak.hasNumber).toBe(false);

    const strong = checkPasswordStrength('Abc1!');
    expect(strong.hasUpper).toBe(true);
    expect(strong.hasLower).toBe(true);
    expect(strong.hasNumber).toBe(true);
    expect(strong.hasSpecial).toBe(true);
  });

  it('should convert file to base64 string', async () => {
    const file = new File(['content'], 'test.png', { type: 'image/png' });
    const result = await convertToBase64(file);
    expect(result).toContain('data:image/png;base64');
  });

  it('should detect missing password strength requirements', () => {
    const weak = checkPasswordStrength('aaaaaa');

    expect(weak.hasUpper).toBe(false);
    expect(weak.hasNumber).toBe(false);
    expect(weak.hasSpecial).toBe(false);
  });
  it('should detect fully weak password', () => {
    const result = checkPasswordStrength('123');

    expect(result.hasUpper).toBe(false);
    expect(result.hasLower).toBe(false);
    expect(result.hasNumber).toBe(true);
    expect(result.hasSpecial).toBe(false);
  });
});
