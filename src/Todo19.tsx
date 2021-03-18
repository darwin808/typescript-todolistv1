import data1 from "./MOCK_DATA (1).json";
import React, { useState } from "react";

function Todo19() {
  const [name19, setname19] = useState<string>("");
  const [edit19, setedit19] = useState<string>("");
  const [idholder, setidholder] = useState<number>(0);
  const [modal, setmodal] = useState<boolean>(false);
  const [currentpage, setcurrentpage] = useState<number>(1);
  const [postperpage, setpostperpage] = useState<number>(5);
  const [search19, setsearch19] = useState<string>("");
  const [collect19, setcollect19] = useState<{ name19: string; id: number }[]>(
    []
  );
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect19([...collect19, { name19, id: Math.random() }]);
  };

  const delete19 = (id: number) => {
    const newarr = collect19.filter((e) => e.id !== id);
    setcollect19(newarr);
  };

  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };
  const handleedit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect19.map((e) =>
      e.id === idholder ? { ...e, name19: edit19 } : e
    );
    setcollect19(x);
  };
  const indexoflast = currentpage * postperpage;
  const indexoffirst = indexoflast - postperpage;
  const posts = collect19.slice(indexoffirst, indexoflast);

  const pagenum = [];
  for (let i = 1; i < Math.ceil(collect19.length / postperpage); i++) {
    pagenum.push(i);
  }
  return (
    <div>
      <input
        type="text"
        value={search19}
        onChange={(e) => {
          setsearch19(e.target.value);
        }}
      />
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name19}
          onChange={(e) => {
            setname19(e.target.value);
          }}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit19}
            onChange={(e) => {
              setedit19(e.target.value);
            }}
          />
        </form>
      )}
      {posts.map((e) => (
        <div key={e.id}>
          {e.name19} <button onClick={() => delete19(e.id)}>delete</button>{" "}
          <button onClick={() => openmodal(e.id)}>edit</button>
        </div>
      ))}
      {pagenum.map((e) => (
        <div onClick={() => setcurrentpage(e)} key={e}>
          {e}
        </div>
      ))}

      {data1
        .filter((e) =>
          e.first_name.toLowerCase().includes(search19.toLowerCase())
        )
        .map((e) => (
          <div key={e.id}>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo19;
