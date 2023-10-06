import { useState } from "react";
import "./App.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  function addItem() {
    if (!newItem) {
      alert("Please enter a new item");
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };
    setItems((oldList) => [...oldList, item]);
    setNewItem("");

    if (editId) {
      const editItem = items.find((item) => item.id === editId);
      const updatedItems = items.map((item) =>
        item.id !== editItem.id
          ? item = { id: item.id, value: newItem }
          : { id: item.id, value: newItem }
      );
      setItems(updatedItems);
      setEditId(0);
      return;
    }
  }

  function handleDeleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  function handleEditItem(id) {
    const editItem = items.find((item) => item.id === id);
    setNewItem(editItem.value);
    alert("Please edit your item");
    setEditId(id);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>TODO LIST</h1>
        <hr />
        <input
          type="text"
          placeholder="add item ..."
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
        />
        <br />
        <button onClick={() => addItem()}>ADD</button>
        <ul>
          {items.map((item) => {
            return (
              <li key={item.id}>
                <p>{item.value}</p>
                <div>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn-edit"
                    onClick={() => handleEditItem(item.id)}
                  >
                    Edit
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </form>
    </>
  );
}

export default App;

