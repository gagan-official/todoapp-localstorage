import { useEffect, useRef, useState } from "react";
// import { v4 as uuid } from "uuid";
import { MdCheck } from "react-icons/md";
const commonBtnClass = "text-white px-3 py-1 rounded-lg hover:opacity-85";

const localData = localStorage.getItem("data") ?? "[]";

export default function Todo2() {
  const [val, setVal] = useState("");
  const [editVal, setEditVal] = useState("");
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState({ toast: false, msg: "", id: null });
  //   const [toastMsg, setToastMsg] = useState("");
  const [data, setData] = useState(JSON.parse(localData));
  const timer = useRef(null);
//   let uid;
  
  const handleToast = (msg, id) => {
    // uid = uuid();
    if (timer.current) clearTimeout(timer.current);
    setToast({ toast: true, msg: msg, id: id ?? null });
    timer.current = setTimeout(() => {
      setToast({ toast: false, msg: "", id: null });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, { task: val }]);
    setVal("");
    handleToast("add");
  };

  const handleDelete = (index) => {
    setData(data.filter((t, i) => index !== i));
    handleToast("delete", index + 1);
  };

  const handleEdit = (e, index) => {
    e.preventDefault();
    if (editVal !== data[index].task) {
      handleToast("edit", index + 1);
    }
    setData(
      data.map((t, i) => {
        if (index === i) t.task = editVal;
        return t;
      })
    );
    setEditVal("");
    setEditId(null);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <>
      {toast.toast && <Toast toastMsg={toast.msg} id={toast.id} />}
      <div className="max-w-lg relative left-[50%] translate-x-[-50%]">
        {/* {<Toast/>} */}
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <CustInput
          value={val}
          onChange={(e) => setVal(e.target.value)}
          handleSubmit={handleSubmit}
          inputProps={{ placeholder: "Enter your task" }}
        />
        <div className="mt-4 flex flex-col gap-3">
          {data.length ? (
            data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border rounded-xl p-2 pl-4 flex justify-between items-center gap-2"
                >
                  {editId === index ? (
                    <CustInput
                      value={editVal}
                      onChange={(e) => setEditVal(e.target.value)}
                      handleSubmit={(e) => handleEdit(e, index)}
                      inputProps={{
                        placeholder: "Edit your task",
                        autoFocus: true,
                      }}
                    />
                  ) : (
                    `${index + 1}. ${item.task}`
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditId(index);
                        setEditVal(item.task);
                      }}
                      className={`${commonBtnClass} bg-green-600`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className={`${commonBtnClass} bg-red-600`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <span className="text-gray-400 italic">No tasks yet.</span>
          )}
        </div>
      </div>
    </>
  );
}

function CustInput(props) {
  const { handleSubmit, value, onChange, inputProps } = props;
  return (
    <form className="flex" onSubmit={(e) => handleSubmit(e)}>
      <input
        required
        className="border rounded-lg py-1 px-3 mr-2 w-full"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && value) handleSubmit(e);
        }}
        {...inputProps}
      />
      <button className={`${commonBtnClass} bg-green-600`} type="submit">
        Add
      </button>
    </form>
  );
}

function Toast({ toastMsg, id, uid }) {
  if (toastMsg === "edit") {
    return <CommonToast uid={uid} color="green" id={id} />;
  } else if (toastMsg === "delete") {
    return <CommonToast uid={uid} color="red" id={id} />;
  } else {
    return <CommonToast uid={uid} color="blue" />;
  }
}

function CommonToast(props) {
//   const { uid } = props;
//   console.log(uid)
  let color = props.color ?? "blue";
  let colorClass =
    color === "green"
      ? `bg-green-200 text-green-800`
      : color === "red"
      ? `bg-red-200 text-red-800`
      : `bg-blue-200 text-blue-800`;
  return (
    <div
      key={props.id}
      className={`animatedCont top-0 left-0 p-3 w-full flex items-center justify-center gap-2 absolute z-10 ${colorClass}`}
    >
      {color === "green"
        ? `Task ${props.id} modified`
        : color === "red"
        ? `Task ${props.id} deleted`
        : "New task added"}{" "}
      <MdCheck />
    </div>
  );
}
