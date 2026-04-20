// TestPage.tsx
import { useEffect, useState } from "react";
import api from "../services/api";

interface ProfileData {
  user: {
    userId: string;
    role: string;
  };
}

const TestPage = () => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/auth/profile");
        setData(res.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Något gick fel");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>Fel: {error}</p>;

  return (
    <div>
      <h1>Test av skyddad route</h1>
      <p><strong>UserId:</strong> {data?.user.userId}</p>
      <p><strong>Roll:</strong> {data?.user.role}</p>
    </div>
  );
};

export default TestPage;   


// // TestPage.tsx
// const TestPage = () => {
    // const fetchProfile = async () => {
      // const token = localStorage.getItem("token"); // Anta att du sparar JWT här
  
      // const res = await fetch("http://localhost:3000/api/auth/profile", {
        // headers: {
          // "Authorization": `Bearer ${token}`,
        // },
      // });
  
      // const data = await res.json();
      // console.log(data);
    // };
  
    // return (
      // <div>
        // <h1>Testa backend-anrop</h1>
        // <button onClick={fetchProfile}>Hämta profil</button>
      // </div>
    // );
  // };
  
  // export default TestPage;   