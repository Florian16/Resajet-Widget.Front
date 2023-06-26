import { useState } from "react";

export type useFormulaireResult<T> = {
  formulaire: T;
  handleChange: (e: any) => void;
  setFormulaire: (value: T) => void;
};

export function useFormulaire<T = any>(
  initialState: any = undefined
): useFormulaireResult<T> {
  const [formulaire, setFormulaire] = useState<T>(initialState);

  function update(name: string, value: string | number | boolean) {
    setFormulaire({ ...formulaire, [name]: value });
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    update(name, value);
  };

  return {
    formulaire,
    handleChange,
    setFormulaire,
  };
}
