import React, {RefObject, useEffect, useRef, useState} from 'react';
import style from './App.module.css';

function App() {


  const [disabled, setDisabled] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>()
  const [intervalId, setIntervalId] = useState<any>()

  const target = useRef<HTMLDivElement>(null)
  const element = useRef<HTMLDivElement>(null)
  const start = useRef<HTMLDivElement>(null)


  useEffect(()=>{
    if(disabled && !timer && timer !== 0){
      setTimer(5)
      const interval = setInterval(() => {
        setTimer(prevState => prevState as number - 1)}, 1000)
      setIntervalId(interval)
    }
    if (timer === 0){
      setDisabled(false)
      setTimer(undefined)
      clearInterval(intervalId)
    }

  }, [disabled, timer])

  const onStartClick = () =>{
    setDisabled(true)

    if(element.current && target.current && start.current) {

      const rect = start.current.getBoundingClientRect()

      const xS = rect.left + 50
      const yS = rect.top + 50
      const xT = target.current.offsetLeft + 50;
      const yT = target.current.offsetTop + 50;
      element.current.animate( [{
        left: xS + 'px',
        top: yS + 'px',
        display: 'block'
      }, {
        left: xT + 'px',
        top: yT + 'px',
        display: 'none'
      } ],  {duration: 2000})
    }
  }


  return (
    <div className={style.App}>
      <div ref={element} className={style.ball}/>
      <div className={style.blockWrapper}>
          <div ref={start} className={style.animatedBlock}>
            <span>1</span>
          </div>
          <div ref={target} className={style.targetElement}>2</div>
      </div>
      <button className={style.startButton} onClick={onStartClick} disabled={disabled}>{disabled ? timer :'Start'}</button>
    </div>
  );
}

export default App;
