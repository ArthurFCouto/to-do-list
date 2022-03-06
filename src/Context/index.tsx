//Observações para o context com typescript
import { useState, createContext } from "react";

interface User {
    email: String | null;
    password: String | null;
    token: String | null;
}; //Criamos a interface, modelo que será o nosso objeto user

type Context = {
    user: User;
    setUser: React.Dispatch<any>;
} //Criamos o tipo que será o nosso contexto, o que poderá ser acessado por ele

export const UserContext = createContext<Partial<Context>>({}); //Exportamos o nosso contexto que tem que ser do tipo definido acima, e usamos o Partial para criar um contexto vazio

function UserProvider({ children }: any) {
  const [user, setUser] = useState({
    email: null,
    password: null,
    token: null,
  });
  //Como usei o Partial, antes de utilizar os values passados, preciso verificar se eles existem.

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
