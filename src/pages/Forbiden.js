import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>403 - Acesso Negado</h1>
      <p>Você precisa verificar seu e-mail antes de acessar este recurso.</p>
      <Link to="/">Voltar para a página inicial</Link>
    </div>
  );
};

export default Forbidden;