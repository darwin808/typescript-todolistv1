import React, { useState } from "react";
import jsondata from "./MOCK_DATA (1).json";

function Todo17() {
  const [name17, setname17] = useState<string>("");
  const [edit17, setedit17] = useState<string>("");
  const [idholder, setidholder] = useState<number>(0);
  const [modal, setmodal] = useState<boolean>(false);
  const [collect, setcollect] = useState<{ name17: string; id: number }[]>([]);
  const [postperpage, setpostperpage] = useState<number>(5);
  const [currentpage, setcurrentpage] = useState<number>(1);

  const [search, setsearch] = useState<string>("");

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect([...collect, { name17, id: Math.random() }]);
  };
  const dele17 = (id: number) => {
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
      e.id === idholder ? { ...e, name17: edit17 } : e
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
    <div className="todo17">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setsearch(e.target.value);
        }}
      />
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name17}
          onChange={(e) => {
            setname17(e.target.value);
          }}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit17}
            onChange={(e) => {
              setedit17(e.target.value);
            }}
          />
        </form>
      )}
      {posts.map((e) => (
        <div key={e.id}>
          {e.name17}{" "}
          <button
            onClick={() => {
              dele17(e.id);
            }}
          >
            delete
          </button>
          <button
            onClick={() => {
              openmodal(e.id);
            }}
          >
            delete
          </button>
        </div>
      ))}
      {pagenum.map((e) => (
        <div onClick={() => setcurrentpage(e)} key={e}>
          {e}
        </div>
      ))}
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

export default Todo17;
