import { useState, useEffect } from 'react';
import PokemonCard from './components/PokemonCard';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [types, setTypes] = useState([]);


  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');


  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    //fetching 150 pokemon
    const fetchAllPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        if (!response.ok) throw new Error('Failed to fetch Pokémon list');
        const data = await response.json();
        console.log(data);
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            if (!res.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
            return res.json();
          })
        );
        
        const allTypes = pokemonDetails.flatMap(p => 
          p.types.map(t => t.type.name)
        );
        setTypes([...new Set(allTypes)].sort());
        setPokemonList(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);






  useEffect(() => {
    let filtered = pokemonList.filter(pokemon => 
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedType) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(t => t.type.name === selectedType)
      );
    }

    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemonList]);



  //handeling errors and loading states
  if (error) return (
    <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center">
      Error: {error}
    </div>
  );

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>
  );


  // main app component
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 mb-8">
        <h1 className="text-3xl font-bold text-center">Pokemon List</h1>
      </header>


      {/* search and type filter */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>


        {/* pokemon list */}
        {filteredPokemon.length === 0 ? (
          <div className="text-center text-gray-600 text-xl">
            No Pokémon found matching your criteria
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPokemon.map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;