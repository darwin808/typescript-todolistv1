import React, { useState, useEffect } from "react"
import axios from "axios"

function Fetch() {
   const [collect, setcollect] = useState<any[]>([])
   console.log(1234)
   useEffect(() => {
      fetchUser()
   }, [])
   const fetchUser = async () => {
      const data = await fetch("https://randomuser.me/api").then((e) => e.json())

      // const data = await response.json();

      const final = {
         first: data.results[0].name.first,
         last: data.results[0].name.last,
      }
      console.log(final)

      //  await axios
      //    .get("https://randomuser.me/ap1")
      //   .then(function (response) {
      //    console.log(response.data.results[0].name.first);
      //    const final = {
      //      first: response.data.results[0].name.first,
      //      last: response.data.results[0].name.last,
      //    };

      //     console.log(final);
      //   })
      //   .catch(function (error) {
      //   console.log(error);
      //  });
   }

   return <div>dad</div>
}

export default Fetch
