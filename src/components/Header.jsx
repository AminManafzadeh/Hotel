import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { HiSearch } from "react-icons/hi";
import { HiPlusSmall } from "react-icons/hi2";
import { HiMinusSmall } from "react-icons/hi2";

function Header() {
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });

  const handleOptions = (name, operation) => {
    return setOptions({
      ...options,
      [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
    });
  };

  return (
    <div className="header">
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
          <div className="dateDropDown">2025/06/15</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div
            onClick={() => setOpenOption(!openOption)}
            className="optionDropDown"
          >
            &bull; {options.adult} adult &bull; {options.children} children
            &bull; {options.room} room
          </div>
          {openOption && (
            <GuestOptionList options={options} onHandleOption={handleOptions} />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({ options, onHandleOption }) {
  const optionProps = [
    { type: "adult", minLimit: 1, id: 1 },
    { type: "children", minLimit: 0, id: 2 },
    { type: "room", minLimit: 1, id: 3 },
  ];

  return (
    <div className="guestOptions">
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
