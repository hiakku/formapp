import Modal from "../Modal/Modal";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
const Form = () => {
  const [formName, setFormName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [selectText, setSelectText] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [multiChoiceOption, setMultiChoiceOption] = useState([]);
  const [question, setQuestion] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleOpenModal = useCallback(() => {
    if (formName) {
      setError("");
      setIsOpen(true);
    } else {
      setError("Please provide title to form");
    }
  }, [formName]);

  const handleSubmit = useCallback(() => {
    const users = JSON.parse(localStorage.getItem("listData") || "[]");
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    const userData = {
      id: users.length + 1,
      formName: formName,
      formUrl: `${window.location.origin}/${formName.replace(" ", "_")}`,
      createdAt: dd + "/" + mm + "/" + yyyy,
    };
    users.push(userData);
    localStorage.setItem("listData", JSON.stringify(users));
    navigate("/list");
  }, [formName, navigate]);
  return (
    <div className="container">
      <h2>Create Form</h2>
      <input
        type="text"
        value={formName}
        placeholder="Enter form name"
        className="form-control"
        onChange={(e) => setFormName(e.target.value)}
      />
      {error && <div className="errorMsg">{error}</div>}
      {isSubmitted && questionTitle && (
        <h3 className="mt-4">{questionTitle}</h3>
      )}
      {isSubmitted && selectText === "1" && (
        <input
          type="text"
          value={question}
          placeholder="Enter answer"
          className="form-control"
          onChange={(e) => setQuestion(e.target.value)}
        />
      )}
      {isSubmitted && selectText === "3" && (
        <>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="radioItem"
              id="radioItem1"
              value=""
            />
            <label className="form-check-label" htmlFor="radioItem1">
              First
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="radioItem"
              id="radioItem2"
              value=""
            />
            <label className="form-check-label" htmlFor="radioItem2">
              Second
            </label>
          </div>
        </>
      )}
      {isSubmitted &&
        selectText === "2" &&
        multiChoiceOption.map((item, index) => (
          <div className="form-check form-check-inline" key={`check_${index}`}>
            <input
              className="form-check-input"
              type="checkbox"
              value={item}
              id={index}
              name="checkboxes"
            />
            <label className="form-check-label" htmlFor={index}>
              {item}
            </label>
          </div>
        ))}
      {isSubmitted && questionTitle && selectText ? (
        <div className="buttonWrapper">
          <button className="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      ) : (
        <div className="buttonWrapper">
          <button className="button" onClick={handleOpenModal}>
            Add Question
          </button>
        </div>
      )}
      {isOpen && (
        <Modal
          multiChoiceOption={multiChoiceOption}
          setMultiChoiceOption={setMultiChoiceOption}
          close={handleClose}
          setQuestionTitle={setQuestionTitle}
          questionTitle={questionTitle}
          selectText={selectText}
          setSelectText={setSelectText}
          setIsSubmitted={setIsSubmitted}
        />
      )}
    </div>
  );
};

export default Form;
