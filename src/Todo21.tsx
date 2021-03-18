import React, { useState } from "react";
import data21 from "./MOCK_DATA (1).json";
function Todo21() {
  const [name21, setname21] = useState<string>("");
  const [edit21, setedit21] = useState<string>("");
  const [idholder, setidholder] = useState<number | null>(null);
  const [modal, setmodal] = useState<boolean>(false);
  const [collect20, setcollect20] = useState<{ name21: string; id: number }[]>(
    []
  );

  const [currentPage, setcurrentPage] = useState<number>(1);
  const [postperpage, setpostperpage] = useState<number>(5);
  const [search21, setsearch21] = useState<string>("");
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect20([...collect20, { name21, id: Math.random() }]);
  };
  const del21 = (id: number) => {
    const newarr = collect20.filter((e) => e.id !== id);
    setcollect20(newarr);
  };

  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };
  const handleedit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect20.map((e) =>
      e.id === idholder ? { ...e, name21: edit21 } : e
    );
    setcollect20(x);
  };
  const indexOflast = currentPage * postperpage;
  const indexoffirst = indexOflast - postperpage;
  const posts = collect20.slice(indexoffirst, indexOflast);

  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect20.length / postperpage); i++) {
    pagenum.push(i);
  }
  return (
    <div>
      <input
        type="text"
        value={search21}
        onChange={(e) => setsearch21(e.target.value)}
        placeholder="search"
      />
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name21}
          onChange={(e) => setname21(e.target.value)}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit21}
            onChange={(e) => setedit21(e.target.value)}
          />
        </form>
      )}

      {posts.map((e) => (
        <div key={e.id}>
          {e.name21} <button onClick={() => del21(e.id)}>delete</button>{" "}
          <button onClick={() => openmodal(e.id)}>edit</button>
        </div>
      ))}
      {pagenum.map((e) => (
        <div key={e} onClick={() => setcurrentPage(e)}>
          {e}
        </div>
      ))}
      {data21
        .filter((e) =>
          e.first_name.toLowerCase().includes(search21.toLowerCase())
        )
        .map((e) => (
          <div key={e.id}> {e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo21;
