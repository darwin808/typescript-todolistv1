import React, { useState } from "react";
import mochData from "./MOCK_DATA (1).json";

function Todo2() {
  const [name2, setname2] = useState<string>("");
  const [collect2, setcollect2] = useState<{ name2: String; id: number }[]>([]);
  const [edit2, setedit2] = useState<string>("");
  const [modal, setmodal] = useState<boolean>(false);
  const [idholder, setidholder] = useState<number | null>(null);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [postPerPage, setpostPerPage] = useState<number>(5);
  const [search, setsearch] = useState<string>("");
  const handlesubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect2([...collect2, { name2, id: Math.random() }]);
  };
  const delete2 = (id: number) => {
    const newarr = collect2.filter((e) => e.id !== id);
    setcollect2(newarr);
  };
  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };
  const handleedit2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect2.map((e) =>
      e.id === idholder ? { ...e, name2: edit2 } : e
    );
    setcollect2(x);
  };
  const indexOfLast = currentPage * postPerPage;
  const indexOfFirst = indexOfLast - postPerPage;
  const posts = collect2.slice(indexOfFirst, indexOfLast);
  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect2.length / postPerPage); i++) {
    pagenum.push(i);
  }

  return (
    <div>
      <h1>TODO2</h1>
      <form action="submit" onSubmit={handlesubmit2}>
        {" "}
        <input
          type="text"
          value={name2}
          onChange={(e) => {
            setname2(e.target.value);
          }}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleedit2}>
          {" "}
          <input
            type="text"
            value={edit2}
            onChange={(e) => {
              setedit2(e.target.value);
            }}
          />
        </form>
      )}
      <input
        type="text"
        value={search}
        placeholder="search"
        onChange={(e) => {
          setsearch(e.target.value);
        }}
      />
      {posts.map((e) => (
        <div key={e.id}>
          {e.name2}{" "}
          <button
            onClick={() => {
              delete2(e.id);
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
      {mochData
        .filter((e) =>
          e.first_name.toLowerCase().includes(search.toLowerCase())
        )
        .map((e) => (
          <div key={e.id}>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo2;
