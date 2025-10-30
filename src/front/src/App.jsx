import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      
      <SignedOut>
        <SignInButton mode="modal">
          <button>Entrar</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <p>Você está logado!</p>
        <UserButton /> 
      </SignedIn>

    </div>
  );
}
