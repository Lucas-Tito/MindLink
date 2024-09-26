import React, { useState } from 'react';
import "./week_day_picker.css";

const WeekDayPicker = () => {
  const [isOpen, setIsOpen] = useState(false); // Controla se o dropdown está aberto ou fechado
  const [selectedItems, setSelectedItems] = useState([]); // Itens selecionados

  const items = ['Apple', 'Blackberry', 'HTC', 'Sony Ericson', 'Motorola', 'Nokia'];

  // Alterna a visibilidade do dropdown ao clicar
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Lida com a seleção de itens
  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        // Se o item já estiver selecionado, remove-o
        return prevSelectedItems.filter((selectedItem) => selectedItem !== item);
      } else {
        // Caso contrário, adiciona o item
        return [...prevSelectedItems, item];
      }
    });
  };

  return (
    <div className="dropdown">
      <dt onClick={toggleDropdown}> {/* Alterna o dropdown ao clicar */}
        <a href="#">
          <span className="hida">Select</span>
          <p className="multiSel">
            {selectedItems.map((item) => (
              <span key={item} className="selected-item">{item}, </span>
            ))}
          </p>
        </a>
      </dt>

      {isOpen && ( // Mostra o dropdown se estiver aberto
        <dd>
          <div className="mutliSelect">
            <ul>
              {items.map((item) => (
                <li key={item}>
                  <input
                    type="checkbox"
                    value={item}
                    onChange={() => handleCheckboxChange(item)}
                    checked={selectedItems.includes(item)}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </dd>
      )}
      <button>Filter</button>
    </div>
  );
};

export default WeekDayPicker;
