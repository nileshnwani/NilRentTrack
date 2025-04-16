export function saveUserToLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromLocalStorage() {
  try {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem('user');
      return item ? JSON.parse(item) : null;
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error);
  }
  return null;
}


export function removeUserFromLocalStorage() {
  localStorage.removeItem('user');
}
