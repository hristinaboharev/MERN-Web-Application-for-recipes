import { createContext, useEffect, useState } from 'react';

export const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const [saved, setSaved] = useState(() => {
    const stored = localStorage.getItem('savedRecepti');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedRecepti', JSON.stringify(saved));
  }, [saved]);

  const toggleSave = (id) => {
    setSaved(prev =>
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  return (
    <SavedContext.Provider value={{ saved, toggleSave }}>
      {children}
    </SavedContext.Provider>
  );
};
