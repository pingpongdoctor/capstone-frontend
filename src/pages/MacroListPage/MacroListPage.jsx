import "./MacroListPage.scss";
import MacroItemComponent from "../../components/MacroItemComponent/MacroItemComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { API_URL } from "../../Utils/utils";
import ModalBox from "../../components/ModalBox/ModalBox";
import InputBox from "../../components/InputBox/InputBox";
import NotificationComponent from "../../components/NotificationComponent/NotificationComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

export default function MacroLisPage({ loginState, closeMenu }) {
  //APPLY THE USE NAVIGATE
  const navigate = useNavigate();
  //FUNCTION TO NAVIGATE TO THE ADD MACRO PAGE
  const handleNavigateAddMacroPage = function () {
    navigate("/add-macro");
  };
  //GET JWT TOKEN FROM LOCAL STORAGE
  const jwtToken = localStorage.getItem("jwt_token");
  //DEFINE HEADERS
  const headers = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  //STATE TO MAKE THE DELETE BOX APPEAR
  const [boxAppear, setBoxAppear] = useState(false);
  //STATE TO STORE THE DELETE MACRO ID
  const [deleteMacroId, setDeleteMacroId] = useState("");
  //STATE FOR THE INPUT DATA OF THE SEARCH BOX
  const [searchData, setSearchData] = useState("");
  //STATE TO MANIPULATE THE LOADING PAGE
  const [displayNoneClass, setDisplayNoneClass] = useState("");
  //FUNCTION TO HANDLE THE SEARCH DATA
  const handleSearchData = function (event) {
    setSearchData(event.target.value);
  };
  //STATE FOR THE MACROS ARRAY
  const [macroArr, setMacroArr] = useState([]);
  //FUNCTION TO GET ALL MACROS
  const handleGetAllMacros = function () {
    if (loginState) {
      axios
        .get(`${API_URL}/macros-list`, headers)
        .then((response) => {
          setMacroArr(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  //USE EFFECT TO GET ALL MACROS
  useEffect(() => {
    handleGetAllMacros();
    // eslint-disable-next-line
  }, [loginState, jwtToken]);

  //FUNCTION TO UPDATE THE DELETE MACRO ID STATE
  const handleDeleteMacroId = function (macroId) {
    setDeleteMacroId(macroId);
    setBoxAppear(true);
  };

  //FUNCTION TO DISAPPEAR THE MODAL BOX
  const handleDisappearBox = function () {
    setBoxAppear(false);
    setDeleteMacroId("");
  };

  //FUNCTION TO DELETE A MACRO
  const handleDeleteMacro = function () {
    if (deleteMacroId) {
      axios
        .delete(`${API_URL}/macros-list/${deleteMacroId}`, headers)
        .then((response) => {
          console.log(response.data);
          setDeleteMacroId("");
          setBoxAppear(false);
          handleGetAllMacros();
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

  //USEEFFECT TO SET DISPLAYNONECLASS FOR THE LOADING PAGE
  useEffect(() => {
    if (loginState && macroArr.length > 0) {
      setTimeout(() => {
        setDisplayNoneClass("loading-component__display-none");
      }, 1200);
    }
  }, [loginState, macroArr.length]);

  if (loginState) {
    return (
      <div onMouseEnter={closeMenu} className="macro-list">
        <LoadingComponent displayNoneClass={displayNoneClass} />
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
          <InputBox
            inputOnChange={handleSearchData}
            inputValue={searchData}
            inputType="text"
            inputPlaceholder="Search for macro name, goal and energy intake"
            inputClassName="input-box input-box--macro-list-search"
          />
          <div className="macro-list__texts">
            <div className="macro-list__text-wrapper">
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
            </div>
            <p className="macro-list__text-action">Actions</p>
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
                    handleDeleteMacroId={handleDeleteMacroId}
                  />
                ))}
            </ul>
          )}
        </div>
        {boxAppear && (
          <ModalBox
            modalOnClickHandler={handleDeleteMacro}
            modalCloseOnClickHandler={handleDisappearBox}
            modalBtnContent="Delete now"
            modalBoxContent="Do you want to delete this macro?"
          />
        )}
      </div>
    );
  } else {
    return <NotificationComponent />;
  }
}
