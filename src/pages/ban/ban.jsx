const BannedPage = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#f8d7da',
      color: '#721c24',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1>Acceso Denegado</h1>
      <p>Lo sentimos, tu cuenta ha sido baneada y no puedes acceder a esta sección.</p>
      <p>Si crees que esto es un error, contacta con soporte.</p>
    </div>
  );
};

export default BannedPage;