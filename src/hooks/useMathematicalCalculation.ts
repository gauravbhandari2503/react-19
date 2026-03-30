import { useState, useCallback } from 'react';

type CalculationType = 'fibonacci' | 'factorial' | 'power';
type CalculationInput = {
  type: CalculationType;
  value: number;
};

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function factorial(n: number): number {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

function power(base: number, exponent: number): number {
  return Math.pow(base, exponent);
}

const calculationHandlers: Readonly<Record<CalculationType, (value: number) => number>> = {
  fibonacci,
  factorial,
  power: (value) => power(value, 2),
};

export default function useMathematicalCalculation(calculationInput: CalculationInput): readonly [number | null, () => void] {
    const [result, setResult] = useState<number | null>(null);
    const { type, value } = calculationInput;

    const calculate = useCallback(() => {
        const handler = calculationHandlers[type];
        const res = handler(value);
        setResult(res);
    }, [type, value]);

    return [result, calculate] as const;
}