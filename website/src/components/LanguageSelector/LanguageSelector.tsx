import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './LanguageSelector.module.css';

type Language = 'en' | 'ur' | 'zh';

const LANGUAGES: { value: Language; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'ur', label: 'اردو', flag: '🇵🇰' },
  { value: 'zh', label: '中文', flag: '🇨🇳' },
];

export const LanguageSelector: React.FC = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLButtonElement[]>([]);

  const currentLang = LANGUAGES.find(lang => lang.value === language);
  const availableLanguages = LANGUAGES.filter(lang => lang.value !== language);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus management for options
  useEffect(() => {
    if (isOpen && focusedIndex !== null && optionsRef.current[focusedIndex]) {
      optionsRef.current[focusedIndex].focus();
    }
  }, [isOpen, focusedIndex]);

  // Reset focused index when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(null);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          setIsOpen(!isOpen);
          if (!isOpen) {
            setFocusedIndex(0);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(null);
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setTimeout(() => setFocusedIndex(0), 0);
          } else {
            setFocusedIndex(prev =>
              prev === null || prev >= availableLanguages.length - 1
                ? 0
                : prev + 1
            );
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setTimeout(() => setFocusedIndex(availableLanguages.length - 1), 0);
          } else {
            setFocusedIndex(prev =>
              prev === null || prev <= 0
                ? availableLanguages.length - 1
                : prev - 1
            );
          }
          break;
        case 'Home':
          e.preventDefault();
          setIsOpen(true);
          setFocusedIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setIsOpen(true);
          setFocusedIndex(availableLanguages.length - 1);
          break;
        case 'Tab':
          setIsOpen(false);
          setFocusedIndex(null);
          break;
        default:
          // Handle first letter navigation
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const firstMatchIndex = availableLanguages.findIndex(
              lang => lang.label.charAt(0).toLowerCase() === e.key.toLowerCase()
            );
            if (firstMatchIndex >= 0) {
              setIsOpen(true);
              setFocusedIndex(firstMatchIndex);
            }
          }
          break;
      }
    },
    [isOpen, availableLanguages.length]
  );

  const handleOptionKeyDown = useCallback(
    (e: React.KeyboardEvent, langValue: Language, index: number) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          changeLanguage(langValue);
          setIsOpen(false);
          setFocusedIndex(null);
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(null);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(
            index === availableLanguages.length - 1 ? 0 : index + 1
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(
            index === 0 ? availableLanguages.length - 1 : index - 1
          );
          break;
        case 'Tab':
          setIsOpen(false);
          setFocusedIndex(null);
          break;
        case 'Home':
          e.preventDefault();
          setFocusedIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setFocusedIndex(availableLanguages.length - 1);
          break;
        default:
          break;
      }
    },
    [availableLanguages.length]
  );

  return (
    <div className={styles.languageSelector} ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select language"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={styles.languageButton}
      >
        <span className="flex items-center">
          <span className="mr-2 text-lg hidden sm:block">{currentLang?.flag}</span>
          <span className="sm:hidden">{currentLang?.value.toUpperCase()}</span>
          <span className="hidden sm:block">{currentLang?.label}</span>
        </span>
        <svg
          className={`fill-current h-4 w-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.languageDropdown} role="listbox">
          <ul className={styles.languageOptions}>
            {availableLanguages.map((lang, index) => (
              <li key={lang.value}>
                <button
                  type="button"
                  ref={el => (optionsRef.current[index] = el!)}
                  className={styles.languageOption}
                  onClick={() => {
                    changeLanguage(lang.value);
                    setIsOpen(false);
                    setFocusedIndex(null);
                  }}
                  onKeyDown={e => handleOptionKeyDown(e, lang.value, index)}
                  role="option"
                  aria-selected={language === lang.value}
                >
                  <span className="mr-2">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
