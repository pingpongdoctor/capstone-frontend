import "./MacroListPage.scss";
import MacroItemComponent from "../../components/MacroItemComponent/MacroItemComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
const URL = process.env.REACT_APP_API_URL || "";

export default function MacroLisPage({ userProfile, loginState }) {
  //APPLY THE USE NAVIGATE
  const navigate = useNavigate();
  //FUNCTION TO NAVIGATE TO THE ADD MACRO PAGE
  const handleNavigateAddMacroPage = function () {
    navigate("/add-macro");
  };
  //STATE FOR THE INPUT DATA OF THE SEARCH BOX
  const [searchData, setSearchData] = useState("");
  //FUNCTION TO HANDLE THE SEARCH DATA
  const handleSearchData = function (event) {
    setSearchData(event.target.value);
  };
  //STATE FOR THE MACROS ARRAY
  const [macroArr, setMacroArr] = useState([]);
  //GET JWT TOKEN
  const jwtToken = localStorage.getItem("jwt_token");
  //DECLARE HEADERS
  const headers = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  //FUNCTION TO GET ALL MACROS
  const handleGetAllMacros = function () {
    if (loginState) {
      axios
        .get(`${URL}/macros-list`, headers)
        .then((response) => {
          setMacroArr(response.data);
        })
        .catch((error) => console.log(error));
    }
  };
  //USE EFFECT TO GET ALL MACROS
  useEffect(() => {
    handleGetAllMacros();
  }, [loginState]);

  //FUNCTION TO DELETE A MACRO
  const handleDeleteMacro = function (macroId) {
    if (loginState) {
      axios
        .delete(`${URL}/macros-list/${macroId}`, headers)
        .then((response) => {
          handleGetAllMacros();
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  //FUNCTION TO SHORT MACROS BASED ON MACRO NAME
  const handleShortMacroName = function () {
    if (loginState && macroArr.length > 0) {
      const newMacroArr = [...macroArr].sort((a, b) =>
        a.macro_name.toLowerCase().localeCompare(b.macro_name.toLowerCase())
      );
      setMacroArr(newMacroArr);
    }
  };

  //FUNCTION TO SHORT MACROS BASED ON GOAL
  const handleShortMacroGoal = function () {
    if (loginState && macroArr.length > 0) {
      const newMacroArr = [...macroArr].sort((a, b) =>
        a.goal.toLowerCase().localeCompare(b.goal.toLowerCase())
      );
      setMacroArr(newMacroArr);
    }
  };

  //FUNCTION TO SHORT MACROS BASED ON TIME
  const handleShortMacroTime = function () {
    if (loginState && macroArr.length > 0) {
      const newMacroArr = [...macroArr].sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      setMacroArr(newMacroArr);
    }
  };

  //FUNCTION TO SHORT MACROS BASED ON ENERGY
  const handleShortMacroEnergy = function () {
    if (loginState && macroArr.length > 0) {
      const newMacroArr = [...macroArr].sort(
        (a, b) => a.tdee_need - b.tdee_need
      );
      setMacroArr(newMacroArr);
    }
  };

  if (loginState) {
    return (
      <div className="macro-list">
        <div className="macro-list__container">
          <div className="macro-list__wrapper">
            <h1 className="macro-list__heading">Macro List</h1>
            <ButtonComponent
              onClickHandler={handleNavigateAddMacroPage}
              btnClassName="btn btn--macro-list"
              btnContent="Add New Macro"
            />
          </div>
          {macroArr.length > 0 && (
            <p className="macro-list__main-text">{macroArr.length} Macros</p>
          )}
          <input
            placeholder="Search for macro name, goal, energy intake and created time"
            className="macro-list__search-box"
            type="text"
            value={searchData}
            onChange={handleSearchData}
          />
          <div className="macro-list__texts">
            <p onClick={handleShortMacroName} className="macro-list__text">
              Macro Name
            </p>
            <p
              onClick={handleShortMacroGoal}
              className="macro-list__text  macro-list__text--hidden"
            >
              Goal
            </p>

            <p
              onClick={handleShortMacroEnergy}
              className="macro-list__text macro-list__text--energy-hidden"
            >
              Energy Intake
            </p>

            <p
              onClick={handleShortMacroTime}
              className="macro-list__text macro-list__text--hidden"
            >
              Created Time
            </p>
            <p className="macro-list__text">Actions</p>
          </div>
          {macroArr.length > 0 && (
            <ul className="macro-list__list">
              {macroArr
                .filter((macroItem) => {
                  return (
                    macroItem.macro_name
                      .toLowerCase()
                      .includes(searchData.toLowerCase()) ||
                    macroItem.goal
                      .toLowerCase()
                      .includes(searchData.toLowerCase()) ||
                    macroItem.tdee_need
                      .toString()
                      .includes(searchData.toLowerCase())
                  );
                })
                .map((macroItem) => (
                  <MacroItemComponent
                    key={macroItem.id}
                    macroId={macroItem.id}
                    macroName={macroItem.macro_name}
                    macroGoal={macroItem.goal}
                    macroEnergy={macroItem.tdee_need}
                    macroTime={macroItem.updated_at}
                    handleDeleteMacro={handleDeleteMacro}
                  />
                ))}
            </ul>
          )}
        </div>
      </div>
    );
  } else {
    return <h1>Please log in to use this function</h1>;
  }
}
