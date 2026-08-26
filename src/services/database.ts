import { supabase } from './supabaseClient';

export async function fetchServices() {
  const { data, error } = await supabase.from('services').select('*');
  if (error) {
    throw error;
  }
  return data;
}

export async function fetchCooperatives() {
  const { data, error } = await supabase.from('cooperatives').select('*');
  if (error) {
    throw error;
  }
  return data;
}
