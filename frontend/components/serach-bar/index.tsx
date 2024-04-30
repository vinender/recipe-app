// components/SearchBar.js
const SearchBar = ({ onSubmit }) => {
    return (
      <form onSubmit={onSubmit} className="w-full max-w-sm mx-auto">
        <div className="flex items-center border border-b-2 border-gray-500 py-2">
          <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search recipes..." />
          <button className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">Search</button>
        </div>
      </form>
    );
  };
  
  export default SearchBar;
  