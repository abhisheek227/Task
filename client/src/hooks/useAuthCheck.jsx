import { useEffect, useRef } from "react";

const useAuthCheck = (setUser, setLoading) => {
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/done", {
          credentials: "include",
        });

        if (!res.ok) return;

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser, setLoading]);
};

export default useAuthCheck;
