const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const services = [
  {
    name: 'Essential Wash',
    slug: 'essential_wash',
    description: 'A thorough exterior clean to keep your car looking fresh.',
    price: 999,
    duration: '1–2 hours',
    features: ['Hand wash & dry', 'Wheel & tyre clean', 'Window clean', 'Tyre shine', 'Door jamb wipe'],
    popular: false,
  },
  {
    name: 'Interior Detail',
    slug: 'interior_detail',
    description: 'Deep interior clean that restores your cabin to showroom condition.',
    price: 2999,
    duration: '2–3 hours',
    features: ['Full vacuum', 'Leather/fabric clean', 'Dashboard & trim', 'Odour treatment', 'Glass clean'],
    popular: false,
  },
  {
    name: 'Full Detail',
    slug: 'full_detail',
    description: 'Complete inside and out — our most popular full-service treatment.',
    price: 4999,
    duration: '4–5 hours',
    features: ['Exterior + Interior detail', 'Engine bay clean', 'Paint decontamination', 'Wax protection', 'Tyre dressing'],
    popular: true,
  },
  {
    name: 'Premium Package',
    slug: 'premium_package',
    description: 'The ultimate detailing experience with paint correction and ceramic prep.',
    price: 7999,
    duration: '6–8 hours',
    features: ['Everything in Full Detail', 'Paint correction', 'Clay bar treatment', 'Ceramic coat prep', 'Final inspection'],
    popular: false,
  },
]

async function main() {
  console.log('Seeding database...')

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    })
  }

  console.log(`✅  Seeded ${services.length} services.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
