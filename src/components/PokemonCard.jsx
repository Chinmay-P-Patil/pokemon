export default function PokemonCard({ pokemon }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-105">
        <img 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name} 
          className="mx-auto w-24 h-24"
        />
        <div className="text-center mt-2">
          <h3 className="text-lg font-semibold capitalize">{pokemon.name}</h3>
          <p className="text-gray-600">id:{pokemon.id.toString().padStart(3, '0')}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {pokemon.types.map((type, index) => (
              <span 
                key={index}
                className={`px-2 py-1 rounded-full text-sm 
                  ${getTypeColor(type.type.name)} text-white`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  function getTypeColor(type) {
    const colors = {
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      grass: 'bg-green-500',
      electric: 'bg-yellow-500',
      psychic: 'bg-purple-500',
      ice: 'bg-blue-200',
      dragon: 'bg-indigo-600',
      dark: 'bg-gray-800',
      fairy: 'bg-pink-300',
      normal: 'bg-gray-400',
      fighting: 'bg-orange-700',
      flying: 'bg-blue-300',
      poison: 'bg-purple-700',
      ground: 'bg-yellow-700',
      rock: 'bg-yellow-800',
      bug: 'bg-lime-600',
      ghost: 'bg-purple-800',
      steel: 'bg-gray-500',
    };
    return colors[type] || 'bg-gray-500';
  }