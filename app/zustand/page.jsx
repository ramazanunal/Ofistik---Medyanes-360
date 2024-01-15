'use client'
import {useBearStore} from "@/store/BearCounter";

function BearCounter() {
    const bears = useBearStore((state) => state.bears)
    return <h1>{bears} around here ...</h1>
}

function Controls() {
    const increasePopulation = useBearStore((state) => state.increasePopulation)
    return <button onClick={increasePopulation}>one up</button>
}

export default () => <div className="flex flex-col gap-4 items-center text-4xl justify-center h-screen">
    <BearCounter />
    <Controls />
</div>
