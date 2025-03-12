import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_SERVICE_KEY');

    if (!url) {
      throw new Error('SUPABASE_URL is not defined in the environment variables.');
    }

    if (!key) {
      throw new Error('SUPABASE_SERVICE_KEY is not defined in the environment variables.');
    }

    this.supabase = createClient(url, key);
  }
}
