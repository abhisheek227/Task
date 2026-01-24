import { useEffect, useRef } from "react";

const useAuthCheck = (setUser, setLoading) => {
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5000/api/auth/done", {
          credentials: "include",
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });

        if (!res.ok) {
        
          if (res.status === 401) {
            const refreshRes = await fetch("http://localhost:5000/api/auth/refreshtoken", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken }),
            });

            if (refreshRes.ok) {
              const refreshData = await refreshRes.json();
              localStorage.setItem("accessToken", refreshData.accessToken);
              localStorage.setItem("refreshToken", refreshData.refreshToken);

              const retryRes = await fetch("http://localhost:5000/api/auth/done", {
                credentials: "include",
                headers: {
                  "Authorization": `Bearer ${refreshData.accessToken}`
                }
              });

              if (retryRes.ok) {
                const data = await retryRes.json();
                setUser(data.user);
              }
            } else {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
            }
          }
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Auth check error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser, setLoading]);
};

export default useAuthCheck;
