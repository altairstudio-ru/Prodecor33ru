export function formatPhone(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');

  // Remove leading 8 or 7 if present to standardize
  let cleaned = digits;
  if (cleaned.startsWith('8') && cleaned.length > 1) {
    cleaned = '7' + cleaned.slice(1);
  } else if (!cleaned.startsWith('7') && cleaned.length > 0) {
    cleaned = '7' + cleaned;
  }

  // Limit to 11 digits (Russian phone number with country code)
  cleaned = cleaned.slice(0, 11);

  // Apply mask
  let result = '+';
  if (cleaned.length > 0) {
    result += cleaned[0]; // country code
  }
  if (cleaned.length > 1) {
    result += ' (' + cleaned.slice(1, 4); // area code
  }
  if (cleaned.length >= 4) {
    result += ')';
  }
  if (cleaned.length > 4) {
    result += ' ' + cleaned.slice(4, 7); // first part
  }
  if (cleaned.length > 7) {
    result += '-' + cleaned.slice(7, 9); // second part
  }
  if (cleaned.length > 9) {
    result += '-' + cleaned.slice(9, 11); // third part
  }

  return result;
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  // Russian phone: 11 digits starting with 7
  return digits.length === 11 && digits.startsWith('7');
}

export function getPhoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}
