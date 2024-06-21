import { commonRounded } from "../Todo1";
import CustButton from "./CustButton";

function AddTaskComp({ custButtonProps, inputProps, formOnSubmit }) {
  return (
    <form onSubmit={formOnSubmit} className="inputButtonCont flex gap-2">
      <input
        {...inputProps}
        className={`border ${commonRounded} border-gray-400 px-2 ${inputProps.className ?? ""}`}
        required
      />
      <CustButton {...custButtonProps} type="submit">Add</CustButton>
    </form>
  );
}

export default AddTaskComp;
