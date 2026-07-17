// NuChroma — Auth helpers
import { supabase } from "./supabase-client.js";

// Sign up with email + password, then store profile metadata
export async function signUp({ email, password, displayName, accountType, extras }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName }
    }
  });
  if (error) return { error };

  // Update profile with NuChroma-specific fields
  if (data.user) {
    const profile = {
      id: data.user.id,
      display_name: displayName,
      account_type: accountType || "creative",
      ...extras
    };
    await supabase.from("profiles").upsert(profile);
  }

  return { data };
}

// Log in with email + password
export async function logIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
}

// Log out
export async function logOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Get current session (null if not logged in)
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Get current user's profile
export async function getProfile() {
  const session = await getSession();
  if (!session) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  return data;
}

// Update current user's profile
export async function updateProfile(updates) {
  const session = await getSession();
  if (!session) return { error: { message: "Not logged in" } };

  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", session.user.id)
    .select()
    .single();

  return { data, error };
}

// Redirect to login if not authenticated (use on app pages)
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    window.location.href = "login.html";
    return null;
  }
  return session;
}

// Redirect to feed if already authenticated (use on login/signup pages)
export async function redirectIfLoggedIn() {
  const session = await getSession();
  if (session) {
    window.location.href = "feed.html";
  }
  return session;
}

// Listen for auth state changes
export function onAuthChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}
