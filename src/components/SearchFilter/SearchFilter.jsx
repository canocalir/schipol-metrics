import styled from "styled-components";
import {ImSearch} from "react-icons/im";
import {useState} from "react";
import {toast} from "react-toastify";

const buttonStyle = {
  position: "absolute",
  right: "1rem",
  top: "37%",
  cursor: "pointer",
  backgroundColor: "#141251",
  borderRadius: "50%",
  padding: "0.5rem",
  color: "#fff",
  width: "20px",
  height: "20px",
};

const Search = ({
  dataArrival,
  dataDeparture,
  setFilteredData,
  arrival,
}) => {
  const [inputValue, setInputValue] = useState("");
  
  const searchFilterHandler = (event) => {
    event.preventDefault()
    
    setInputValue('')
    setFilteredData('')
    
    if (!inputValue.length) {
      toast.warn("Enter a Flight Name", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    }
    
    setFilteredData((!arrival ? dataDeparture : dataArrival).filter((departure) => {
      return (
        departure?.flightName.toLowerCase() === inputValue.toLowerCase()
      );
    }))
  };
  
  return (
    <SearchContainer>
      <form onSubmit={searchFilterHandler}>
        <SearchFilter
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Enter Flight Name"
        />
        <ImSearch
          size="1.2rem"
          style={buttonStyle}
          type="submit"
          onClick={searchFilterHandler}
        />
      </form>
    </SearchContainer>
  );
};

const SearchFilter = styled.input`
  padding-left: 1rem;
  width: 22rem;
  margin-left: 0.5rem;
  height: 3.3rem;
  border-radius: 1rem;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  font-size: 1rem;
  font-weight: 600;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default Search;
