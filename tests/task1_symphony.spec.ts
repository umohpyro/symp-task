import { test, expect } from '@playwright/test';

interface Entry {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}

interface ApiResponse {
  count: number;
  entries: Entry[];
}


test('Read the response, find all objects with property “Category: Authentication & Authorization” ', async ({ request }) => {
  const res = await request.get(`/entries`);
  const apiRes:ApiResponse = await res.json()

 const  numberOfOriginalEntries = apiRes.count

  const filteredEntries = apiRes.entries.filter((entry:Entry) => entry.Category === 'Authentication & Authorization')

  // expect(count).toEqual(1427)

  console.log("Original Entries Count", numberOfOriginalEntries);

  expect(filteredEntries.length).toEqual(7);

  console.log("Filtered Entries", filteredEntries);
});
