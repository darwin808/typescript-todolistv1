import React, { useState } from "react";
import jsondata from "./MOCK_DATA (1).json";

function Todo16() {
  const [name16, setname16] = useState<string>("");
  const [edit16, setedit16] = useState<string>("");
  const [modal, setmodal] = useState<boolean>(false);
  const [idholder, setidholder] = useState<number>(0);
  const [collect16, setcollect16] = useState<{ name16: string; id: number }[]>(
    []
  );
  const [currentpage, setcurrentpage] = useState(1);
  const [postperpage, setpostperpage] = useState<number>(5);

  const [serch16, setserch16] = useState<string>("");
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect16([...collect16, { name16, id: Math.random() }]);
  };
  const delete16 = (id: number) => {
    const newarr = collect16.filter((e) => e.id !== id);
    setcollect16(newarr);
  };
  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };
  const handleedit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect16.map((e) =>
      e.id === idholder ? { ...e, name16: edit16 } : e
    );

    setcollect16(x);
  };
  const indexoflast = currentpage * postperpage;
  const indexoffirst = indexoflast - postperpage;
  const posts = collect16.slice(indexoffirst, indexoflast);

  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect16.length / postperpage); i++) {
    pagenum.push(i);
  }
  return (
    <div>
      <input
        type="text"
        value={serch16}
        onChange={(e) => {
          setserch16(e.target.value);
        }}
      />
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name16}
          onChange={(e) => {
            setname16(e.target.value);
          }}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit16}
            onChange={(e) => {
              setedit16(e.target.value);
            }}
          />
        </form>
      )}
      {collect16.map((e) => (
        <div key={e.id}>
          {e.name16}{" "}
          <button
            onClick={() => {
              delete16(e.id);
            }}
          >
            DELETE
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
        <div
          onClick={() => {
            setcurrentpage(e);
          }}
          key={e}
        >
          {e}
        </div>
      ))}
      {jsondata
        .filter((e) =>
          e.first_name.toLowerCase().includes(serch16.toLowerCase())
        )
        .map((e) => (
          <div key={e.id}>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo16;
