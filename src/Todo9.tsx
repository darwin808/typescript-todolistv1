import React, { useState } from "react";
import jsondata from "./MOCK_DATA (1).json";

function Todo9() {
  const [name9, setname9] = useState<string>("");
  const [edit9, setedit9] = useState<string>("");
  const [idholder, setidholder] = useState<number | null>(null);
  const [modal, setmodal] = useState<boolean>(false);
  const [collect9, setcollect9] = useState<{ name9: string; id: number }[]>([]);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [postperpage, setpostperpage] = useState<number>(5);
  const [search9, setsearch9] = useState<string>("");
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect9([...collect9, { name9, id: Math.random() }]);
  };
  const delete9 = (id: number) => {
    const newarr = collect9.filter((e) => e.id !== id);
    setcollect9(newarr);
  };
  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };
  const handleedit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect9.map((e) =>
      e.id === idholder ? { ...e, name9: edit9 } : e
    );
    setcollect9(x);
  };
  const indexoflast = currentPage * postperpage;
  const indexoffirst = indexoflast - postperpage;
  const posts = collect9.slice(indexoffirst, indexoflast);
  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect9.length / postperpage); i++) {
    pagenum.push(i);
  }
  return (
    <div>
      <input
        type="text"
        value={search9}
        onChange={(e) => {
          setsearch9(e.target.value);
        }}
      />
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name9}
          onChange={(e) => {
            setname9(e.target.value);
          }}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit9}
            onChange={(e) => {
              setedit9(e.target.value);
            }}
          />
        </form>
      )}
      {posts.map((e) => (
        <div key={e.id}>
          {e.name9}{" "}
          <button
            onClick={() => {
              delete9(e.id);
            }}
          >
            dlete
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
        <div key={e}>{e}</div>
      ))}
      {jsondata
        .filter((e) =>
          e.first_name.toLowerCase().includes(search9.toLowerCase())
        )
        .map((e) => (
          <div key={e.id}>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo9;
