import React, { useEffect } from "react";
import { nanoid } from 'nanoid'
import "./App.css";




function App() {

  const getUuid = ()=> {
    if (typeof crypto === 'object') {
      if (typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
      }
      if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
        const callback = (c) => {
          const num = Number(c);
          return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
        };
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, callback);
      }
    }
    let timestamp = new Date().getTime();
    let perforNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let random = Math.random() * 16;
      if (timestamp > 0) {
        random = (timestamp + random) % 16 | 0;
        timestamp = Math.floor(timestamp / 16);
      } else {
        random = (perforNow + random) % 16 | 0;
        perforNow = Math.floor(perforNow / 16);
      }
      return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
    });
  };



  useEffect(() => {
    // let set1 = new Set();
    const t1 = new Date().getTime();
    for (let i = 0; i < 10_000_000; i++) {
      getUuid()
      // crypto.randomUUID()
      // set1.add(crypto.randomUUID())

    }
    const total1 = new Date().getTime() - t1;
    console.log("total1", total1);
    // console.log('set1.size',set1.size)

    const t2 = new Date().getTime();
    for (let i = 0; i < 10_000_000; i++) {
      nanoid();
    }
    const total2 = new Date().getTime() - t2;
    console.log("total2", total2);
  });

  return <div className="App">测试id生成方案</div>;
}

export default App;
