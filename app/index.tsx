import { Redirect } from 'expo-router';
import { useAuth } from './hooks/useAuth';
import LoadingScreen from './screens/LoadingScreen';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return <Redirect href={user ? "/dashboard" : "/login"} />;
}
