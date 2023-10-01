import { Dayjs } from "dayjs";
import { useState } from "react";

export type useFormulaireResult<T> = {
  formulaire: T;
  handleChange: (e: any) => void;
  setFormulaire: (value: T) => void;
  handleCustomChange: (name: string, value: any) => void;
  handleCheckboxChange: (e: any) => void;
};

export function useFormulaire<T = any>(
  initialState: any = undefined
): useFormulaireResult<T> {
  const [formulaire, setFormulaire] = useState<T>(initialState);

  function update(name: string, value: string | number | boolean | Dayjs) {
    setFormulaire({ ...formulaire, [name]: value });
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    update(name, value);
  };

  const handleCheckboxChange = (e: any) => {
    const { name, checked } = e.target;
    update(name, checked);
  };

  const handleCustomChange = (name: string, value: any) => {
    update(name, value);
  };

  return {
    formulaire,
    handleChange,
    setFormulaire,
    handleCustomChange,
    handleCheckboxChange,
  };
}
