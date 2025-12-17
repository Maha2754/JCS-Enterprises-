import React, { useState } from "react";
import "../style/filterbar.css";

const FilterBar = ({ onFilterChange, onSortChange }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // size | litre
  const [showSort, setShowSort] = useState(false);

  return (
    <>
      <section className="filter-bar">
        {/* LEFT */}
        <div
          className="filter-left"
          onClick={() => setShowFilter(!showFilter)}
        >
          <i className="fa-solid fa-sliders"></i>
          <span>Filter</span>
        </div>

        {/* RIGHT */}
        <div className="filter-right">
          <span>Sort by</span>
          <div className="sort-box">
            <input
              type="text"
              placeholder="Default"
              readOnly
              onClick={() => setShowSort(!showSort)}
            />
            <span className="plus" onClick={() => setShowSort(!showSort)}>
              +
            </span>
          </div>
        </div>
      </section>

      {/* 🔽 FILTER TOGGLE MENU */}
      {showFilter && (
        <div className="filter-toggle">
          {!activeMenu && (
            <>
              <div onClick={() => setActiveMenu("size")}>Size</div>
              <div onClick={() => setActiveMenu("litre")}>Litre</div>
            </>
          )}

          {activeMenu === "size" && (
            <>
              <input
                type="text"
                placeholder="Enter size (ex: 500ml)"
                onChange={(e) =>
                  onFilterChange({ type: "size", value: e.target.value })
                }
              />
              <span onClick={() => setActiveMenu(null)}>← Back</span>
            </>
          )}

          {activeMenu === "litre" && (
            <>
              <input
                type="text"
                placeholder="Enter litre (ex: 1)"
                onChange={(e) =>
                  onFilterChange({ type: "litre", value: e.target.value })
                }
              />
              <span onClick={() => setActiveMenu(null)}>← Back</span>
            </>
          )}
        </div>
      )}

      {/* 🔽 SORT MENU */}
      {showSort && (
        <div className="sort-toggle">
          <div onClick={() => onSortChange("low-high")}>Price: Low → High</div>
          <div onClick={() => onSortChange("high-low")}>Price: High → Low</div>
        </div>
      )}
    </>
  );
};

export default FilterBar;
