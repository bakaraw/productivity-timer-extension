import React from 'react';

type NumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}) => {
  const handleIncrement = () => {
    if (value + step <= max) {
      onChange(value + step);
    } else {
      onChange(min);
    }
  };

  const handleDecrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    } else {
      onChange(max);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col items-center w-20">
      <button
        onClick={handleIncrement}
        className="text-lg w-full h-6 leading-none bg-gray-200 hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
      >
        ▲
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className="text-black text-center w-full p-1 border border-gray-300 rounded-none focus:outline-none"
        style={{
          appearance: 'textfield', // Hides default arrows
          MozAppearance: 'textfield', // Firefox
          WebkitAppearance: 'textfield',
        }}
      />
      <button
        onClick={handleDecrement}
        className="text-lg w-full h-6 leading-none bg-gray-200 hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
      >
        ▼
      </button>
    </div>
  );
};

export default NumberInput;
