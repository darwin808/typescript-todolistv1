import React, { useState } from "react";
import data1 from "./MOCK_DATA (1).json";

function Todo10() {
  const [name10, setname10] = useState<string>("");
  const [edit10, setedit10] = useState<string>("");
  const [idholder, setidholder] = useState<number>(0);
  const [modal, setmodal] = useState<boolean>(false);
  const [collect10, setcollect10] = useState<{ name10: string; id: number }[]>(
    []
  );
  const [currnetPage, setcurrnetPage] = useState<number>(1);
  const [postperpage, setpostperpage] = useState<number>(5);
  const [serch10, setserch10] = useState<string>("");
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect10([{ name10, id: Math.random() }, ...collect10]);
  };
  const delete10 = (id: number) => {
    const newarr = collect10.filter((e) => e.id !== id);
    setcollect10(newarr);
  };
  const openmodal10 = (id: number) => {
    setidholder(id);
    setmodal(true);
  };
  const handleedit10 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect10.map((e) =>
      e.id === idholder ? { ...e, name10: edit10 } : e
    );
    setcollect10(x);
  };
  const indexoflast = currnetPage * postperpage;
  const indexoffirst = indexoflast - postperpage;
  const posts = collect10.slice(indexoffirst, indexoflast);
  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect10.length / postperpage); i++) {
    pagenum.push(i);
  }
  return (
    <div>
      <input
        type="text"
        value={serch10}
        onChange={(e) => {
          setserch10(e.target.value);
        }}
      />
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name10}
          onChange={(e) => {
            setname10(e.target.value);
          }}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleedit10}>
          <input
            type="text"
            value={edit10}
            onChange={(e) => {
              setedit10(e.target.value);
            }}
          />
        </form>
      )}
      {collect10.map((e) => (
        <div key={e.id}>
          {e.name10}{" "}
          <button
            onClick={() => {
              delete10(e.id);
            }}
          >
            delete
          </button>
          <button
            onClick={() => {
              openmodal10(e.id);
            }}
          >
            edit
          </button>
        </div>
      ))}
      {pagenum.map((e) => (
        <div
          onClick={() => {
            setcurrnetPage(e);
          }}
          key={e}
        >
          {e}
        </div>
      ))}
      {data1
        .filter((e) =>
          e.first_name.toLowerCase().includes(serch10.toLowerCase())
        )
        .map((e) => (
          <div key={e.id}>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo10;
