import React, { useState } from "react";
import Todo2 from "./Todo4";
const App: React.FC = () => {
  const [name1, setname1] = useState<string>("");
  const [collect1, setcollect1] = useState<{ name1: string; id: number }[]>([]);
  const [edit1, setedit1] = useState<string>("");
  const [modal, setmodal] = useState<boolean>(false);
  const [idholder, setidholder] = useState<number | null>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setcollect1([...collect1, { name1, id: Math.random() }]);
  };
  const delete1 = (id: number) => {
    const newarr = collect1.filter((e) => e.id !== id);
    setcollect1(newarr);
  };
  const openmodal = (id: number) => {
    setidholder(id);
    setmodal(true);
  };
  const handleedit1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const x = collect1.map((e) =>
      e.id === idholder ? { ...e, name1: edit1 } : e
    );
    setcollect1(x);
  };
  return (
    <div className="App">
      {/* <form action="submit" onSubmit={handleSubmit}>
        <input type="text" value={name1} onChange={(e) => { setname1(e.target.value) }} />
      </form>

      {modal && <form action="submit" onSubmit={handleedit1}>
        <input type="text" value={edit1} onChange={(e) => { setedit1(e.target.value) }} />
      </form>

      }
      {collect1.map(e => <div key={e.id}>{e.name1}  <button onClick={() => { delete1(e.id) }}>delete</button>
        <button onClick={() => { openmodal(e.id) }}>edit</button>
      </div>)} */}
      <Todo2 />
    </div>
  );
};

export default App;
