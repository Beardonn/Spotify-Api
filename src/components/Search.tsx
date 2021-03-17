import React from "react";
import { getItems } from "../service/SearchService";
import "../styles/search.scss";

interface IProps {
  setAlbums: React.Dispatch<React.SetStateAction<any[]>>;
}

const Search = ({ setAlbums }: IProps) => {
  const [searchValue, setSearchValue] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };
  React.useEffect(() => {
    console.log(searchValue);
    const search = async () => {
      const albums = await getItems(searchValue);
      setAlbums(albums);
    };
    search();
  }, [searchValue, setAlbums]);
  return (
    <div className='search-container'>
      <label htmlFor='search' className='search-container__label'>
        Search Music
      </label>
      <input
        type='text'
        name='search'
        id='search'
        className='search-container__input'
        onChange={(event) => {
          handleChange(event);
        }}
      />
    </div>
  );
};

export default Search;
