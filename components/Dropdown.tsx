import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';

type DropdownProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  bgColor?: string;
  textColor?: string;
};

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, placeholder = 'Select...', bgColor, textColor }) => {
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
        style={{ color: textColor, borderColor: textColor }}
      >
        {value === 'all' ? 'All repositories' : value}
        <span className={styles.arrow} style={{ borderRightColor: textColor, borderBottomColor: textColor }}></span>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu} style={{ backgroundColor: bgColor, color: textColor, borderColor: textColor }}>
          <div
            className={`${styles.dropdownItem} ${value === 'all' ? styles.selected : ''}`}
            onClick={() => handleSelect('all')}
            style={{ color: textColor }}
          >
            All repositories
          </div>
          {options.map((option) => (
            <div
              key={option}
              className={`${styles.dropdownItem} ${value === option ? styles.selected : ''}`}
              onClick={() => handleSelect(option)}
              style={{ color: textColor }}
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
