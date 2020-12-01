import { BodySelect} from './styles';
// import { Link } from 'react-router-dom';
import makeAnimated from 'react-select/animated';
import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';
interface Props extends SelectProps<OptionTypeBase>{
  name: string;
  label?: string;
}
const Select: React.FC<Props> = ({ name, label, ...rest }) => {
  const animatedComponents = makeAnimated();
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <BodySelect>
      <label htmlFor={name}>{label}</label>
      
      <ReactSelect
        ref={selectRef}
        closeMenuOnSelect={true}
        components={animatedComponents}
        placeholder={defaultValue || "Selecione"}
        className="select"
        {...rest}
      />

    </BodySelect>

  )

}

export default Select;