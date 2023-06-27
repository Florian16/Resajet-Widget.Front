import { useState } from "react";

export type useFormulaireResult<T> = {
  formulaire: T;
  handleChange: (e: any) => void;
  setFormulaire: (value: T) => void;
  handleCustomChange: (name: string, value: string) => void;
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

  const handleCustomChange = (name: string, value: string) => {
    console.log(name);
    console.log(value);

    update(name, value);
  };

  return {
    formulaire,
    handleChange,
    setFormulaire,
    handleCustomChange,
  };
}
