import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { loggedIn, setLoggedIn, loading };
}
