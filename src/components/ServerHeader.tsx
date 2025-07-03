import { getServerAuth } from '@/lib/auth-server';
import Header from './Header';

export default async function ServerHeader() {
  const auth = await getServerAuth();
  
  return (
    <Header 
      serverAuth={{
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
      }} 
    />
  );
} 