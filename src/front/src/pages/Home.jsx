function Home() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    
    <div>
      <h1>Página Inicial 🏠</h1>
      <h1>Bem vindo(a) {usuario?.nome_usuario}! </h1>
    </div>
  )  
}
export default Home