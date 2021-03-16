import React from "react";
import { getItems } from "../service/SearchService";

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
  }, [searchValue]);
  return (
    <div>
      <label htmlFor='search'>Search Music</label>
      <input
        type='text'
        name='search'
        id='search'
        onChange={(event) => {
          handleChange(event);
        }}
      />
    </div>
  );
};

export default Search;
