import React, { useState } from "react";
import jsonData from "./MOCK_DATA (1).json";
function Todo3() {
  const [name3, setname3] = useState<string>("");
  const [collect, setcollect] = useState<{ name3: string; id: number }[]>([]);
  const [edit, setedit] = useState<string>("");
  const [modal, setmodal] = useState<boolean>(false);
  const [idholder, setidholder] = useState<number | null>(null);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [postPerPage, setpostPerPage] = useState<number>(5);
  const [sirch, setsirch] = useState<string>("");
  const handlesubmit3 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect([...collect, { name3, id: Math.random() }]);
  };
  const del3 = (id: number) => {
    const newarr = collect.filter((e) => e.id !== id);
    setcollect(newarr);
  };
  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };
  const handleedit3 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect.map((e) =>
      e.id === idholder ? { ...e, name3: edit } : e
    );
    setcollect(x);
  };
  const indexOfLast = currentPage * postPerPage;
  const indexOfFirst = indexOfLast - postPerPage;
  const posts = collect.slice(indexOfFirst, indexOfLast);

  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect.length / postPerPage); i++) {
    pagenum.push(i);
  }
  return (
    <div>
      <h1>todo3</h1>
      <form action="submit" onSubmit={handlesubmit3}>
        <input
          type="text"
          value={name3}
          onChange={(e) => {
            setname3(e.target.value);
          }}
        />
      </form>
      <input
        type="text"
        value={sirch}
        placeholder="search................."
        onChange={(e) => {
          setsirch(e.target.value);
        }}
      />
      {modal && (
        <form action="submit" onSubmit={handleedit3}>
          <input
            type="text"
            value={edit}
            onChange={(e) => {
              setedit(e.target.value);
            }}
          />
        </form>
      )}
      {posts.map((e) => (
        <div key={e.id}>
          {e.name3}{" "}
          <button
            onClick={() => {
              del3(e.id);
            }}>
            delete
          </button>
          <button
            onClick={() => {
              openmodal(e.id);
            }}>
            edit
          </button>
        </div>
      ))}
      {pagenum.map((e) => (
        <div
          onClick={() => {
            setcurrentPage(e);
          }}
          key={e}>
          {e}
        </div>
      ))}
      {jsonData
        .filter((e) => e.first_name.toLowerCase().includes(sirch.toLowerCase()))
        .map((e) => (
          <div key={e.id}>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo3;
