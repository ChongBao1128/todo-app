import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL') || 'https://avooixfsjitrllulmgwu.supabase.co';
    const key = this.configService.get<string>('SUPABASE_SERVICE_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2b29peGZzaml0cmxsdWxtZ3d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MjY1MDYsImV4cCI6MjA1NzIwMjUwNn0.N5YHhtvpcBLk1gKV-Rll6wucuoYPdfF7a54231Z3TYg';

    this.supabase = createClient(url, key);
  }
}
