import React, { useState } from "react";
import jsondata from "./MOCK_DATA (1).json";

function Todo6() {
  const [name6, setname6] = useState<string>("");
  const [collect6, setcollect6] = useState<{ name6: string; id: number }[]>([]);
  const [edit, setedit] = useState<string>("");
  const [modal, setmodal] = useState<boolean>(false);
  const [idholde, setidholde] = useState<number | null>(null);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [postPerPage, setpostPerPage] = useState<number>(5);
  const [serchh, setserchh] = useState<string>("");

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setcollect6([...collect6, { name6, id: Math.random() }]);
  };

  const delete6 = (id: number) => {
    const newarr = collect6.filter((e) => e.id !== id);
    setcollect6(newarr);
  };
  const openmodal = (id: number) => {
    setidholde(id);
    setmodal(true);
  };

  const handleedit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect6.map((e) =>
      e.id === idholde ? { ...e, name6: edit } : e
    );
    setcollect6(x);
  };

  const jkahgdjahgdjahgda = (e: React.FormEvent<HTMLFormElement>) => {};
  const indexoflast = currentPage * postPerPage;
  const indexoffirst = indexoflast - postPerPage;
  const posts = collect6.slice(indexoffirst, indexoflast);
  const pageNum = [];
  for (let i = 1; i <= Math.ceil(collect6.length / postPerPage); i++) {
    pageNum.push(i);
  }
  return (
    <div>
      <h1>todo6</h1>
      <input
        type="text"
        placeholder="search"
        value={serchh}
        onChange={(e) => {
          setserchh(e.target.value);
        }}
      />
      <form action="submit" onSubmit={handlesubmit}>
        <input
          type="text"
          value={name6}
          onChange={(e) => {
            setname6(e.target.value);
          }}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit}
            onChange={(e) => {
              setedit(e.target.value);
            }}
          />
        </form>
      )}

      {posts.map((e) => (
        <div key={e.id}>
          {e.name6}
          <button
            onClick={() => {
              delete6(e.id);
            }}>
            del
          </button>
          <button
            onClick={() => {
              openmodal(e.id);
            }}>
            edit
          </button>
        </div>
      ))}

      {pageNum.map((e) => (
        <div key={e}>{e}</div>
      ))}
      {jsondata
        .filter((e) =>
          e.first_name.toLowerCase().includes(serchh.toLowerCase())
        )
        .map((e) => (
          <div key={e.id}>{e.first_name}</div>
        ))}
    </div>
  );
}

export default Todo6;
