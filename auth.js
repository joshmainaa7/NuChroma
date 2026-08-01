// NuChroma — Auth helpers
import { supabase } from "./supabase-client.js";

// Sign up with email + password
// Profile extras are stored in user metadata and applied on first login
export async function signUp({ email, password, displayName, accountType, extras }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
        account_type: accountType || "creative",
        ...extras
      }
    }
  });
  if (error) return { error };

  // Check for fake signup (email already exists, no identities returned)
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return { error: { message: "An account with this email already exists." } };
  }

  return { data };
}

// Log in with email + password
// On first login after email confirmation, sync metadata to the profile
export async function logIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) return { data, error };

  // Sync user metadata to profile on login
  if (data.user) {
    var meta = data.user.user_metadata || {};
    var updates = {};
    if (meta.display_name) updates.display_name = meta.display_name;
    if (meta.account_type) updates.account_type = meta.account_type;
    if (meta.agency_name) updates.agency_name = meta.agency_name;
    if (meta.agency_size) updates.agency_size = meta.agency_size;
    if (meta.craft) updates.craft = meta.craft;

    if (Object.keys(updates).length > 0) {
      await supabase.from("profiles").update(updates).eq("id", data.user.id);
    }
  }

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
