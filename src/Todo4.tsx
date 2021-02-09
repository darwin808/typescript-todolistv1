import React, { useState } from "react";
import jsondata from "./MOCK_DATA (1).json";

function Todo4() {
  const [name4, setname4] = useState<string>("");
  const [collect4, setcollect4] = useState<{ name4: string; id: number }[]>([]);
  const [edit4, setedit4] = useState<string>("");
  const [modal, setmodal] = useState<boolean>(false);
  const [idholder, setidholder] = useState<number | null>(null);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [postPerPage, setpostPerPage] = useState<number>(5);
  const [serch, setserch] = useState<string>("");
  const handlesubmit4 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect4([...collect4, { name4, id: Math.random() }]);
  };
  const del4 = (id: number) => {
    const newarr = collect4.filter((e) => e.id !== id);
    setcollect4(newarr);
  };
  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };
  const handleedit4 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect4.map((e) =>
      e.id === idholder ? { ...e, name4: edit4 } : e
    );
    setcollect4(x);
  };
  const indexOfLast = currentPage * postPerPage;
  const indexOfFirst = indexOfLast - postPerPage;
  const posts = collect4.slice(indexOfFirst, indexOfLast);
  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect4.length / postPerPage); i++) {
    pagenum.push(i);
  }
  return (
    <div>
      <h1>TODO4</h1>
      <form action="submit" onSubmit={handlesubmit4}>
        {" "}
        <input
          type="text"
          value={name4}
          onChange={(e) => {
            setname4(e.target.value);
          }}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleedit4}>
          {" "}
          <input
            type="text"
            value={edit4}
            onChange={(e) => {
              setedit4(e.target.value);
            }}
          />
        </form>
      )}
      {posts.map((e) => (
        <div key={e.id}>
          {e.name4}{" "}
          <button
            onClick={() => {
              del4(e.id);
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
      <input
        type="text"
        value={serch}
        onChange={(e) => {
          setserch(e.target.value);
        }}
      />
      {jsondata
        .filter((e) => e.first_name.toLowerCase().includes(serch.toLowerCase()))
        .map((e) => (
          <div key={e.id}>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo4;
