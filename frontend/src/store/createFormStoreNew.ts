import { ChangeEventHandler } from "react";
import { createStore, StateCreator, useStore } from "zustand";

import { FormFieldSpec } from "@/store/createFormStore";
import { Validator } from "@/utils/validators";

interface Action {
  setInputWithValidation:(rawValue:string)=>void;
  onChange:ChangeEventHandler<HTMLInputElement>;
  _setAndParse:(rawValue:string)=>void;
  reset:() => void;
}

interface InputFieldNumericState {
  rawValue: string;
  value: number|string;
  errorMessage: string;
}


type InputFieldState =  InputFieldNumericState&{actions:Action};

export const createNumericSlice:(initialRawValue:string,validators:Validator[], type:'number'|'string')=>StateCreator<InputFieldState> = (initialRawValue, validators,type)=>(set, get)=>({
  rawValue:initialRawValue,
  errorMessage:'',
  value:parseValue(initialRawValue, type),
  actions:{
    onChange: (e)=>{
        get().actions.setInputWithValidation(e.target.value);
      },
      
    setInputWithValidation:(rawValue:string)=>{
      const newErrorMessage = rawValue==='' ? '':validation(rawValue, validators);
      set({errorMessage:newErrorMessage});
      if (newErrorMessage === ''){ // 에러가 없으면 업데이트
        get().actions._setAndParse(rawValue);
      }
    },
    reset:() => get().actions.setInputWithValidation(initialRawValue),
    _setAndParse:(rawValue:string) => set({rawValue, value:parseValue(rawValue, type)}),
  }
});

const parseValue = (value:string, type:'string'|'number')=> type==='number'?Number(value):value;

type FormSpec<T> = {
  [k in keyof T]: FormFieldSpec;
};

export const createInputFieldStores = <T>(formSpec:FormSpec<T>)=>{
  const storeList = Object.entries<FormFieldSpec>(formSpec).map(([key, value])=>({name:key, store:createStore(createNumericSlice(value.initialValue,value.validators,value.type)) }));
  
  const findByName = (name:string)=> storeList.find(store=>store.name === name)!; // 존재함이 보장됨.
  const setByName = (name:string, rawValue:string)=>{
    const foundStore = findByName(name);
    foundStore?.store.getState().actions.setInputWithValidation(rawValue);
  }; 
  const resetByName = (name:string) => findByName(name)?.store.getState().actions.reset();
  const getByName = (name:keyof T) => findByName(name as string)?.store.getState();
  
  const setAll = (rawValueObj:object)=> Object.entries(rawValueObj).forEach(([name, rawValue])=> setByName(name,rawValue)); // 인자 - (키: name, 밸류: rawValue인 객체)
  const resetAll = ()=>Object.entries(formSpec).map(([name])=> findByName(name)?.store.getState().actions.reset());
  const getStates = ()=>Object.fromEntries(storeList.map(store=>[store.name,store.store.getState()]))
  
  const onChange:ChangeEventHandler<HTMLInputElement> = (e)=>{
    setByName(e.target.name, e.target.value);
  }

  const useSelectedStore = <U>(name:keyof T, selector:(state:InputFieldState)=>U):U=>useStore((findByName(name as string)!.store), selector);
  
  return {getStates,getByName, onChange, setByName, resetByName, setAll, resetAll, useSelectedStore};
};

const validation = (rawValue:string, validators:Validator[])=>{
  const newErrorMessage = validators?.slice().reverse() //validatiors 가 런타임 때 undefined 일 경우를 대비해 ? 로 처리
      .reduce((acc, { validate, errorMessage }) => (!validate(rawValue) ? errorMessage : acc), '') ?? '';
  return newErrorMessage;
}