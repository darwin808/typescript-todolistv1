import React, { useState } from "react";
import jsondata from "./MOCK_DATA (1).json";

function Todo8() {
  const [name8, setname8] = useState<string>("");
  const [edit8, setedit8] = useState<string>("");
  const [modal8, setmodal8] = useState<boolean>(false);
  const [idholder, setidholder] = useState<number | null>(null);
  const [collect8, setcollect8] = useState<{ name8: string; id: number }[]>([]);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [postperpage, setpostperpage] = useState<number>(5);
  const [sirch, setsirch] = useState<string>("");
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect8([...collect8, { name8, id: Math.random() }]);
  };

  const delete8 = (id: number) => {
    const newarr = collect8.filter((e) => e.id !== id);
    setcollect8(newarr);
  };
  const openmodal = (id: number) => {
    setidholder(id);
    setmodal8(true);
  };
  const handleedit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect8.map((e) =>
      e.id === idholder ? { ...e, name8: edit8 } : e
    );
    setcollect8(x);
  };
  const indexoflast = currentPage * postperpage;
  const indexoffirst = indexoflast - postperpage;
  const posts = collect8.slice(indexoffirst, indexoflast);
  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect8.length / postperpage); i++) {
    pagenum.push(i);
  }
  return (
    <div className="todo8">
      <input
        type="text"
        value={sirch}
        placeholder="serch"
        onChange={(e) => {
          setsirch(e.target.value);
        }}
      />
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name8}
          onChange={(e) => {
            setname8(e.target.value);
          }}
        />
      </form>
      {modal8 && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit8}
            onChange={(e) => {
              setedit8(e.target.value);
            }}
          />
        </form>
      )}
      {posts.map((e) => (
        <div key={e.id}>
          {e.name8}{" "}
          <button
            onClick={() => {
              delete8(e.id);
            }}>
            delte
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

      {jsondata
        .filter((e) => e.first_name.toLowerCase().includes(sirch.toLowerCase()))
        .map((e) => (
          <div key={e.id}>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo8;
