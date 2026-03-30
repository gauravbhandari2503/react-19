import { useCallback, useMemo, useState, useTransition, useDeferredValue } from 'react';
import { Button } from '$/components/button';
import { Input } from '$/components/input';
import PokemonCard from '../components/PokemonCard';
import pokedex from '../data/pokedex.json';
import { filterPokemon } from '../utils/filterPokemon';

export default function PokaMokaPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const [isPending, startTransition] = useTransition();

    const filteredPokemon = useMemo(() => filterPokemon(searchQuery), [searchQuery]);

    const clearSearch = useCallback(() => {
        startTransition(() => {
            setSearchQuery('');
        });
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        startTransition(() => {
            setSearchQuery(value);
        });
    };

    
    const totalPokemon = pokedex.length;
    const visiblePokemon = filteredPokemon.length;
    const hasSearchQuery = searchQuery.trim().length > 0;
    
    const highlightText = useMemo(() => {
        if (!hasSearchQuery) {
            return 'Browse the full Pokédex and search by name, type, species, description, or ability.';
        }

        return `Showing ${visiblePokemon} result${visiblePokemon === 1 ? '' : 's'} for “${searchQuery}”.`;
    }, [hasSearchQuery, searchQuery, visiblePokemon]);

    return (
        <div className="w-full space-y-8">
            <section className="rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-sky-500 p-6 text-white shadow-lg shadow-primary-900/20 sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-100">
                            React 19 POC
                        </p>
                        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Poka Moka Pokédex</h1>
                        <p className="mt-3 max-w-xl text-sm text-primary-50 sm:text-base">
                            Explore Pokémon cards powered by local Pokédex data and a simple client-side search experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        <div className="rounded-xl bg-white/15 p-4 backdrop-blur-sm">
                            <p className="text-xs uppercase tracking-wide text-primary-100">Total</p>
                            <p className="mt-2 text-2xl font-bold">{totalPokemon}</p>
                        </div>
                        <div className="rounded-xl bg-white/15 p-4 backdrop-blur-sm">
                            <p className="text-xs uppercase tracking-wide text-primary-100">Visible</p>
                            <p className="mt-2 text-2xl font-bold">{visiblePokemon}</p>
                        </div>
                        <div className="col-span-2 rounded-xl bg-white/15 p-4 backdrop-blur-sm sm:col-span-1">
                            <p className="text-xs uppercase tracking-wide text-primary-100">Search</p>
                            <p className="mt-2 text-sm font-medium">{hasSearchQuery ? 'Active' : 'Idle'}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
                    <div className="flex-1">
                        <Input
                            id="pokemon-search"
                            label="Search Pokémon"
                            placeholder="Try Bulbasaur, Grass, Seed Pokémon, Overgrow..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            helperText={highlightText}
                            debounceMs={0}
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="ghost"
                            onClick={clearSearch}
                            disabled={!hasSearchQuery}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
            </section>

            {visiblePokemon === 0 ? (
                <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-900/40">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">No Pokémon found</h2>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                        Try a different keyword such as a Pokémon name, type, ability, or species.
                    </p>
                </section>
            ) : (
                <section className={`grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 ${isPending
                    ? 'opacity-50 animate-pulse': 'opacity-100'
                }`}>
                    {filteredPokemon.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </section>
            )}
        </div>
    );
}