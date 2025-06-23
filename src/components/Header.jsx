import { useRef, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { HiLogout, HiSearch } from "react-icons/hi";
import { HiPlusSmall } from "react-icons/hi2";
import { HiMinusSmall } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import useAuth from "../Context/useAuth";

function Header() {
  const [serachParams] = useSearchParams();
  const [destination, setDestination] =
    useState(serachParams.get("destination")) || "";
  const [openOption, setOpenOption] = useState(false);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const navigate = useNavigate();

  const handleOptions = (name, operation) => {
    return setOptions({
      ...options,
      [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      options: JSON.stringify(options),
      destination,
    });

    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <div className="header">
      <NavLink to="/bookmarks">Bookmarks</NavLink>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <CiLocationOn className="heaaderIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="where to go ?"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <CiCalendar className="heaaderIcon dateIcon" />
          <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
            {`${format(date[0].startDate, "yyyy-MM-dd")} to ${format(
              date[0].endDate,
              "yyyy-MM-dd"
            )}`}
          </div>
          {openDate && (
            <DateRange
              className="date"
              id="date"
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div
            onClick={() => setOpenOption(!openOption)}
            className="optionDropDown"
            id="optionDropDown"
          >
            &bull; {options.adult} adult &bull; {options.children} children
            &bull; {options.room} room
          </div>
          {openOption && (
            <GuestOptionList
              options={options}
              setOpenOption={setOpenOption}
              onHandleOption={handleOptions}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button onClick={handleSearch} className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
      <User />
    </div>
  );
}

export default Header;

function GuestOptionList({ options, setOpenOption, onHandleOption }) {
  const optionRef = useRef();
  useOutsideClick(optionRef, () => setOpenOption(false), "optionDropDown");
  const optionProps = [
    { type: "adult", minLimit: 1, id: 1 },
    { type: "children", minLimit: 0, id: 2 },
    { type: "room", minLimit: 1, id: 3 },
  ];

  return (
    <div ref={optionRef} className="guestOptions">
      {optionProps?.map((item) => {
        return (
          <GuestOptionItem
            key={item.id}
            options={options}
            type={item.type}
            minLimit={item.minLimit}
            onHandleOption={onHandleOption}
          />
        );
      })}
    </div>
  );
}
function GuestOptionItem({ options, type, minLimit, onHandleOption }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => onHandleOption(type, "dec")}
          disabled={options[type] <= minLimit}
          className="optionCounterBtn"
        >
          <HiMinusSmall className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          onClick={() => onHandleOption(type, "inc")}
          className="optionCounterBtn"
        >
          <HiPlusSmall className="icon" />
        </button>
      </div>
    </div>
  );
}

function User() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    await logout();
    navigate("/");
  };

  return (
    <div>
      {isAuthenticated ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>{user.name}</span>
          <button
            onClick={handleLogout}
            style={{ marginLeft: "0.5rem", marginTop: "0.3rem" }}
          >
            <HiLogout style={{ color: "red" }} className="icon" />
          </button>
        </div>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </div>
  );
}
