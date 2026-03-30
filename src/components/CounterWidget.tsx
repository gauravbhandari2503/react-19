import { Button } from '$/components/button';
import { Card } from '$/components/card';

import useCounter from '../hooks/useCounter';

function CounterWidget() {
    // this code is not optimized for performance, as it re-renders the button components on every state change.
    //  In a real application, you might want to use useCallback or memo to optimize it.
    // const [count, setCount] = useState(0);
    // const increment = () => setCount(count+1);
    // const decrement = () => setCount(count-1);
    // const reset = () => setCount(0);

    // Optimized version using useCallback to prevent unnecessary re-renders of the button components.
    const { count, increment, decrement, reset } = useCounter();
    return (
        <div className="mt-8 w-full max-w-md sm:mt-10">
            <Card
                title="Counter Widget"
                description="Increment, decrement, or reset the value."
                className="border-slate-200 dark:border-slate-700"
                contentClassName="space-y-6"
            >
                <div className="rounded-lg bg-slate-50 p-4 text-center dark:bg-slate-800/70">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Current Count</p>
                    <p className="mt-1 text-4xl font-bold text-slate-900 dark:text-slate-100">{count}</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <Button variant="secondary" onClick={decrement} fullWidth>
                        Decrement
                    </Button>
                    <Button variant="ghost" onClick={reset} fullWidth>
                        Reset
                    </Button>
                    <Button variant="secondary" onClick={increment} fullWidth>
                        Increment
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default CounterWidget