import { z } from 'zod';
import { insertSearchSchema, searches, leads } from './schema';

export const api = {
  searches: {
    create: {
      method: 'POST' as const,
      path: '/api/searches',
      input: insertSearchSchema,
      responses: {
        201: z.custom<typeof searches.$inferSelect>(),
        400: z.object({ message: z.string() })
      }
    },
    list: {
      method: 'GET' as const,
      path: '/api/searches',
      responses: {
        200: z.array(z.custom<typeof searches.$inferSelect>())
      }
    },
    get: {
      method: 'GET' as const,
      path: '/api/searches/:id',
      responses: {
        200: z.custom<typeof searches.$inferSelect>(),
        404: z.object({ message: z.string() })
      }
    }
  },
  leads: {
    list: {
      method: 'GET' as const,
      path: '/api/leads',
      input: z.object({
        searchId: z.string().optional()
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof leads.$inferSelect>())
      }
    },
    export: {
      method: 'POST' as const,
      path: '/api/leads/export',
      input: z.object({
        searchId: z.number()
      }),
      responses: {
        200: z.object({ success: z.boolean(), message: z.string() }),
        400: z.object({ message: z.string() })
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
