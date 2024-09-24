import { useState } from 'react';

const useForm = (initialValues: { M: number; N: number; X: number }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ M?: string; N?: string; X?: string }>({});

  const createSetValue = (name: keyof typeof initialValues) => {
    return (newValue: string) => {
      if (/^\d*$/.test(newValue)) {
        setValues((prevValues) => ({
          ...prevValues,
          [name]: Number(newValue),
        }));
      }
    };
  };

  const validate = () => {
    const newErrors: { M?: string; N?: string; X?: string } = {};
    const { M, N, X } = values;

    if (M < 1 || M > 100) {
      newErrors.M = 'M must be in the range from 1 to 100';
    }

    if (N < 1 || N > 100) {
      newErrors.N = 'N must be in the range from 1 to 100';
    }

    if (X < 1 || X > M * N) {
      newErrors.X = `X must be in the range from 1 to ${M * N}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    setM: createSetValue('M'),
    setN: createSetValue('N'),
    setX: createSetValue('X'),
    validate,
  };
};

export default useForm;
