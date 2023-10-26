import { Dayjs } from "dayjs";
import { useState } from "react";

export type useFormulaireResult<T> = {
  formulaire: T;
  handleChange: (e: any) => void;
  setFormulaire: (value: T) => void;
  handleCustomChange: (name: string, value: any) => void;
  handleDoubleChange: (
    firstName: string,
    firstValue: Date | undefined,
    secondName: string,
    secondValue: Date | undefined
  ) => void;
  handleCheckboxChange: (e: any) => void;
};

export function useFormulaire<T = any>(
  initialState: any = undefined
): useFormulaireResult<T> {
  const [formulaire, setFormulaire] = useState<T>(initialState);

  const update = (name: string, value: string | number | boolean | Dayjs) => {
    setFormulaire({ ...formulaire, [name]: value });
  };

  const doubleUpdate = (
    firstName: string,
    firstValue: Date | undefined,
    secondName: string,
    secondValue: Date | undefined
  ) => {
    setFormulaire({
      ...formulaire,
      [firstName]: firstValue,
      [secondName]: secondValue,
    });
  };

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

  const handleDoubleChange = (
    firstName: string,
    firstValue: Date | undefined,
    secondName: string,
    secondValue: Date | undefined
  ) => {
    doubleUpdate(firstName, firstValue, secondName, secondValue);
  };

  return {
    formulaire,
    handleChange,
    setFormulaire,
    handleCustomChange,
    handleDoubleChange,
    handleCheckboxChange,
  };
}
