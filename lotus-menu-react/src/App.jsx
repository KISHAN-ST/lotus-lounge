import PremiumMenuSection from './components/PremiumMenuSection'

const dishes = [
  {
    name: 'Tandoori Chicken Platter',
    category: 'Tandoori',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Butter Chicken',
    category: 'Main Course',
    image:
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Spl Chicken Biryani',
    category: 'Biryani',
    image:
      'https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Tawa Fish',
    category: 'Coastal',
    image:
      'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Paneer Tikka',
    category: 'Tandoori',
    image:
      'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Prawn Biryani',
    category: 'Biryani',
    image:
      'https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?auto=format&fit=crop&w=1200&q=80'
  }
]

export default function App() {
  return (
    <main className="min-h-screen bg-[#07060a]">
      <PremiumMenuSection dishes={dishes} menuLink="/menu" />
    </main>
  )
}
