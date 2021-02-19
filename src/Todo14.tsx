import React, { useState } from "react";
import jsondata from "./MOCK_DATA (1).json";

function Todo14() {
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [postPerPage, setpostPerPage] = useState<number>(5);
  const [search14, setsearch14] = useState<string>("");
  const [name14, setname14] = useState<string>("");
  const [collect14, setcollect14] = useState<{ name14: string; id: number }[]>(
    []
  );
  const [edit14, setedit14] = useState<string>("");
  const [modal, setmodal] = useState<boolean>(false);
  const [idholder, setidholder] = useState<number | null>(null);
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect14([...collect14, { name14, id: Math.random() }]);
  };
  const delete14 = (id: number) => {
    const newarr = collect14.filter((e) => e.id !== id);
    setcollect14(newarr);
  };
  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };
  const handleedit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect14.map((e) =>
      e.id === idholder ? { ...e, name14: edit14 } : e
    );
    setcollect14(x);
  };
  const indexOfLast = currentPage * postPerPage;
  const indexOfFirst = indexOfLast - postPerPage;
  const posts = collect14.slice(indexOfFirst, indexOfLast);

  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect14.length / postPerPage); i++) {
    pagenum.push(i);
  }

  return (
    <div>
      <input
        type="text"
        value={search14}
        onChange={(e) => {
          setsearch14(e.target.value);
        }}
      />
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name14}
          onChange={(e) => {
            setname14(e.target.value);
          }}
        />
      </form>

      {modal && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit14}
            onChange={(e) => {
              setedit14(e.target.value);
            }}
          />
        </form>
      )}
      {collect14.map((e) => (
        <div key={e.id}>
          {e.name14}{" "}
          <button
            onClick={() => {
              delete14(e.id);
            }}
          >
            delete
          </button>{" "}
          <button
            onClick={() => {
              openmodal(e.id);
            }}
          >
            edit
          </button>
        </div>
      ))}
      {pagenum.map((e) => (
        <div
          onClick={() => {
            setcurrentPage(e);
          }}
          key={e}
        >
          {e}
        </div>
      ))}
      {jsondata
        .filter((e) =>
          e.first_name.toLowerCase().includes(search14.toLowerCase())
        )
        .map((e) => (
          <div key={e.id}>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo14;
