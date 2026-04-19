// TestPage.tsx
const TestPage = () => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token"); // Anta att du sparar JWT här
  
      const res = await fetch("http://localhost:3000/api/auth/profile", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
      console.log(data);
    };
  
    return (
      <div>
        <h1>Testa backend-anrop</h1>
        <button onClick={fetchProfile}>Hämta profil</button>
      </div>
    );
  };
  
  export default TestPage;   