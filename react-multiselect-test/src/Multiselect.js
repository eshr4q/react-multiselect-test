import React, { useState, useRef, useEffect } from 'react';
import './App.css'; 

const MultiSelect = ({ defaultOptions }) => {
    const [options, setOptions] = useState(defaultOptions);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState('bottom');
    const containerRef = useRef(null);
    const dropdownRef = useRef(null);
  
    const addOption = () => {
        if (inputValue.trim() && !options.includes(inputValue)) {
            setOptions([...options, inputValue]);
            setInputValue('');
        }
    };
  
    const handleSelect = (option) => {
        if (!selectedOptions.includes(option)) {
            setSelectedOptions([...selectedOptions, option]);
        }
        setIsDropdownOpen(false);
    };
  
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addOption();
        }
    };

    const determineDropdownPosition = () => {
        if (containerRef.current && dropdownRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const dropdownHeight = dropdownRef.current.scrollHeight;
            const viewportHeight = window.innerHeight;
        
            // Calculate available space on the screen
            const spaceAbove = containerRect.top;
            const spaceBelow = viewportHeight - containerRect.bottom;
       
            // Determine the position based on available space
            if (spaceBelow >= dropdownHeight) {
                setDropdownPosition('bottom');
            } else if (spaceAbove >= dropdownHeight) {
                setDropdownPosition('top');
            } else {
                setDropdownPosition('bottom');
            }
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            determineDropdownPosition();
        }
    }, [isDropdownOpen]);

    // Apply dynamic styles based on dropdown position
    const getDropdownStyle = () => {
        switch (dropdownPosition) {
            case 'top':
                return { bottom: '100%', marginBottom: '8px' };
            case 'bottom':
                return { top: '100%', marginTop: '8px' };
            default:
                return { top: '100%', marginTop: '8px' };
        }
    };

    return (
        <div className="card" ref={containerRef}>
            <div className="multi-select-container" style={{ position: 'relative' }}>
                <label className="vendor-label">Vendor Name*</label>
                <div className="input-container" style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type to add options"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="multi-input"
                    />
                    <button onClick={addOption} className="add-btn">Add</button>
                </div>

                {isDropdownOpen && (
                    <div className="options-list" style={{ position: 'absolute', ...getDropdownStyle() }} ref={dropdownRef}>
                        {options.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelect(option)}
                                className={`option-item ${selectedOptions.includes(option) ? 'selected' : ''}`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}

                {!isDropdownOpen && (
                    <div className="selected-options">
                        {selectedOptions.map((option, index) => (
                            <span key={index} className="selected-item">
                                {option}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MultiSelect;