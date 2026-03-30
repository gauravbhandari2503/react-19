import { useEffect, useMemo, useState, memo } from 'react';
import { Card } from '$/components/card';
import { Button } from '$/components/button';
import { Input } from '$/components/input';
import useMathematicalCalculation from '../hooks/useMathematicalCalculation';

type CalculationType = 'fibonacci' | 'factorial' | 'power';

type CalculationHeavyProps = Readonly<{
    onRemove?: () => void;
}>;

const CalculationHeavy =  memo(function ({ onRemove }: CalculationHeavyProps) {
    const randomType = useMemo(
        () => (['fibonacci', 'factorial', 'power'][Math.floor(Math.random() * 3)] as CalculationType),
        [],
    );
    const [inputValue, setInputValue] = useState('10');

    const numericValue = useMemo(() => Number.parseInt(inputValue, 10), [inputValue]);
    const isValidNumber = Number.isFinite(numericValue) && numericValue >= 0;
    const safeValue = isValidNumber ? numericValue : 0;

    const [result, calculate] = useMathematicalCalculation({ type: randomType, value: safeValue });

    useEffect(() => {
        calculate();
    }, [randomType, safeValue]);

    const titleByType = {
        fibonacci: 'Fibonacci',
        factorial: 'Factorial',
        power: 'Power (x²)',
    } satisfies Record<CalculationType, string>;

    const helperText = isValidNumber
        ? 'Calculation runs after 450ms debounce.'
        : 'Please enter a valid positive number.';

    return (
        <Card
            title="Heavy Calculation Playground"
            description="Try different operations with a debounced input to avoid recalculating on every keystroke."
            className="w-full max-w-2xl"
        >
            <div className="space-y-5">
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950/40">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Selected randomly for this session
                    </p>
                    <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                        {titleByType[randomType]}
                    </span>
                </div>

                <Input
                    id="calculation-input"
                    type="number"
                    min={0}
                    label="Input number"
                    placeholder="Enter a positive number"
                    value={inputValue}
                    onValueChange={setInputValue}
                    debounceMs={450}
                    helperText={helperText}
                    errorMessage={isValidNumber ? undefined : 'Invalid input'}
                />

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/40">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        <span className="font-medium text-slate-900 dark:text-slate-100">Operation:</span>{' '}
                        {titleByType[randomType]}
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        <span className="font-medium text-slate-900 dark:text-slate-100">Input value:</span>{' '}
                        {inputValue || '—'}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Result: {result ?? '—'}
                    </p>
                </div>

                <div className="flex justify-end gap-2">
                    {onRemove && (
                        <Button variant="danger" onClick={onRemove}>
                            Remove
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setInputValue('10');
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </Card>
    );
})

export default CalculationHeavy;