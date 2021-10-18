import { useEffect, useState } from 'react'

export function debounce(fn, time = 0){
  let prevTimer = null;
  return function(){
    clearInterval(prevTimer);
    let context = this, args = arguments
    let calledFn = () => { 
      fn.apply(context, args);
    }
    prevTimer = setTimeout(calledFn,time);
  }
}

export function flattenStyle(stylesArray){
  let styles = stylesArray.reduce((acc,style) => {
    if(acc){
      acc = `${acc} ${style}`;
    }
    else {
      acc = style;
    }
    return acc;
  },'')

  return styles;
} 

export function useMaxWidth(width = 600){
  const [passed, setPassed] = useState();

  useEffect(() => {
    const listener = ()=>{
      if(width < window.innerWidth){
        setPassed(true)
      }
      else {
        setPassed(false)
      }
    }
    window.addEventListener('resize',listener);
    listener();

    return () => {
      window.removeEventListener('resize',listener);
    }
  }, [width])
  return passed
} 