// TEMPORARY HACKATHON DEMO MODE: remove this module before production.

export type DemoRole =
  | 'CUSTOMER'
  | 'APPLICANT'
  | 'WORKER'
  | 'COOPERATIVE_OFFICER'
  | 'FEDERATION_ADMIN';

type DemoAccount = {
  email: string;
  password: string;
  id: string;
  name: string;
  role: DemoRole;
};

export const DEMO_ACCOUNTS: readonly DemoAccount[] = [
  {
    email: 'customer@demo.com',
    password: 'password123',
    id: '766d9529-f67f-406a-81ff-b081ecf6dd59',
    name: 'Priya (Customer)',
    role: 'CUSTOMER',
  },
  {
    email: 'applicant@demo.com',
    password: 'password123',
    id: '3cf34bbb-fd7d-4d55-b491-3465a03c964d',
    name: 'Rahul (Applicant)',
    role: 'APPLICANT',
  },
  {
    email: 'worker@demo.com',
    password: 'password123',
    id: 'a1099dd1-1eed-45fd-8b0b-8b216421eb73',
    name: 'Anil (Worker)',
    role: 'WORKER',
  },
  {
    email: 'officer@demo.com',
    password: 'password123',
    id: '4e0cfe16-9f2a-41a4-b6a6-f7c2043a5e2c',
    name: 'Meera (Coop Officer)',
    role: 'COOPERATIVE_OFFICER',
  },
  {
    email: 'admin@demo.com',
    password: 'password123',
    id: '1951901e-4e97-4f01-b777-d7089c859548',
    name: 'Vikram (Fed Admin)',
    role: 'FEDERATION_ADMIN',
  },
];

export function findDemoAccount(email: string, password: string) {
  return DEMO_ACCOUNTS.find((account) => account.email === email && account.password === password) ?? null;
}
