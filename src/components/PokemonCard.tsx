import { memo } from 'react';
import { Card } from '$/components/card';

export type Pokemon = {
	id: number;
	name: {
		english: string;
		japanese: string;
		chinese: string;
		french: string;
	};
	type: string[];
	species: string;
	description: string;
	image: {
		sprite?: string;
		thumbnail?: string;
		hires?: string;
	};
};

type PokemonCardProps = Readonly<{
	pokemon: Pokemon;
}>;

const PokemonCard = memo(function ({ pokemon }: PokemonCardProps) {
	return (
		<Card
			title={`${pokemon.name.english} #${pokemon.id}`}
			description={pokemon.species}
			className="w-full max-w-md border-slate-200 dark:border-slate-700"
			contentClassName="space-y-4"
		>
			<div className="flex items-center gap-4">
				<img
					src={pokemon.image.thumbnail ?? pokemon.image.sprite ?? pokemon.image.hires}
					alt={pokemon.name.english}
					className="h-20 w-20 rounded-md bg-slate-100 object-contain p-1 dark:bg-slate-800"
					loading="lazy"
				/>

				<div>
					<p className="text-sm text-slate-600 dark:text-slate-400">{pokemon.name.japanese}</p>
					<p className="text-sm text-slate-600 dark:text-slate-400">{pokemon.name.chinese}</p>
					<p className="text-sm text-slate-600 dark:text-slate-400">{pokemon.name.french}</p>
				</div>
			</div>

			<div className="flex flex-wrap gap-2">
				{pokemon.type.map((type) => (
					<span
						key={`${pokemon.id}-${type}`}
						className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
					>
						{type}
					</span>
				))}
			</div>

			<p className="text-sm text-slate-700 dark:text-slate-300">{pokemon.description}</p>
		</Card>
	);
});

export default PokemonCard;

