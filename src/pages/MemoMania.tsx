import { useState } from 'react';
import { Button } from '$/components/button';
import CalculationHeavy from '../components/CalculationHeavy';

export default function MemoMania() {
	const [cardIds, setCardIds] = useState<number[]>([]);

	const addCard = () => {
		setCardIds((prev) => [...prev, Date.now() + Math.floor(Math.random() * 1000)]);
	};

	const removeCard = (id: number) => {
		setCardIds((prev) => prev.filter((cardId) => cardId !== id));
	};

	return (
		<div className="w-full">
			<div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6">
				<div className="w-full text-center">
					<p className="text-sm font-medium uppercase tracking-wide text-primary-700 dark:text-primary-300">
						React 19 POC
					</p>
					<h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
						Memo Mania
					</h1>
					<p className="mt-3 text-sm text-slate-600 sm:text-base dark:text-slate-400">
						Start with one fixed math card, then create more random math cards as needed.
					</p>
				</div>

				<div className="w-full flex justify-end">
					<Button variant="primary" onClick={addCard}>Create random math card</Button>
				</div>

				<CalculationHeavy />

				{cardIds.map((id) => (
					<CalculationHeavy key={id} onRemove={() => removeCard(id)} />
				))}
			</div>
		</div>
	);
}

