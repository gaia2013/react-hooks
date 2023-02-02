import { useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import './App.css'
import { PitoshiContext } from './main'
import SomeChild from './SomeChild'
import useLocalStorage from './useLocalStorage'

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1
    case "decrement":
      return state - 1
    default:
      return state
  }
}

function App() {
  const [count, setCount] = useState(0)
  const pitoshiInfo = useContext(PitoshiContext)
  const ref = useRef()
  const [state, dispatch] = useReducer(reducer, 0)

  const handleClick = () => {
    setCount(count + 1)
  }


  // ページが発火するタイミングを設定できる。変数変化時、ページがリロード時、マウントされた時、アンマウントされた時、など。
  // 第２引数が[]の場合、ページがマウントされた時
  // react@v18のstrictモードだと２回発火する仕様
  useEffect(() => {
    console.log("hello hooks")
    // setCount(count + 1)
  }, [count])

  const handleRef = () => {
    console.log(ref.current.value)
    console.log(ref.current.offsetHeight)
  }


  //useMemo メモ化できる　メモ化とはキャッシュに保存すること　値をブラウザキャッシュに保存する
  const [count01, setCount01] = useState(0)
  const [count02, setCount02] = useState(0)

  const square = useMemo(() => {
    let i = 0;
    // 重い処理
    while (i < 2000000000) {
      i++
    }
    return count02 * count02
  }, [count02])

  // const square = () => {
  //   let i = 0;
  //   while (i < 2000000000) {
  //     i++
  //   }
  //   return count02 * count02
  // }


  // useCallback 関数のメモ化
  const [counter, setCounter] = useState(0)

  // const showCount = () => {
  //   alert('これは重い処理です。')
  // }

  const showCount = useCallback(() => {
    alert('これは重い処理です。')
  }, [counter])


  // カスタムフック
  const [age, setAge] = useLocalStorage("age", 30)

  return (
    <div className="App">
      <h1>useState, useEffect</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>

      <hr />
      <h1>useContext</h1>
      <p>{pitoshiInfo.name}</p>
      <p>{pitoshiInfo.age}</p>

      <hr />
      <h1>useRef</h1>
      <input type="text" ref={ref} />
      <button onClick={handleRef}>useRef</button>

      <hr />
      <h1>useReducer</h1>
      <p>カウント： {state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>

      <hr />
      <h1>useMemo</h1>
      <p>
        useMemo メモ化できる <br />
        メモ化とは値をメモリに保存すること<br />
        <br />
        カウント１は+1した値を出力する処理<br />
        <br />
        カウント２は+1した値を出力する処理　と <br />
        カウント２の値を2乗した値を結果に出力する処理　と<br />
        20億回のループ処理<br />
        <br />
        カウント２のstateに対してuseMemoを使用したおかげでカウント１の処理が遅くならずに済む。
      </p>
      <div>カウント１：{count01}</div>
      <div>カウント２：{count02}</div>
      <div>結果：{square}</div>
      <button onClick={() => setCount01(count01 + 1)}>+</button>
      <button onClick={() => setCount02(count02 + 1)}>+</button>

      <hr />
      <h1>useCallback</h1>
      <p>
        関数をメモ化する。関数をメモリに保存する。<br />
        <br />
        親コンポーネントがレンダリングされた時<br />
        子コンポーネントをレンダリングしたくない時につかえる<br />
        （Performance up!）
      </p>

      <SomeChild showCount={showCount} />


      <hr />
      <h1>カスタムフック</h1>
      <p>好きな数字をlocal storageに保存するhooks</p>
      <p>{age}</p>
      <button onClick={() => setAge(80)}>年齢をセット</button>
    </div>
  )
}

export default App
