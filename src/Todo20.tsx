import React, { useState } from "react";
import jsontdata from "./MOCK_DATA (1).json";
function Todo20() {
  const [name20, setname20] = useState<string>("");
  const [edit20, setedit20] = useState<string>("");
  const [idholder, setidholder] = useState<number>(0);
  const [modal, setmodal] = useState<boolean>(false);
  const [collect20, setcollect20] = useState<{ name20: string; id: number }[]>(
    []
  );
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [postperpage, setpostperpage] = useState<number>(5);
  const [search20, setsearch20] = useState<string>("");
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect20([...collect20, { name20, id: Math.random() }]);
  };

  const delete20 = (id: number) => {
    const newarrr = collect20.filter((e) => e.id !== id);
    setcollect20(newarrr);
  };

  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };

  const handleedit20 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect20.map((e) =>
      e.id === idholder ? { ...e, name20: edit20 } : e
    );

    setcollect20(x);
  };
  const indexoflast = currentPage * postperpage;
  const indexoffirst = indexoflast - postperpage;
  const posts = collect20.slice(indexoffirst, indexoflast);
  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect20.length / postperpage); i++) {
    pagenum.push(i);
  }
  return (
    <div>
      <input
        type="text"
        value={search20}
        onChange={(e) => setsearch20(e.target.value)}
      />
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name20}
          onChange={(e) => setname20(e.target.value)}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleedit20}>
          <input
            type="text"
            value={edit20}
            onChange={(e) => setedit20(e.target.value)}
          />
        </form>
      )}
      {posts.map((e) => (
        <div key={e.id}>
          {e.name20} <button onClick={() => delete20(e.id)}>delete</button>{" "}
          <button onClick={() => openmodal(e.id)}>edit</button>
        </div>
      ))}
      {pagenum.map((e) => (
        <div onClick={() => setcurrentPage(e)} key={e}>
          {e}
        </div>
      ))}{" "}
      {jsontdata
        .filter((e) =>
          e.first_name.toLowerCase().includes(search20.toLowerCase())
        )
        .map((e) => (
          <div>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo20;
