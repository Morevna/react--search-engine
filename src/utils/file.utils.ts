export const validateImageFile = (file: File): string | null => {
  const validTypes = ['image/png', 'image/jpeg'];
  if (!validTypes.includes(file.type)) {
    return 'Only PNG and JPEG images are allowed';
  }

  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    return 'Image size must be less than 2MB';
  }

  return null;
};

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const checkPasswordStrength = (password: string) => {
  return {
    hasNumber: /\d/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};
