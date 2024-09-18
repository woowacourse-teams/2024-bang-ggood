import { ChangeEventHandler } from "react";
import { createStore, StateCreator } from "zustand";

import { FormFieldSpec } from "@/store/createFormStore";
import { Validator } from "@/utils/validators";


interface InputFieldNumericState {
  rawValue: string;
  value: string|number;
  errorMessage: string;
}

interface Action {
  setInputWithValidation:(rawValue:string)=>void;
  set:(rawValue:string)=>void;
  onChange:ChangeEventHandler<HTMLInputElement>;
  _setAndParse:(rawValue:string)=>void;
  reset:() => void;
}

type InputFieldState =  InputFieldNumericState&{actions:Action};

export const createFormFieldSlice = (initialRawValue:string,validators:Validator[], type:'string'|'number'):StateCreator<InputFieldState> =>
  (set, get)=>({
  rawValue:initialRawValue,
  errorMessage:'',
  value:parseValue(initialRawValue, type),
  actions:{
    onChange: (e)=>get().actions.setInputWithValidation(e.target.value),
    set: (rawValue)=>get().actions.setInputWithValidation(rawValue),

    setInputWithValidation:(rawValue:string)=>{
      const newErrorMessage = rawValue==='' ? '':validation(rawValue, validators);
      set({errorMessage:newErrorMessage});
      if (newErrorMessage === '') get().actions._setAndParse(rawValue);  // 에러가 없으면 업데이트        
    },
    
    reset:() => get().actions.setInputWithValidation(initialRawValue),
    _setAndParse:(rawValue:string) => set({rawValue, value:parseValue(rawValue, type)}),
  }
});


const parseValue = (value:string, type:'string'|'number')=> type==='number'?Number(value):value;

type FormSpec<T> = {
  [k in keyof T]: FormFieldSpec;
};

export const createInputFieldStores = <T extends object>(formSpec:FormSpec<T>)=>{
  const storeList = Object.entries<FormFieldSpec>(formSpec).map(([key, value])=>({name:key, store:createStore(createFormFieldSlice(value.initialValue,value.validators,value.type)) }));
  
  const findByName = (name:keyof T)=> storeList.find(store=>store.name === name)!.store; // 존재함이 보장되므로 ! 사용.
  const setByName = (name:keyof T, rawValue:string)=>{
    const foundStore = findByName(name);
    foundStore.getState().actions.setInputWithValidation(rawValue);
  }; 

  // as 쓴 이유 : JS의 Object.entries 함수가 key에 대한 제네릭을 지원하지 않아서 써줘야 함.
  const setAll = (rawValueObj:T)=> Object.entries(rawValueObj).forEach(([name, rawValue])=> setByName(name as keyof T, rawValue)); // 인자 - (키: name, 밸류: rawValue인 객체)
  const resetAll = ()=>Object.entries(formSpec).map(([name])=> findByName(name as keyof T).getState().actions.reset());
  const getStates = ()=>Object.fromEntries(storeList.map(store=>[store.name, store.store.getState()]))
  
  const onChange:ChangeEventHandler<HTMLInputElement> = (e)=>{
    setByName(e.target.name as keyof T, e.target.value);
  }

  return {onChange, findByName, getStates, setAll, resetAll};
};

const validation = (rawValue:string, validators:Validator[])=>{
  const newErrorMessage = validators?.slice().reverse() //validatiors 가 런타임 때 undefined 일 경우를 대비해 ? 로 처리
      .reduce((acc, { validate, errorMessage }) => (!validate(rawValue) ? errorMessage : acc), '') ?? '';
  return newErrorMessage;
}