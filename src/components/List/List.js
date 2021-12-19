import { useEffect, useState } from "react";

const List = () => {
  const [listData, setListData] = useState([]);
  useEffect(() => {
    const formList = JSON.parse(localStorage.getItem("listData") || "[]");
    setListData(formList);
  }, []);

  return (
    <div>
      <h2 className="mb-3">Form Listing</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Form name</th>
            <th>Form url</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.formName}</td>
              <td>{row.formUrl}</td>
              <td>{row.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
