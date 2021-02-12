import React, { useState } from "react";
import jsondata from "./MOCK_DATA (1).json";

function Todo7() {
  const [name7, setname7] = useState<string>("");
  const [collect7, setcollect7] = useState<{ name7: string; id: number }[]>([]);
  const [edit7, setedit7] = useState<string>("");
  const [modal, setmodal] = useState<boolean>(false);
  const [idholder, setidholder] = useState<number | null>(null);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [postPerPage, setpostPerPage] = useState<number>(5);
  const [search7, setsearch7] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect7([...collect7, { name7, id: Math.random() }]);
  };

  const delete7 = (id: number) => {
    const newarr = collect7.filter((e) => e.id !== id);
    setcollect7(newarr);
  };
  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };
  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect7.map((e) =>
      e.id === idholder ? { ...e, name7: edit7 } : e
    );
    setcollect7(x);
  };
  const indexOfLast7 = currentPage * postPerPage;
  const indexOfFirst7 = indexOfLast7 - postPerPage;
  const posts = collect7.slice(indexOfFirst7, indexOfLast7);
  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect7.length / postPerPage); i++) {
    pagenum.push(i);
  }
  return (
    <div className="Todo7">
      <input
        type="text"
        placeholder="searchhhhhh"
        value={search7}
        onChange={(e) => {
          setsearch7(e.target.value);
        }}
      />
      <form action="submit" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name7}
          onChange={(e) => {
            setname7(e.target.value);
          }}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleEdit}>
          <input
            type="text"
            value={edit7}
            onChange={(e) => {
              setedit7(e.target.value);
            }}
          />
        </form>
      )}
      {posts.map((e) => (
        <div key={e.id}>
          {e.name7}{" "}
          <button
            onClick={() => {
              delete7(e.id);
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
          key={e}
          onClick={() => {
            setcurrentPage(e);
          }}>
          {e}
        </div>
      ))}
      {jsondata
        .filter((e) =>
          e.first_name.toLowerCase().includes(search7.toLowerCase())
        )
        .map((e) => (
          <div key={e.id}>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo7;
