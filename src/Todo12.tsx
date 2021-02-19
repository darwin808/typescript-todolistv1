import React, { useState } from "react";
import data1 from "./MOCK_DATA (1).json";

const Todo12 = () => {
  const [name12, setname12] = useState<string>("");
  const [edit12, setedit12] = useState<string>("");
  const [modal, setmodal] = useState<boolean>(false);
	
  const [idholder, setidholder] = useState<number>(0);
  const [collect12, setcollect12] = useState<{ name12: string; id: number }[]>(
    []
  );
const [currentpage, setcurrentpage] = useState<number>(1);
  const [postperpage, setpostperpage] = useState<number>(5);
  const [search12, setsearch12] = useState<string>("");
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect12([...collect12, { name12, id: Math.random() }]);
  };
  const delet12 = (id: number) => {
    const newarr = collect12.filter((e) => e.id !== id);
    setcollect12(newarr);
  };
  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };
  const handleedit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect12.map((e) =>
      e.id === idholder ? { ...e, name12: edit12 } : e
    );
    setcollect12(x);
  };
  const indexOflast = currentpage * postperpage;
  const indexoffirst = indexOflast - postperpage;
  const posts = collect12.slice(indexoffirst, indexOflast);
  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect12.length / postperpage); i++) {
    pagenum.push(i);
  }
  return (
    <div>
      <input
        type="text"
        value={search12}
        onChange={(e) => {
          setsearch12(e.target.value);
        }}
      />
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name12}
          onChange={(e) => {
            setname12(e.target.value);
          }}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit12}
            onChange={(e) => {
              setedit12(e.target.value);
            }}
          />
        </form>
      )}
      {posts.map((e) => (
        <div key={e.id}>
          {e.name12}
          <button onClick={() => delet12(e.id)}>delete</button>
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
      {data1
        .filter((e) =>
          e.first_name.toLowerCase().includes(search12.toLowerCase())
        )
        .map((e) => (
          <div>{e.first_name}</div>
        ))}
    </div>
  );
};
export default Todo12;
