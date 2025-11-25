import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';

type DropdownProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, placeholder = 'Select...' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const displayValue = value === 'all' ? 'All repositories' : value;

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {displayValue}
        </span>
        <span className={styles.arrow}></span>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div
            className={`${styles.dropdownItem} ${value === 'all' ? styles.selected : ''}`}
            onClick={() => handleSelect('all')}
          >
            All repositories
          </div>
          {options.map((option) => (
            <div
              key={option}
              className={`${styles.dropdownItem} ${value === option ? styles.selected : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
