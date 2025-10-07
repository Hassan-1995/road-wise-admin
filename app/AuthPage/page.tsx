// "use client";
// import React, { useState } from "react";
// import Login from "./Login";
// import Register from "./Register";

// const AuthPage = () => {
//   const [auth, setAuth] = useState(true);

//   console.log(auth);
//   return (
//     <div className="-ml-[15%] md:-ml-[10%] lg:-ml-[5%]">
//       {auth ? <Login setAuth={setAuth} /> : <Register setAuth={setAuth} />}
//     </div>
//   );
// };

// export default AuthPage;

"use client";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const [auth, setAuth] = useState(true);
  const { status } = useAuth(); // 👈 check auth context
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // if logged in, go to home page
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // prevent flicker
  }

  // if unauthenticated → show login/register toggle
  return (
    <div className="-ml-[15%] md:-ml-[10%] lg:-ml-[5%]">
      {auth ? <Login setAuth={setAuth} /> : <Register setAuth={setAuth} />}
    </div>
  );
};

export default AuthPage;
