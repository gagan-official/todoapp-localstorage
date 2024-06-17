import { useEffect, useState } from "react";
import "./App.css";
import CustButton from "./components/CustButton";
import AddTaskComp from "./components/AddTaskComp";

const localData = localStorage.length !==0 ? JSON.parse(localStorage.getItem("todoData")) : [];
console.log(localStorage.getItem("todoData"))
// const initialData = localData ? localData : [];
localStorage.setItem("todoData", JSON.stringify(localData)); // initialize local storage

function App() {
  const [todoData, setTodoData] = useState(JSON.parse(localStorage.getItem("todoData")));
  const [inputVal, setInputVal] = useState("");
  const [editVal, setEditVal] = useState("");
  const [isEdit, setIsEdit] = useState(null);

  // ----- Task adding function -----
  const handleAdd = (e) => {
    e?.preventDefault();
    if (inputVal) {
      setTodoData([
        ...todoData,
        {
          task: inputVal,
        },
      ]);
      setInputVal("");
    }
  };

  useEffect(()=>{
    // const localData = JSON.parse(localStorage.getItem("todoData"));
    console.log(localData)
    if(localData){
      setTodoData(localData);
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todoData",JSON.stringify(todoData));
  },[todoData])

  // ----- Task deleting function -----
  const handleDelete = (id) => {
    let newData = todoData.filter((item, index) => index !== id);
    setTodoData(newData);
  };

  // ----- Task editing function -----
  const handleEdit = (id) => {
    let newData = todoData.map((item, index) => {
      if (index === id) {
        item.task = editVal;
      }
      return item;
    });
    setTodoData(newData);
    setIsEdit(null);
    setEditVal("");
  };

  return (
    <section className="flex flex-col gap-2 items-center">
      <h1 className="text-xl font-semibold mb-4">Todo App</h1>
      <AddTaskComp
        inputProps={{
          onFocus: () => setIsEdit(null),
          onChange: (e) => setInputVal(e.target.value),
          onKeyDown: (e) => (e.key === "Enter" ? handleAdd() : null),
          value: inputVal,
          placeholder: "Write your task",
        }}
        formOnSubmit={(e) => handleAdd(e)}
      />
      <ul className="todoListCont flex flex-col gap-2 w-full max-w-screen-md mt-8">
        {todoData.length !== 0 ? (
          todoData.map((items, index) => (
            <li
              key={index}
              className={`border rounded-xl border-gray-400 p-2 pl-4 text-left flex items-center justify-between gap-2 hover:bg-slate-50`}
            >
              {isEdit !== null && isEdit === index ? ( // if isEdit contains 0, it will be considered as false, that's why I've put isEdit !== null instead of only isEdit checking.
                <AddTaskComp
                  inputProps={{
                    className: "w-full",
                    onChange: (e) => setEditVal(e.target.value),
                    onKeyDown: (e) =>
                      e.key === "Enter" ? handleEdit(index) : null,
                    value: editVal,
                    autoFocus: true
                  }}
                  custButtonProps={{ onClick: () => handleEdit(index) }}
                />
              ) : (
                items.task
              )}
              <div className="listBtnCont flex gap-2">
                <CustButton
                  className="!bg-green-600"
                  onClick={() => (setIsEdit(index), setEditVal(items.task))}
                >
                  Edit
                </CustButton>
                <CustButton
                  className="!bg-red-600"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </CustButton>
              </div>
            </li>
          ))
        ) : (
          <span className="text-slate-400 italic">No task added yet</span>
        )}
      </ul>
    </section>
  );
}

export const btnHover = "hover:opacity-90";
export const commonRounded = "rounded-md";

export default App;
