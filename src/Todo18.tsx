import { stringify } from "querystring";
import React, { useState } from "react";
import jsondata from "./MOCK_DATA (1).json";
function Todo18() {
  const [name18, setname18] = useState<string>("");
  const [edit18, setedit18] = useState<string>("");
  const [idholder, setidholder] = useState<number>(0);
  const [modal, setmodal] = useState<boolean>(false);
  const [collect, setcollect] = useState<{ name18: string; id: number }[]>([]);
  const [currentpage, setcurrentpage] = useState<number>(1);
  const [postperpage, setpostperpage] = useState<number>(5);

  const [search, setsearch] = useState<string>("");
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect([...collect, { name18, id: Math.random() }]);
  };

  const del18 = (id: number) => {
    const newarr = collect.filter((e) => e.id !== id);
    setcollect(newarr);
  };
  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };

  const handleedit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect.map((e) =>
      e.id === idholder ? { ...e, name18: edit18 } : e
    );
    setcollect(x);
  };

  const indexoflast = currentpage * postperpage;
  const indexoffirst = indexoflast - postperpage;
  const posts = collect.slice(indexoffirst, indexoflast);

  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect.length / postperpage); i++) {
    pagenum.push(i);
  }
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
      />
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name18}
          onChange={(e) => {
            setname18(e.target.value);
          }}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit18}
            onChange={(e) => {
              setedit18(e.target.value);
            }}
          />
        </form>
      )}
      {collect.map((e) => (
        <div key={e.id}>
          {e.name18} <button onClick={() => del18(e.id)}>delete</button>
          <button onClick={() => openmodal(e.id)}>edit</button>
        </div>
      ))}
      {pagenum.map((e) => (
        <div key={e} onClick={() => setcurrentpage(e)}>
          {e}
        </div>
      ))}
      231
      {jsondata
        .filter((e) =>
          e.first_name.toLowerCase().includes(search.toLowerCase())
        )
        .map((e) => (
          <div key={e.id}>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo18;
