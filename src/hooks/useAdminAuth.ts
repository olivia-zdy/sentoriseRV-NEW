import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface TeamMember {
  id: string;
  user_id: string;
  email: string;
  name: string;
  avatar_url: string | null;
}

interface UserRole {
  role: string;
}

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [teamMember, setTeamMember] = useState<TeamMember | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTeamMember, setIsTeamMember] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer Supabase calls with setTimeout
        if (session?.user) {
          setTimeout(() => {
            fetchTeamMemberData(session.user.id);
          }, 0);
        } else {
          setTeamMember(null);
          setRoles([]);
          setIsTeamMember(false);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchTeamMemberData(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchTeamMemberData = async (userId: string) => {
    try {
      // Fetch team member profile
      const { data: memberData, error: memberError } = await supabase
        .from('team_members')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (memberError) {
        console.error('Error fetching team member:', memberError);
        setIsTeamMember(false);
        setIsLoading(false);
        return;
      }

      if (memberData) {
        setTeamMember(memberData);
        setIsTeamMember(true);

        // Fetch user roles
        const { data: rolesData, error: rolesError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId);

        if (rolesError) {
          console.error('Error fetching roles:', rolesError);
        } else {
          setRoles(rolesData?.map((r: UserRole) => r.role) || []);
        }
      } else {
        setIsTeamMember(false);
      }
    } catch (error) {
      console.error('Error in fetchTeamMemberData:', error);
      setIsTeamMember(false);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  // Note: Public signup has been removed for security reasons.
  // Team members should be created by administrators only.

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setTeamMember(null);
      setRoles([]);
      setIsTeamMember(false);
    }
    return { error };
  };

  const hasRole = (role: string) => roles.includes(role);
  const isAdmin = () => hasRole('admin');

  return {
    user,
    session,
    teamMember,
    roles,
    isLoading,
    isTeamMember,
    signIn,
    signOut,
    hasRole,
    isAdmin,
  };
}
