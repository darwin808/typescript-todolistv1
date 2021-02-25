import React, { useState } from "react";
import data1 from "./MOCK_DATA (1).json";

function Todo15() {
  const [name15, setname15] = useState<string>("");
  const [edit15, setedit15] = useState<string>("");
  const [modal, setmodal] = useState<boolean>(false);
  const [idholder, setidholder] = useState<number>(0);
  const [collect15, setcollect15] = useState<{ name15: string; id: number }[]>(
    []
  );
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [postperpage, setpostperpage] = useState<number>(5);
  const [search15, setsearch15] = useState<string>("");

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect15([...collect15, { name15, id: Math.random() }]);
  };
  const delete15 = (id: number) => {
    const newarr = collect15.filter((e) => e.id !== id);
    setcollect15(newarr);
  };
  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };
  const handleedit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect15.map((e) =>
      e.id === idholder ? { ...e, name15: edit15 } : e
    );
    setcollect15(x);
  };
  const indexoflast = currentPage * postperpage;
  const indexoffirst = indexoflast - postperpage;
  const posts = collect15.slice(indexoffirst, indexoflast);
  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect15.length / postperpage); i++) {
    pagenum.push(i);
  }
  return (
    <div className="todo15">
      <input
        type="text"
        value={search15}
        onChange={(e) => {
          setsearch15(e.target.value);
        }}
      />
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name15}
          onChange={(e) => {
            setname15(e.target.value);
          }}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit15}
            onChange={(e) => {
              setedit15(e.target.value);
            }}
          />
        </form>
      )}
      {posts.map((e) => (
        <div key={e.id}>
          {e.name15}{" "}
          <button
            onClick={() => {
              delete15(e.id);
            }}
          >
            delte
          </button>
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
        <div onClick={() => setcurrentPage(e)} key={e}>
          {e}
        </div>
      ))}
      {data1
        .filter((e) =>
          e.first_name.toLowerCase().includes(search15.toLowerCase())
        )
        .map((e) => (
          <div key={e.id}>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo15;
