import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [itemList, setItemList] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    return localValue == null ? [] : JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(itemList));
  }, [itemList]);

  const handleSubmit = (e) => {
    e.preventDefault(); // stop page reload
    if (newItem.trim() === "") return;

    setItemList((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: newItem,
        completed: false,
      },
    ]);

    setNewItem("");
  };

  const updateItem = (id) => {
    setItemList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItemList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item"> New Item </label>
          <input
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          {" "}
          Add{" "}
        </button>
      </form>
      <h1 className="header">To Do List</h1>
      <ul className="list">
        {itemList.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => updateItem(item.id)}
              />
              {item.name}
            </label>
            <button
              className="btn btn-danger"
              onClick={() => deleteItem(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
        {/* <li>
          <label>
            <input type="checkbox" />
            Item 1
          </label>
          <button className="btn btn-danger">Delete</button>
        </li>
        <li>
          <label>
            <input type="checkbox" />
            Item 2
          </label>
          <button className="btn btn-danger">Delete</button>
        </li> */}
      </ul>
    </>
  );
}
