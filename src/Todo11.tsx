import React, { useState } from "react";
import data1 from "./MOCK_DATA (1).json";

function Todo11() {
  const [name11, setName11] = useState<string>("");
  const [edit11, setedit11] = useState<string>("");
  const [modal, setmodal] = useState<boolean>(false);
  const [idholder, setidholder] = useState<number>(0);
  const [collect11, setcollect11] = useState<{ name11: string; id: number }[]>(
    []
  );
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [postperPage, setpostperPage] = useState<number>(5);
  const [serch11, setserch11] = useState<string>("");
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect11([...collect11, { name11, id: Math.random() }]);
  };
  const delete11 = (id: number) => {
    const newarr = collect11.filter((e) => e.id !== id);
    setcollect11(newarr);
  };
  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };
  const handleedit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect11.map((e) =>
      e.id === idholder ? { ...e, name11: edit11 } : e
    );
    setcollect11(x);
  };
  const indexoflast = currentPage * postperPage;
  const indexoffirst = indexoflast - postperPage;
  const pageNum = [];

  const posts = collect11.slice(indexoffirst, indexoflast);
  for (let i = 1; i <= Math.ceil(collect11.length / postperPage); i++) {
    pageNum.push(i);
  }
  return (
    <div>
      <input
        type="text"
        value={serch11}
        onChange={(e) => {
          setserch11(e.target.value);
        }}
      />
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name11}
          onChange={(e) => setName11(e.target.value)}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit11}
            onChange={(e) => setedit11(e.target.value)}
          />
        </form>
      )}
      {collect11.map((e) => (
        <div key={e.id}>
          {e.name11}{" "}
          <button
            onClick={() => {
              delete11(e.id);
            }}
          >
            delete
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
      {pageNum.map((e) => (
        <div
          onClick={() => {
            setcurrentPage(e);
          }}
          key={e}
        >
          {e}
        </div>
      ))}

      {data1
        .filter((e) =>
          e.first_name.toLowerCase().includes(serch11.toLowerCase())
        )
        .map((e) => (
          <div key={e.id}>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo11;
