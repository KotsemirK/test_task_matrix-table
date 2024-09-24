import React from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Form from '../UI/Form/Form';
import useForm from '../../hooks/useForm';

interface MatrixFormProps {
  onSubmit: (M: number, N: number, X: number) => void;
}

const MatrixForm: React.FC<MatrixFormProps> = ({ onSubmit }) => {
  const { values, errors, setM, setN, setX, validate } = useForm({ M: 100, N: 100, X: 3 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(values.M, values.N, values.X);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="Number of rows (M)"
        name="rows"
        value={values.M}
        onChange={(e) => setM(e.target.value)}
        error={errors.M}
      />
      <Input
        label="Number of columns (N)"
        name="columns"
        value={values.N}
        onChange={(e) => setN(e.target.value)}
        error={errors.N}
      />
      <Input
        label="Number of closest cells (X)"
        name="closest"
        value={values.X}
        onChange={(e) => setX(e.target.value)}
        error={errors.X}
      />
      <Button label="Generate Matrix" onClick={() => { }} />
    </Form>
  );
};

export default MatrixForm;
