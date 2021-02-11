import React, { useState } from "react";
import jsondata from "./MOCK_DATA (1).json";

function Todo5() {
  const [serch, setserch] = useState<string>("");
  const [name5, setname5] = useState<string>("");
  const [collect5, setcollect5] = useState<{ name5: string; id: number }[]>([]);
  const [edit5, setedit5] = useState<string>("");
  const [modal, setmodal] = useState<boolean>(false);
  const [idholder, setidholder] = useState<number>(0);

  const [currentpage, setcurrentpage] = useState<number>(1);
  const [postperpage, setpostperpage] = useState<number>(5);
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect5([...collect5, { name5, id: Math.random() }]);
  };
  const dele5 = (id: number) => {
    const newarr = collect5.filter((e) => e.id !== id);
    setcollect5(newarr);
  };

  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };
  const handleedit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect5.map((e) =>
      e.id === idholder ? { ...e, name5: edit5 } : e
    );
    setcollect5(x);
  };
  const indexoflast = currentpage * postperpage;
  const indexoffirst = indexoflast - postperpage;
  const posts = collect5.slice(indexoffirst, indexoflast);
  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect5.length / postperpage); i++) {
    pagenum.push(i);
  }
  return (
    <div>
      <h1>TODO5</h1>

      <input
        type="text"
        value={serch}
        onChange={(e) => {
          setserch(e.target.value);
        }}
      />
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name5}
          onChange={(e) => {
            setname5(e.target.value);
          }}
        />
      </form>

      {modal && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit5}
            onChange={(e) => {
              setedit5(e.target.value);
            }}
          />
        </form>
      )}
      {posts.map((e) => (
        <div key={e.id}>
          {e.name5}{" "}
          <button
            onClick={() => {
              dele5(e.id);
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
            setcurrentpage(e);
          }}
          key={e}>
          {e}
        </div>
      ))}
      {jsondata
        .filter((e) => e.first_name.toLowerCase().includes(serch.toLowerCase()))
        .map((e) => (
          <div key={e.id}>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo5;
