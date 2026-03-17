'use client'

import { useState } from "react"

export function Contador() {
    const [count, setCount] = useState(0)
    
    const incrementar = () => {
        setCount(prevCount => prevCount + 1)
         if (count > 9){
            alert("Limite atingido")
    }
    }

   
    
    const decrementar = () => {
        setCount(prevCount =>  Math.max(prevCount - 1,0))
    }


     return (
        <div className="flex flex-col gap-4 items-center">
            <h1 className="text-2xl font-bold">{count}</h1>

            <div className="flex gap-2">
                <button onClick={incrementar} className="bg-green-500 px-4 py-2 rounded">
                    Incrementar
                </button>

                <button onClick={decrementar} className="bg-red-500 px-4 py-2 rounded">
                    Decrementar
                </button>
            </div>
        </div>
    )
}