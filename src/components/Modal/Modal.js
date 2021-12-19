import { useCallback, useState } from "react";
import "./modal.css";

const Modal = (props) => {
  const {
    close,
    setSelectText,
    questionTitle,
    setQuestionTitle,
    selectText,
    setMultiChoiceOption,
    multiChoiceOption,
    setIsSubmitted,
  } = props;
  const [error, setError] = useState("");
  const handleAdd = useCallback(() => {
    if (selectText !== "0" && selectText !== "2" && questionTitle) {
      setError("");
      close(false);
      setIsSubmitted(true);
    } else if (selectText === "2" && multiChoiceOption.length > 0) {
      setError("");
      close(false);
      setIsSubmitted(true);
    } else {
      setError("Please fill all details");
    }
  }, [
    close,
    multiChoiceOption.length,
    questionTitle,
    selectText,
    setIsSubmitted,
  ]);

  return (
    <div className="commonModal">
      <div className="modalBg"></div>
      <div className="modalInner">
        <input
          type="text"
          placeholder="Enter question title"
          value={questionTitle}
          className="form-control mb-3"
          onChange={(e) => setQuestionTitle(e.target.value)}
        />
        <select
          className="form-control form-select mb-3"
          onChange={(e) => setSelectText(e.target.value)}
        >
          <option value="0">Select answer type</option>
          <option value="1">Text</option>
          <option value="2">Multichoice</option>
          <option value="3">Single select</option>
        </select>
        {selectText === "2" && (
          <textarea
            className="form-control"
            onChange={(e) => setMultiChoiceOption(e.target.value.split("\n"))}
            rows="3"
          ></textarea>
        )}
        {error && <div className="errorMsg">{error}</div>}
        <div className="buttonContainer">
          <div className="buttonsModal cancel" onClick={close}>
            Cancel
          </div>
          <div className="buttonsModal" onClick={handleAdd}>
            Add
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
